import { Injectable } from '@nestjs/common';
import { Prisma, OrderStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface DashboardStats {
  orders: {
    total: number;
    today: number;
    pending: number;
    inProduction: number;
    delivered: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    today: number;
    thisMonth: number;
    avgOrderValue: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
  };
  customers: {
    total: number;
    active: number;
    newThisMonth: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      // Orders
      totalOrders,
      todayOrders,
      pendingOrders,
      inProductionOrders,
      deliveredOrders,
      cancelledOrders,

      // Revenue
      totalRevenue,
      todayRevenue,
      monthRevenue,
      avgOrderValue,

      // Products
      totalProducts,
      activeProducts,
      outOfStockProducts,

      // Customers
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
    ] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      this.prisma.order.count({ where: { status: OrderStatus.IN_PRODUCTION } }),
      this.prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
      this.prisma.order.count({ where: { status: OrderStatus.CANCELLED } }),

      this.prisma.order.aggregate({
        where: { status: OrderStatus.DELIVERED },
        _sum: { total: true },
      }),
      this.prisma.order.aggregate({
        where: { status: OrderStatus.DELIVERED, createdAt: { gte: todayStart } },
        _sum: { total: true },
      }),
      this.prisma.order.aggregate({
        where: { status: OrderStatus.DELIVERED, createdAt: { gte: monthStart } },
        _sum: { total: true },
      }),
      this.prisma.order.aggregate({
        where: { status: OrderStatus.DELIVERED },
        _avg: { total: true },
      }),

      this.prisma.product.count(),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.product.count({ where: { isActive: true, stock: 0 } }),

      this.prisma.customer.count(),
      this.prisma.customer.count({ where: { isActive: true } }),
      this.prisma.customer.count({ where: { createdAt: { gte: monthStart } } }),
    ]);

    // Low stock products (separate query with raw SQL)
    const lowStockResult = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count FROM "Product" WHERE "isActive" = true AND "stock" <= "minStock"
    `;
    const lowStockProducts = Number(lowStockResult[0].count);

    return {
      orders: {
        total: totalOrders,
        today: todayOrders,
        pending: pendingOrders,
        inProduction: inProductionOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      revenue: {
        total: Number(totalRevenue._sum.total || 0),
        today: Number(todayRevenue._sum.total || 0),
        thisMonth: Number(monthRevenue._sum.total || 0),
        avgOrderValue: Number(avgOrderValue._avg.total || 0),
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts,
      },
      customers: {
        total: totalCustomers,
        active: activeCustomers,
        newThisMonth: newCustomersThisMonth,
      },
    };
  }

  async getRevenueChart(period: 'week' | 'month' | 'year' = 'month'): Promise<ChartData> {
    const now = new Date();
    let startDate: Date;
    let groupBy: 'day' | 'week' | 'month';

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        groupBy = 'day';
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupBy = 'day';
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = 'month';
        break;
    }

    const orders = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        createdAt: { gte: startDate },
      },
      select: { createdAt: true, total: true },
      orderBy: { createdAt: 'asc' },
    });

    // Group by period
    const grouped = new Map<string, number>();
    orders.forEach((order) => {
      let key: string;
      const date = new Date(order.createdAt);

      if (groupBy === 'day') {
        key = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      } else if (groupBy === 'month') {
        key = date.toLocaleDateString('pt-BR', { month: 'short' });
      } else {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      }

      grouped.set(key, (grouped.get(key) || 0) + Number(order.total));
    });

    // Fill missing dates with 0
    const labels: string[] = [];
    const data: number[] = [];

    let current = new Date(startDate);
    while (current <= now) {
      let key: string;
      if (groupBy === 'day') {
        key = current.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        current.setDate(current.getDate() + 1);
      } else if (groupBy === 'month') {
        key = current.toLocaleDateString('pt-BR', { month: 'short' });
        current.setMonth(current.getMonth() + 1);
      } else {
        key = current.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        current.setDate(current.getDate() + 7);
      }

      labels.push(key);
      data.push(grouped.get(key) || 0);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Faturamento (R$)',
          data,
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          borderColor: '#0ea5e9',
        },
      ],
    };
  }

  async getOrdersChart(period: 'week' | 'month' | 'year' = 'month'): Promise<ChartData> {
    const now = new Date();
    let startDate: Date;
    let groupBy: 'day' | 'week' | 'month';

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        groupBy = 'day';
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupBy = 'day';
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = 'month';
        break;
    }

    const orders = await this.prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true, status: true },
      orderBy: { createdAt: 'asc' },
    });

    const grouped = new Map<string, Record<OrderStatus, number>>();
    orders.forEach((order) => {
      let key: string;
      const date = new Date(order.createdAt);

      if (groupBy === 'day') {
        key = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      } else if (groupBy === 'month') {
        key = date.toLocaleDateString('pt-BR', { month: 'short' });
      } else {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      }

      if (!grouped.has(key)) {
        grouped.set(key, {
          PENDING: 0,
          CONFIRMED: 0,
          IN_PRODUCTION: 0,
          READY: 0,
          OUT_FOR_DELIVERY: 0,
          DELIVERED: 0,
          CANCELLED: 0,
        });
      }
      grouped.get(key)![order.status]++;
    });

    const labels: string[] = [];
    const datasets: ChartData['datasets'] = [
      { label: 'Entregues', data: [], backgroundColor: '#10b981' },
      { label: 'Em Produção', data: [], backgroundColor: '#f59e0b' },
      { label: 'Pendentes', data: [], backgroundColor: '#0ea5e9' },
      { label: 'Cancelados', data: [], backgroundColor: '#ef4444' },
    ];

    let current = new Date(startDate);
    while (current <= now) {
      let key: string;
      if (groupBy === 'day') {
        key = current.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        current.setDate(current.getDate() + 1);
      } else if (groupBy === 'month') {
        key = current.toLocaleDateString('pt-BR', { month: 'short' });
        current.setMonth(current.getMonth() + 1);
      } else {
        key = current.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        current.setDate(current.getDate() + 7);
      }

      labels.push(key);
      const counts = grouped.get(key) || { PENDING: 0, CONFIRMED: 0, IN_PRODUCTION: 0, READY: 0, OUT_FOR_DELIVERY: 0, DELIVERED: 0, CANCELLED: 0 };
      datasets[0].data.push(counts.DELIVERED);
      datasets[1].data.push(counts.IN_PRODUCTION + counts.READY + counts.OUT_FOR_DELIVERY);
      datasets[2].data.push(counts.PENDING + counts.CONFIRMED);
      datasets[3].data.push(counts.CANCELLED);
    }

    return { labels, datasets };
  }

  async getTopProducts(limit = 10) {
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: { order: { status: OrderStatus.DELIVERED } },
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });

    const products = await Promise.all(
      topProducts.map(async (tp) => {
        const product = await this.prisma.product.findUnique({
          where: { id: tp.productId },
          select: { id: true, name: true, category: true, price: true, imageUrl: true },
        });
        return {
          ...product,
          totalSold: tp._sum.quantity,
          totalRevenue: Number(tp._sum.total || 0),
        };
      }),
    );

    return products.filter(Boolean);
  }

  async getRecentOrders(limit = 10) {
    return this.prisma.order.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { name: true, phone: true } },
        user: { select: { name: true } },
        items: { include: { product: { select: { name: true } } } },
      },
    });
  }

  async getAlerts() {
    const alerts: Array<{ type: string; severity: 'info' | 'warning' | 'critical'; message: string; count: number; action?: string }> = [];

    // Low stock products
    const lowStockResult = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count FROM "Product" WHERE "isActive" = true AND "stock" <= "minStock"
    `;
    const lowStockCount = Number(lowStockResult[0].count);
    if (lowStockCount > 0) {
      alerts.push({
        type: 'low_stock',
        severity: lowStockCount > 5 ? 'critical' : 'warning',
        message: `${lowStockCount} produto(s) com estoque baixo`,
        count: lowStockCount,
        action: '/admin/produtos?filter=low_stock',
      });
    }

    // Out of stock products
    const outOfStockCount = await this.prisma.product.count({
      where: { isActive: true, stock: 0 },
    });
    if (outOfStockCount > 0) {
      alerts.push({
        type: 'out_of_stock',
        severity: 'critical',
        message: `${outOfStockCount} produto(s) sem estoque`,
        count: outOfStockCount,
        action: '/admin/produtos?filter=out_of_stock',
      });
    }

    // Pending orders
    const pendingOrders = await this.prisma.order.count({
      where: { status: OrderStatus.PENDING },
    });
    if (pendingOrders > 0) {
      alerts.push({
        type: 'pending_orders',
        severity: pendingOrders > 10 ? 'warning' : 'info',
        message: `${pendingOrders} pedido(s) aguardando confirmação`,
        count: pendingOrders,
        action: '/admin/pedidos?status=PENDING',
      });
    }

    // Orders in production too long (> 2 days)
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const stuckInProduction = await this.prisma.order.count({
      where: {
        status: OrderStatus.IN_PRODUCTION,
        updatedAt: { lte: twoDaysAgo },
      },
    });
    if (stuckInProduction > 0) {
      alerts.push({
        type: 'stuck_production',
        severity: 'warning',
        message: `${stuckInProduction} pedido(s) em produção há mais de 2 dias`,
        count: stuckInProduction,
        action: '/admin/pedidos?status=IN_PRODUCTION',
      });
    }

    // Orders ready for delivery > 1 day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const readyForDelivery = await this.prisma.order.count({
      where: {
        status: OrderStatus.READY,
        updatedAt: { lte: oneDayAgo },
      },
    });
    if (readyForDelivery > 0) {
      alerts.push({
        type: 'ready_delivery',
        severity: 'info',
        message: `${readyForDelivery} pedido(s) prontos para entrega há mais de 1 dia`,
        count: readyForDelivery,
        action: '/admin/pedidos?status=READY',
      });
    }

    return alerts;
  }
}