import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Prisma, OrderStatus, PaymentStatus, PaymentMethod, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto, CancelOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Validate products and calculate totals
    const productIds = dto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Um ou mais produtos não encontrados ou inativos');
    }

    // Check stock and build order items
    const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];
    let subtotal = 0;

    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      if (product.stock < item.quantity) {
        throw new BadRequestException(`Estoque insuficiente para ${product.name}. Disponível: ${product.stock}`);
      }

      const unitPrice = Number(product.price);
      const total = unitPrice * item.quantity;
      subtotal += total;

      orderItems.push({
        product: { connect: { id: product.id } },
        quantity: item.quantity,
        unitPrice,
        total,
      });
    }

    // Calculate delivery fee (simplified - could be based on distance)
    const deliveryFee = subtotal >= 100 ? 0 : 15.0; // Free delivery over R$ 100
    const total = subtotal + deliveryFee;

    // Generate order number
    const orderNumber = this.generateOrderNumber();

    // Create order with transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: userId,
          userId,
          status: OrderStatus.PENDING,
          subtotal,
          deliveryFee,
          total,
          paymentMethod: dto.paymentMethod,
          paymentStatus: PaymentStatus.PENDING,
          deliveryAddress: dto.deliveryAddress
            ? {
                formatted: dto.deliveryAddress,
              }
            : undefined,
          deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null,
          deliveryTime: dto.deliveryTime,
          notes: dto.notes,
          items: {
            create: orderItems,
          },
          statusHistory: {
            create: {
              status: OrderStatus.PENDING,
              notes: 'Pedido criado',
              createdBy: userId,
            },
          },
        },
        include: {
          items: { include: { product: true } },
          customer: true,
        },
      });

      // Update product stock
      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return order;
  }

  async findMyOrders(userId: string, query: OrderQueryDto) {
    const { page = 1, limit = 10, status, startDate, endDate, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      userId,
      ...(status && { status }),
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          items: { include: { product: true } },
          statusHistory: { orderBy: { createdAt: 'desc' } },
        },
      }),
      this.prisma.order.count({ where }),
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

  async getCustomerStats(userId: string) {
    const [totalOrders, pendingOrders, deliveredOrders, totalSpent] = await Promise.all([
      this.prisma.order.count({ where: { userId } }),
      this.prisma.order.count({ where: { userId, status: { in: [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.IN_PRODUCTION, OrderStatus.READY, OrderStatus.OUT_FOR_DELIVERY] } } }),
      this.prisma.order.count({ where: { userId, status: OrderStatus.DELIVERED } }),
      this.prisma.order.aggregate({
        where: { userId, status: OrderStatus.DELIVERED },
        _sum: { total: true },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalSpent: Number(totalSpent._sum.total || 0),
    };
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: { include: { product: true } },
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async cancel(id: string, userId: string, reason: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // Check if order can be cancelled
    const nonCancellableStatuses: OrderStatus[] = [
      OrderStatus.IN_PRODUCTION,
      OrderStatus.READY,
      OrderStatus.OUT_FOR_DELIVERY,
      OrderStatus.DELIVERED,
    ];

    if (nonCancellableStatuses.includes(order.status)) {
      throw new BadRequestException(`Não é possível cancelar um pedido com status "${order.status}"`);
    }

    // Restore stock
    await this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }

      await tx.order.update({
        where: { id },
        data: {
          status: OrderStatus.CANCELLED,
          notes: order.notes ? `${order.notes}\n\nCancelado: ${reason}` : `Cancelado: ${reason}`,
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: id,
          status: OrderStatus.CANCELLED,
          notes: reason,
          createdBy: userId,
        },
      });
    });

    return { message: 'Pedido cancelado com sucesso' };
  }

  async generateWhatsAppLink(id: string, userId: string) {
    const order = await this.findOne(id, userId);

    const businessPhone = process.env.WHATSAPP_BUSINESS_NUMBER || '5511999999999';
    const message = this.formatWhatsAppMessage(order);
    const encodedMessage = encodeURIComponent(message);

    return {
      url: `https://wa.me/${businessPhone}?text=${encodedMessage}`,
      message,
    };
  }

  private formatWhatsAppMessage(order: any): string {
    let message = `🧊 *Novo Pedido - Best Gelo*\n\n`;
    message += `📋 *Pedido:* ${order.orderNumber}\n`;
    message += `👤 *Cliente:* ${order.customer?.name || 'Não informado'}\n`;
    message += `📞 *Telefone:* ${order.customer?.phone || 'Não informado'}\n\n`;
    message += `📦 *Itens:*\n`;

    order.items.forEach((item: any, index: number) => {
      message += `${index + 1}. ${item.product.name} - ${item.quantity}x R$ ${Number(item.unitPrice).toFixed(2)} = R$ ${Number(item.total).toFixed(2)}\n`;
    });

    message += `\n💰 *Subtotal:* R$ ${Number(order.subtotal).toFixed(2)}`;
    message += `\n🚚 *Entrega:* R$ ${Number(order.deliveryFee).toFixed(2)}`;
    message += `\n💳 *Total:* R$ ${Number(order.total).toFixed(2)}`;

    if (order.deliveryAddress) {
      message += `\n\n📍 *Endereço:* ${order.deliveryAddress.formatted}`;
    }

    if (order.deliveryDate) {
      const date = new Date(order.deliveryDate).toLocaleDateString('pt-BR');
      message += `\n📅 *Data:* ${date}`;
    }

    if (order.deliveryTime) {
      message += `\n⏰ *Horário:* ${order.deliveryTime}`;
    }

    if (order.notes) {
      message += `\n📝 *Observações:* ${order.notes}`;
    }

    message += `\n\n---\nPedido realizado pelo site Best Gelo`;

    return message;
  }

  // Admin methods
  async findAllAdmin(query: OrderQueryDto) {
    const { page = 1, limit = 20, status, startDate, endDate, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(status && { status }),
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
      ...(search && {
        OR: [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { customer: { name: { contains: search, mode: 'insensitive' } } },
          { customer: { phone: { contains: search } } },
        ],
      }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: true,
          user: { select: { name: true, email: true } },
          items: { include: { product: true } },
          statusHistory: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
      }),
      this.prisma.order.count({ where }),
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

  async getAdminStats(period?: 'today' | 'week' | 'month' | 'year') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const where = { createdAt: { gte: startDate } };

    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      inProductionOrders,
      readyOrders,
      deliveringOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      avgOrderValue,
    ] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.PENDING } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.CONFIRMED } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.IN_PRODUCTION } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.READY } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.OUT_FOR_DELIVERY } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.DELIVERED } }),
      this.prisma.order.count({ where: { ...where, status: OrderStatus.CANCELLED } }),
      this.prisma.order.aggregate({ where: { ...where, status: OrderStatus.DELIVERED }, _sum: { total: true } }),
      this.prisma.order.aggregate({ where: { ...where, status: OrderStatus.DELIVERED }, _avg: { total: true } }),
    ]);

    return {
      totalOrders,
      byStatus: {
        pending: pendingOrders,
        confirmed: confirmedOrders,
        inProduction: inProductionOrders,
        ready: readyOrders,
        delivering: deliveringOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      totalRevenue: Number(totalRevenue._sum.total || 0),
      avgOrderValue: Number(avgOrderValue._avg.total || 0),
      period: period || 'all',
    };
  }

  async getRecentOrders(limit = 10) {
    return this.prisma.order.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });
  }

  async findOneAdmin(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        user: { select: { name: true, email: true } },
        items: { include: { product: true } },
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async update(id: string, dto: Partial<CreateOrderDto>) {
    return this.prisma.order.update({
      where: { id },
      data: {
        deliveryAddress: dto.deliveryAddress
          ? { formatted: dto.deliveryAddress }
          : undefined,
        deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : undefined,
        deliveryTime: dto.deliveryTime,
        paymentMethod: dto.paymentMethod,
        notes: dto.notes,
      },
    });
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto, adminId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // Validate status transition
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.IN_PRODUCTION, OrderStatus.CANCELLED],
      [OrderStatus.IN_PRODUCTION]: [OrderStatus.READY, OrderStatus.CANCELLED],
      [OrderStatus.READY]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED],
      [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    const allowedNext = validTransitions[order.status] || [];
    if (!allowedNext.includes(dto.status)) {
      throw new BadRequestException(
        `Não é possível alterar de "${order.status}" para "${dto.status}". Status permitidos: ${allowedNext.join(', ')}`,
      );
    }

    // Handle stock restoration on cancellation
    if (dto.status === OrderStatus.CANCELLED && order.status !== OrderStatus.CANCELLED) {
      await this.prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }

        await tx.order.update({
          where: { id },
          data: { status: dto.status, notes: dto.notes },
        });

        await tx.orderStatusHistory.create({
          data: { orderId: id, status: dto.status, notes: dto.notes, createdBy: adminId },
        });
      });

      return { message: 'Pedido cancelado e estoque restaurado' };
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id },
        data: { status: dto.status, notes: dto.notes },
      });

      await tx.orderStatusHistory.create({
        data: { orderId: id, status: dto.status, notes: dto.notes, createdBy: adminId },
      });

      return updated;
    });
  }

  async addStatusHistory(id: string, status: OrderStatus, notes: string | undefined, adminId: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.prisma.orderStatusHistory.create({
      data: { orderId: id, status, notes, createdBy: adminId },
    });
  }

  async exportToCsv(query: OrderQueryDto): Promise<string> {
    const { data: orders } = await this.findAllAdmin({ ...query, limit: 10000 });

    const headers = [
      'Número Pedido',
      'Cliente',
      'Telefone',
      'Email',
      'Status',
      'Pagamento',
      'Status Pagamento',
      'Subtotal',
      'Frete',
      'Desconto',
      'Total',
      'Data Pedido',
      'Data Entrega',
      'Horário Entrega',
      'Itens',
    ];

    const rows = orders.map((order) => [
      order.orderNumber,
      order.customer?.name || '',
      order.customer?.phone || '',
      order.customer?.email || '',
      order.status,
      order.paymentMethod || '',
      order.paymentStatus,
      Number(order.subtotal).toFixed(2),
      Number(order.deliveryFee).toFixed(2),
      Number(order.discount).toFixed(2),
      Number(order.total).toFixed(2),
      order.createdAt.toLocaleString('pt-BR'),
      order.deliveryDate ? order.deliveryDate.toLocaleDateString('pt-BR') : '',
      order.deliveryTime || '',
      order.items.map((i) => `${i.product.name} (${i.quantity}x)`).join('; '),
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

    return csv;
  }

  private generateOrderNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BG${dateStr}${random}`;
  }
}