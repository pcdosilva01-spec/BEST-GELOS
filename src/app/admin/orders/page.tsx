'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const statusConfig = {
  PENDING: { label: 'Pendente', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
  CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle },
  IN_PRODUCTION: { label: 'Em Produção', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', icon: Loader2 },
  READY: { label: 'Pronto', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle },
  OUT_FOR_DELIVERY: { label: 'Saiu para Entrega', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: Truck },
  DELIVERED: { label: 'Entregue', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: Truck },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
};

const statusOrder = [
  'PENDING',
  'CONFIRMED',
  'IN_PRODUCTION',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
];

export default function AdminOrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
  });
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading, filters, pagination.page, sortConfig]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        paymentMethod: filters.paymentMethod || undefined,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      };

      const response = await api.adminGetOrders(params);
      setOrders(response.orders);
      setPagination(response.pagination);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      await api.adminUpdateOrderStatus(orderId, { status: newStatus, notes: '' });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o))
      );
    } catch (err) {
      alert('Erro ao atualizar status');
      console.error('Status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getNextStatuses = (currentStatus: string) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return [];
    return statusOrder.slice(currentIndex + 1, currentIndex + 3);
  };

  const handleExportCsv = async () => {
    try {
      const blob = await api.adminExportOrdersCsv(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pedidos-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao exportar CSV');
      console.error('Export error:', err);
    }
  };

  const getNestedValue = (obj: Order, path: string) => {
    return path.split('.').reduce((current: any, key: string) => current?.[key], obj);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const aVal = getNestedValue(a, sortConfig.key);
    const bVal = getNestedValue(b, sortConfig.key);
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sortConfig.direction === 'asc' ? 1 : -1;
    if (bVal == null) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
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
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Pedidos</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Gerencie e acompanhe todos os pedidos
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCsv} disabled={loading}>
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-frost-400" aria-hidden="true" />
                <Input
                  placeholder="Buscar por número, cliente, email..."
                  value={filters.search}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, search: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && setPagination((prev) => ({ ...prev, page: 1 }))}
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <select
                  value={filters.status}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, status: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent min-w-[180px]"
                >
                  <option value="">Todos os status</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.paymentMethod}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, paymentMethod: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent min-w-[180px]"
                >
                  <option value="">Todos os pagamentos</option>
                  <option value="PIX">PIX</option>
                  <option value="CREDIT_CARD">Cartão de Crédito</option>
                  <option value="DEBIT_CARD">Cartão de Débito</option>
                  <option value="CASH">Dinheiro</option>
                  <option value="BANK_TRANSFER">Transferência</option>
                </select>

                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, startDate: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="w-auto"
                  placeholder="Data inicial"
                />
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, endDate: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="w-auto"
                  placeholder="Data final"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Lista de Pedidos ({pagination.total})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-ice-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">Carregando pedidos...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchOrders}>
                  Tentar novamente
                </Button>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-frost-300 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500 dark:text-frost-400 mb-4">Nenhum pedido encontrado</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full" role="table">
                    <thead>
                      <tr className="border-b border-frost-200 dark:border-frost-700">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('orderNumber')}>
                          Pedido
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('customer.name')}>
                          Cliente
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('total')}>
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('deliveryDate')}>
                          Entrega
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('createdAt')}>
                          Data
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider pr-6">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-frost-200 dark:divide-frost-700">
                      <AnimatePresence mode="popLayout">
                        {sortedOrders.map((order, index) => (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="hover:bg-frost-50 dark:hover:bg-frost-800/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-frost-900 dark:text-white">#{order.orderNumber}</p>
                                <p className="text-sm text-frost-500 dark:text-frost-400">
                                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-frost-900 dark:text-white">{order.customer.name}</p>
                                <p className="text-sm text-frost-500 dark:text-frost-400">{order.customer.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-2">
                                <Badge className={cn(statusConfig[order.status as keyof typeof statusConfig]?.color || 'bg-frost-100 text-frost-800')}>
                                  {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
                                </Badge>
                                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                                  <div className="flex gap-1">
                                    {getNextStatuses(order.status).map((nextStatus) => (
                                        <Button
                                          key={nextStatus}
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleStatusChange(order.id, nextStatus)}
                                          disabled={updatingId === order.id}
                                          className="text-xs h-7 px-2"
                                        >
                                          {statusConfig[nextStatus as keyof typeof statusConfig]?.label}
                                        </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-frost-900 dark:text-white">
                                {formatCurrency(order.total)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-frost-600 dark:text-frost-400">
                                {formatDate(order.deliveryDate)}
                                <span className="mx-1">•</span>
                                {order.deliveryTime}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-frost-600 dark:text-frost-400">
                                {formatDate(order.createdAt)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`Ver pedido ${order.orderNumber}`}
                                >
                                  <Link href={`/admin/orders/${order.id}`}>
                                    <Eye className="w-4 h-4" aria-hidden="true" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`WhatsApp do pedido ${order.orderNumber}`}
                                >
                                  <Link href={`/admin/orders/${order.id}/whatsapp`} target="_blank" rel="noopener">
                                    <MessageCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                                  </Link>
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-frost-200 dark:border-frost-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-frost-500 dark:text-frost-400">
                        Mostrando {(pagination.page - 1) * pagination.limit + 1} a{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
                        {pagination.total} resultados
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                          disabled={pagination.page === 1}
                        >
                          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                          disabled={pagination.page === pagination.totalPages}
                        >
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
}

function getNextStatuses(currentStatus: string) {
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return [];
  return statusOrder.slice(currentIndex + 1, currentIndex + 3);
}