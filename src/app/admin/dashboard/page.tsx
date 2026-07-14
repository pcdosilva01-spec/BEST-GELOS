'use client';

import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Package,
  ShoppingCart,
  Users,
  User,
  TrendingUp,
  DollarSign,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Zap,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface DashboardStats {
  products: {
    total: number;
    active: number;
    inactive: number;
    lowStock: number;
    categories: number;
  };
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    inProduction: number;
    ready: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
  customers: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  recentOrders: Array<{
    id: string;
    customerName: string;
    status: string;
    total: number;
    createdAt: string;
    itemsCount: number;
  }>;
  recentCustomers: Array<{
    id: string;
    name: string;
    email: string;
    ordersCount: number;
    totalSpent: number;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchStats();
    }
  }, [isAuthenticated, authLoading]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [dashboardStats, productStats, orderStats, customerStats] = await Promise.all([
        api.adminGetDashboardStats(),
        api.adminGetProductStats(),
        api.adminGetOrderStats('month'),
        api.adminGetCustomerStats(),
      ]);

      const recentOrders = await api.adminGetRecentOrders(5);
      const recentCustomers = await api.adminGetCustomers({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' });

      setStats({
        products: productStats,
        orders: orderStats,
        customers: customerStats,
        recentOrders: recentOrders,
        recentCustomers: recentCustomers.customers,
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas');
      console.error('Dashboard stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || authLoading) {
    return (
      <AdminLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-ice-500" aria-hidden="true" />
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <p className="text-frost-500">Carregando dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  const statsCards = [
    {
      title: 'Total de Produtos',
      value: stats.products.total,
      subtitle: `${stats.products.active} ativos • ${stats.products.lowStock} estoque baixo`,
      icon: Package,
      color: 'text-ice-500',
      bgColor: 'bg-ice-50 dark:bg-ice-900/20',
      trend: '+12% este mês',
      trendColor: 'text-green-600',
    },
    {
      title: 'Pedidos do Mês',
      value: stats.orders.total,
      subtitle: `Receita: ${formatCurrency(stats.orders.totalRevenue)}`,
      icon: ShoppingCart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      trend: '+8% vs mês anterior',
      trendColor: 'text-green-600',
    },
    {
      title: 'Clientes Ativos',
      value: stats.customers.active,
      subtitle: `${stats.customers.newThisMonth} novos este mês`,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      trend: '+15% este mês',
      trendColor: 'text-green-600',
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(stats.orders.averageOrderValue),
      subtitle: `${stats.orders.delivered} entregues • ${stats.orders.pending} pendentes`,
      icon: DollarSign,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      trend: '+5% vs mês anterior',
      trendColor: 'text-green-600',
    },
  ];

  const orderStatusConfig = {
    PENDING: { label: 'Pendente', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
    CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle },
    IN_PRODUCTION: { label: 'Em Produção', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', icon: Loader2 },
    READY: { label: 'Pronto', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle },
    DELIVERED: { label: 'Entregue', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: Truck },
    CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Dashboard</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Visão geral do seu negócio de gelo
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/admin/orders?status=PENDING">Ver Pedidos Pendentes</a>
            </Button>
            <Button asChild>
              <a href="/admin/products/new">Novo Produto</a>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={cn('overflow-hidden', stat.bgColor)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-sm text-frost-500 dark:text-frost-400 mb-1">{stat.title}</p>
                      <p className="heading-lg font-bold text-frost-900 dark:text-white">{stat.value}</p>
                      <p className="text-body-sm text-frost-500 dark:text-frost-400 mt-1">{stat.subtitle}</p>
                    </div>
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
                      <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-frost-200 dark:border-frost-700 flex items-center justify-between">
                    <span className={cn('text-sm font-medium', stat.trendColor)}>
                      {stat.trend}
                    </span>
                    <span className="text-xs text-frost-400">Mês atual</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Status Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  Pedidos por Status
                  <Badge variant="outline" className="text-body-sm">
                    Últimos 30 dias
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { key: 'PENDING', label: 'Pendentes', count: stats.orders.pending, color: 'amber' },
                    { key: 'CONFIRMED', label: 'Confirmados', count: stats.orders.confirmed, color: 'blue' },
                    { key: 'IN_PRODUCTION', label: 'Em Produção', count: stats.orders.inProduction, color: 'purple' },
                    { key: 'READY', label: 'Prontos', count: stats.orders.ready, color: 'emerald' },
                    { key: 'DELIVERED', label: 'Entregues', count: stats.orders.delivered, color: 'green' },
                    { key: 'CANCELLED', label: 'Cancelados', count: stats.orders.cancelled, color: 'red' },
                  ].map((status, index) => (
                    <motion.div
                      key={status.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-24 text-sm text-frost-600 dark:text-frost-400 font-medium">
                        {status.label}
                      </div>
                      <div className="flex-1 h-3 bg-frost-200 dark:bg-frost-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.orders.total > 0 ? (status.count / stats.orders.total) * 100 : 0}%` }}
                          transition={{ type: 'spring', damping: 20, stiffness: 100, delay: index * 0.05 }}
                          className={cn('h-full rounded-full', `bg-${status.color}-500`)}
                        />
                      </div>
                      <div className="w-16 text-right font-semibold text-frost-900 dark:text-white">
                        {status.count}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <a href="/admin/products/new">
                    <Package className="w-4 h-4" aria-hidden="true" />
                    Adicionar Produto
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <a href="/admin/orders?status=PENDING">
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                    Gerenciar Pedidos
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <a href="/admin/customers">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    Ver Clientes
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <a href="/admin/delivery">
                    <Truck className="w-4 h-4" aria-hidden="true" />
                    Rota de Entrega
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <a href="/admin/reports">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    Relatórios
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            {stats.products.lowStock > 0 && (
              <Card className="border-amber-200 dark:border-amber-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-frost-900 dark:text-white">Estoque Baixo</p>
                      <p className="text-sm text-frost-500 dark:text-frost-400 mt-1">
                        {stats.products.lowStock} produto{stats.products.lowStock > 1 ? 's' : ''} com estoque abaixo do mínimo
                      </p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/products?stock=low">Ver Produtos</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Recent Orders & Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/admin/orders">Ver todos</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentOrders.length === 0 ? (
                    <p className="text-frost-500 dark:text-frost-400 text-center py-8">Nenhum pedido recente</p>
                  ) : (
                    stats.recentOrders.map((order) => {
                      const statusConfig = orderStatusConfig[order.status as keyof typeof orderStatusConfig] || orderStatusConfig.PENDING;
                      const StatusIcon = statusConfig.icon;
                      return (
                        <Link
                          key={order.id}
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-frost-50 dark:hover:bg-frost-800/50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-frost-100 dark:bg-frost-800 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-frost-600 dark:text-frost-400" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-frost-900 dark:text-white truncate">{order.customerName}</p>
                            <p className="text-sm text-frost-500 dark:text-frost-400">
                              {order.itemsCount} item{order.itemsCount > 1 ? 's' : ''} • {formatCurrency(order.total)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={statusConfig.color}>
                              <StatusIcon className="w-3 h-3 mr-1" aria-hidden="true" />
                              {statusConfig.label}
                            </Badge>
                            <span className="text-sm text-frost-400 hidden sm:block">
                              {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Novos Clientes</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/admin/customers">Ver todos</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentCustomers.length === 0 ? (
                    <p className="text-frost-500 dark:text-frost-400 text-center py-8">Nenhum cliente recente</p>
                  ) : (
                    stats.recentCustomers.map((customer) => (
                      <Link
                        key={customer.id}
                        href={`/admin/customers/${customer.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-frost-50 dark:hover:bg-frost-800/50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center">
                          <User className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-frost-900 dark:text-white truncate">{customer.name}</p>
                          <p className="text-sm text-frost-500 dark:text-frost-400 truncate">{customer.email}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="font-semibold text-frost-900 dark:text-white">{formatCurrency(customer.totalSpent)}</p>
                          <p className="text-xs text-frost-400">{customer.ordersCount} pedido{customer.ordersCount > 1 ? 's' : ''}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}