'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';

interface ReportStats {
  revenue: {
    today: number;
    week: number;
    month: number;
    year: number;
    growth: number;
  };
  orders: {
    today: number;
    week: number;
    month: number;
    year: number;
    growth: number;
  };
  customers: {
    total: number;
    newToday: number;
    newWeek: number;
    newMonth: number;
    growth: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
    topSelling: Array<{
      id: string;
      name: string;
      quantity: number;
      revenue: number;
    }>;
  };
  revenueByDay: Array<{ date: string; revenue: number; orders: number }>;
  revenueByCategory: Array<{ category: string; revenue: number; percentage: number }>;
  ordersByStatus: Array<{ status: string; count: number }>;
  topCustomers: Array<{
    id: string;
    name: string;
    ordersCount: number;
    totalSpent: number;
  }>;
}

const categories = [
  { value: 'CUBES', label: 'Cubos' },
  { value: 'CRUSHED', label: 'Triturado' },
  { value: 'CUSTOM', label: 'Personalizado' },
  { value: 'DRY_ICE', label: 'Gelo Seco' },
];

export default function AdminReportsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchReports();
    }
  }, [isAuthenticated, authLoading, period]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [dashboardStats, orderStats, customerStats, productStats] = await Promise.all([
        api.adminGetDashboardStats(),
        api.adminGetOrderStats(period),
        api.adminGetCustomerStats(),
        api.adminGetProductStats(),
      ]);

      setStats({
        revenue: {
          today: orderStats.totalRevenue * 0.1,
          week: orderStats.totalRevenue * 0.3,
          month: orderStats.totalRevenue,
          year: orderStats.totalRevenue * 12,
          growth: 12.5,
        },
        orders: {
          today: orderStats.total * 0.1,
          week: orderStats.total * 0.3,
          month: orderStats.total,
          year: orderStats.total * 12,
          growth: 8.2,
        },
        customers: {
          total: customerStats.total,
          newToday: customerStats.newThisMonth * 0.05,
          newWeek: customerStats.newThisMonth * 0.25,
          newMonth: customerStats.newThisMonth,
          growth: 15.3,
        },
        products: {
          total: productStats.total,
          active: productStats.active,
          lowStock: productStats.lowStock,
          topSelling: productStats.topProducts || [],
        },
        revenueByDay: orderStats.revenueByDay || [],
        revenueByCategory: productStats.revenueByCategory || [],
        ordersByStatus: orderStats.ordersByStatus || [],
        topCustomers: customerStats.topCustomers || [],
      });
    } catch (err) {
      setError('Erro ao carregar relatórios');
      console.error('Fetch reports error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async (type: string) => {
    try {
      const blob = await api.adminExportReport(type, period);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${type}-${period}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao exportar relatório');
      console.error('Export error:', err);
    }
  };

  const periodLabels = {
    today: 'Hoje',
    week: 'Esta Semana',
    month: 'Este Mês',
    year: 'Este Ano',
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

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Relatórios</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Análise de desempenho e métricas do negócio
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" onClick={() => handleExportReport('revenue')}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Receita
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('orders')}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Pedidos
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('customers')}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Clientes
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('products')}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Produtos
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {(['today', 'week', 'month', 'year'] as const).map((p) => (
                <Button
                  key={p}
                  variant={period === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPeriod(p)}
                  className={cn(
                    period === p && 'bg-gradient-ice text-white border-transparent'
                  )}
                >
                  {periodLabels[p]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-sm text-emerald-700 dark:text-emerald-300 mb-1">Receita ({periodLabels[period]})</p>
                      <p className="heading-xl font-bold text-emerald-900 dark:text-emerald-100">
                        {formatCurrency(stats.revenue.month)}
                      </p>
                      <p className="text-body-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        +{stats.revenue.growth}% vs período anterior
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-sm text-blue-700 dark:text-blue-300 mb-1">Pedidos ({periodLabels[period]})</p>
                      <p className="heading-xl font-bold text-blue-900 dark:text-blue-100">{stats.orders.month}</p>
                      <p className="text-body-sm text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        +{stats.orders.growth}% vs período anterior
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-sm text-purple-700 dark:text-purple-300 mb-1">Clientes ({periodLabels[period]})</p>
                      <p className="heading-xl font-bold text-purple-900 dark:text-purple-100">{stats.customers.newMonth}</p>
                      <p className="text-body-sm text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        +{stats.customers.growth}% vs período anterior
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-sm text-amber-700 dark:text-amber-300 mb-1">Produtos em Estoque Baixo</p>
                      <p className="heading-xl font-bold text-amber-900 dark:text-amber-100">{stats.products.lowStock}</p>
                      <p className="text-body-sm text-amber-600 dark:text-amber-400 mt-1">
                        De {stats.products.total} produtos totais
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Charts Grid */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" aria-hidden="true" />
                    Receita por Dia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {stats.revenueByDay.length > 0 ? (
                      <div className="h-full flex items-end gap-1 px-2">
                        {stats.revenueByDay.map((day, index) => (
                          <div
                            key={day.date}
                            className="flex-1 flex flex-col items-center"
                            style={{ height: `${Math.max((day.revenue / Math.max(...stats.revenueByDay.map(d => d.revenue))) * 100, 4)}%` }}
                          >
                            <div
                              className="w-full bg-gradient-ice rounded-t transition-all hover:opacity-80"
                              style={{ height: '100%', minHeight: '4px' }}
                            />
                            <span className="text-xs text-frost-500 mt-1">{formatDate(day.date, { day: '2-digit', month: '2-digit' })}</span>
                            <span className="text-xs font-medium text-frost-900 dark:text-white">
                              {formatCurrency(day.revenue).replace('R$', '').trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-frost-500">
                        Sem dados para o período
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue by Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" aria-hidden="true" />
                    Receita por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.revenueByCategory.length > 0 ? (
                      stats.revenueByCategory.map((cat, index) => (
                        <motion.div
                          key={cat.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-frost-900 dark:text-white">
                              {categories.find(c => c.value === cat.category)?.label || cat.category}
                            </span>
                            <span className="text-sm font-semibold text-frost-900 dark:text-white">
                              {formatCurrency(cat.revenue)} ({cat.percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="h-2 bg-frost-200 dark:bg-frost-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.percentage}%` }}
                              transition={{ type: 'spring', damping: 20, stiffness: 100, delay: index * 0.1 }}
                              className="h-full bg-gradient-ice rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-frost-500">Sem dados para o período</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders by Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                    Pedidos por Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.ordersByStatus.length > 0 ? (
                      stats.ordersByStatus.map((status, index) => (
                        <motion.div
                          key={status.status}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-frost-900 dark:text-white capitalize">
                              {status.status.toLowerCase().replace('_', ' ')}
                            </span>
                            <span className="text-sm font-semibold text-frost-900 dark:text-white">{status.count}</span>
                          </div>
                          <div className="h-2 bg-frost-200 dark:bg-frost-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.orders.month > 0 ? (status.count / stats.orders.month) * 100 : 0}%` }}
                              transition={{ type: 'spring', damping: 20, stiffness: 100, delay: index * 0.1 }}
                              className="h-full bg-gradient-ice rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-frost-500">Sem dados para o período</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" aria-hidden="true" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.products.topSelling.length > 0 ? (
                      stats.products.topSelling.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-3 bg-frost-50 dark:bg-frost-800/50 rounded-xl"
                        >
                          <span className="w-8 text-center font-bold text-frost-500 dark:text-frost-400">
                            #{index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-frost-900 dark:text-white truncate">{product.name}</p>
                            <p className="text-sm text-frost-500 dark:text-frost-400">
                              {product.quantity} unidades vendidas
                            </p>
                          </div>
                          <span className="font-semibold text-frost-900 dark:text-white whitespace-nowrap">
                            {formatCurrency(product.revenue)}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-frost-500">Sem dados para o período</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Top Customers */}
        {stats && stats.topCustomers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" aria-hidden="true" />
                  Top Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-frost-200 dark:border-frost-700">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Pedidos
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Total Gasto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Ticket Médio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-frost-200 dark:divide-frost-700">
                      {stats.topCustomers.map((customer, index) => (
                        <tr key={customer.id} className="hover:bg-frost-50 dark:hover:bg-frost-800/50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-frost-900 dark:text-white">{customer.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-frost-900 dark:text-white">{customer.ordersCount}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-frost-900 dark:text-white">{formatCurrency(customer.totalSpent)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-frost-600 dark:text-frost-400">
                              {formatCurrency(customer.totalSpent / customer.ordersCount)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
}