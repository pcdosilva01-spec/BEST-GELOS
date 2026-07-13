import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
}

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options: FindAllOptions) {
    const { page, limit, search, isActive } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
          { email: { contains: search, mode: 'insensitive' } },
          { cpfCnpj: { contains: search } },
        ],
      }),
    };

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          addresses: true,
          _count: { select: { orders: true } },
        },
      }),
      this.prisma.customer.count({ where }),
    ]);

    // Add total spent for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const totalSpent = await this.prisma.order.aggregate({
          where: { customerId: customer.id, status: 'DELIVERED' },
          _sum: { total: true },
        });
        const lastOrder = await this.prisma.order.findFirst({
          where: { customerId: customer.id },
          orderBy: { createdAt: 'desc' },
          select: { id: true, createdAt: true, total: true, status: true },
        });

        return {
          ...customer,
          totalSpent: Number(totalSpent._sum.total || 0),
          lastOrder,
        };
      }),
    );

    return {
      data: customersWithStats,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async getStats() {
    const [total, active, inactive, withOrders, newThisMonth] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.customer.count({ where: { isActive: true } }),
      this.prisma.customer.count({ where: { isActive: false } }),
      this.prisma.customer.count({
        where: { orders: { some: {} } },
      }),
      this.prisma.customer.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    // Top customers by spending
    const topCustomers = await this.prisma.order.groupBy({
      by: ['customerId'],
      where: { status: 'DELIVERED' },
      _sum: { total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: 5,
    });

    const topCustomersWithDetails = await Promise.all(
      topCustomers.map(async (tc) => {
        const customer = await this.prisma.customer.findUnique({
          where: { id: tc.customerId },
          select: { id: true, name: true, phone: true },
        });
        return { ...customer, totalSpent: Number(tc._sum.total || 0) };
      }),
    );

    return {
      total,
      active,
      inactive,
      withOrders,
      newThisMonth,
      topCustomers: topCustomersWithDetails,
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        orders: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            items: { include: { product: true } },
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // Calculate stats
    const [totalOrders, totalSpent, avgOrderValue, favoriteProduct] = await Promise.all([
      this.prisma.order.count({ where: { customerId: id } }),
      this.prisma.order.aggregate({
        where: { customerId: id, status: 'DELIVERED' },
        _sum: { total: true },
      }),
      this.prisma.order.aggregate({
        where: { customerId: id, status: 'DELIVERED' },
        _avg: { total: true },
      }),
      this.prisma.orderItem.groupBy({
        by: ['productId'],
        where: { order: { customerId: id, status: 'DELIVERED' } },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 1,
      }),
    ]);

    let favoriteProductName = null;
    if (favoriteProduct.length > 0) {
      const product = await this.prisma.product.findUnique({
        where: { id: favoriteProduct[0].productId },
        select: { name: true },
      });
      favoriteProductName = product?.name;
    }

    return {
      ...customer,
      stats: {
        totalOrders,
        totalSpent: Number(totalSpent._sum.total || 0),
        avgOrderValue: Number(avgOrderValue._avg.total || 0),
        favoriteProduct: favoriteProductName,
      },
    };
  }

  async getOrders(id: string, options: { page: number; limit: number }) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { customerId: id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } },
        },
      }),
      this.prisma.order.count({ where: { customerId: id } }),
    ]);

    return {
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }
}