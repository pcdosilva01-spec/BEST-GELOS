'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Package,
  Map,
  Calendar,
  Filter,
  Search,
  Phone,
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
  };
  status: string;
  items: Array<{
    productName: string;
    quantity: number;
    weight: number;
  }>;
  totalWeight: number;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  driver?: {
    id: string;
    name: string;
    phone: string;
  };
  createdAt: string;
}

interface DeliveryResponse {
  deliveries: DeliveryOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const statusConfig = {
  READY: { label: 'Pronto para Entrega', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle },
  OUT_FOR_DELIVERY: { label: 'Saiu para Entrega', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: Truck },
  DELIVERED: { label: 'Entregue', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
};

const statusOrder = ['READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export default function AdminDeliveryPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deliveries, setDeliveries] = useState<DeliveryOrder[]>([]);
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
    date: '',
    driver: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'deliveryDate', direction: 'asc' as 'asc' | 'desc' });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchDeliveries();
    }
  }, [isAuthenticated, authLoading, filters, pagination.page, sortConfig, selectedDate]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        date: selectedDate || undefined,
        driver: filters.driver || undefined,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      };

      const response = await api.adminGetDeliveries(params);
      setDeliveries(response.deliveries);
      setPagination(response.pagination);
    } catch (err) {
      setError('Erro ao carregar entregas');
      console.error('Fetch deliveries error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (deliveryId: string, newStatus: string) => {
    try {
      setUpdatingId(deliveryId);
      await api.adminUpdateDeliveryStatus(deliveryId, { status: newStatus });
      setDeliveries((prev) =>
        prev.map((d) => (d.id === deliveryId ? { ...d, status: newStatus } : d))
      );
    } catch (err) {
      alert('Erro ao atualizar status da entrega');
      console.error('Delivery status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getNextStatuses = (currentStatus: string) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return [];
    return statusOrder.slice(currentIndex + 1, currentIndex + 3);
  };

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

  const todayDeliveries = deliveries.filter(d => d.deliveryDate === selectedDate);
  const stats = {
    total: todayDeliveries.length,
    ready: todayDeliveries.filter(d => d.status === 'READY').length,
    outForDelivery: todayDeliveries.filter(d => d.status === 'OUT_FOR_DELIVERY').length,
    delivered: todayDeliveries.filter(d => d.status === 'DELIVERED').length,
    cancelled: todayDeliveries.filter(d => d.status === 'CANCELLED').length,
  };

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
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Rota de Entrega</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Gerencie as entregas do dia
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-frost-400" aria-hidden="true" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-emerald-700 dark:text-emerald-300">Prontos</p>
                  <p className="heading-md font-bold text-emerald-900 dark:text-emerald-100">{stats.ready}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-blue-700 dark:text-blue-300">Em Rota</p>
                  <p className="heading-md font-bold text-blue-900 dark:text-blue-100">{stats.outForDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-green-700 dark:text-green-300">Entregues</p>
                  <p className="heading-md font-bold text-green-900 dark:text-green-100">{stats.delivered}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-red-700 dark:text-red-300">Cancelados</p>
                  <p className="heading-md font-bold text-red-900 dark:text-red-100">{stats.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-ice-50 dark:bg-ice-900/20 border-ice-200 dark:border-ice-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-ice-600 dark:text-ice-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-ice-700 dark:text-ice-300">Total do Dia</p>
                  <p className="heading-md font-bold text-ice-900 dark:text-ice-100">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-frost-400" aria-hidden="true" />
                <Input
                  placeholder="Buscar por cliente, endereço, pedido..."
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
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries List */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Entregas de {formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long' })} ({deliveries.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-ice-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">Carregando entregas...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchDeliveries}>
                  Tentar novamente
                </Button>
              </div>
            ) : deliveries.length === 0 ? (
              <div className="p-8 text-center">
                <Truck className="w-12 h-12 text-frost-300 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500 dark:text-frost-400 mb-4">Nenhuma entrega para esta data</p>
              </div>
            ) : (
              <div className="divide-y divide-frost-200 dark:divide-frost-700">
                {deliveries.map((delivery, index) => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-6 hover:bg-frost-50 dark:hover:bg-frost-800/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-frost-900 dark:text-white text-lg">#{delivery.orderNumber}</span>
                          <Badge className={cn(statusConfig[delivery.status as keyof typeof statusConfig]?.color || 'bg-frost-100 text-frost-800')}>
                            {statusConfig[delivery.status as keyof typeof statusConfig]?.label || delivery.status}
                          </Badge>
                          <span className="text-sm text-frost-500 dark:text-frost-400">
                            {delivery.totalWeight}kg total
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-frost-600 dark:text-frost-400 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            {delivery.address.street}, {delivery.address.number}
                            {delivery.address.complement && ` - ${delivery.address.complement}`}
                            {delivery.address.neighborhood && `, ${delivery.address.neighborhood}`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {delivery.deliveryTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" aria-hidden="true" />
                            {delivery.items.length} item{delivery.items.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        <p className="font-medium text-frost-900 dark:text-white">{delivery.customer.name}</p>
                        <p className="text-sm text-frost-500 dark:text-frost-400">{delivery.customer.phone}</p>

                        {delivery.notes && (
                          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                            <strong>Obs:</strong> {delivery.notes}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {delivery.status !== 'DELIVERED' && delivery.status !== 'CANCELLED' && (
                          <div className="flex gap-2 flex-wrap">
                            {getNextStatuses(delivery.status).map((nextStatus) => (
                              <Button
                                key={nextStatus}
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(delivery.id, nextStatus)}
                                disabled={updatingId === delivery.id}
                                className="whitespace-nowrap"
                              >
                                {statusConfig[nextStatus as keyof typeof statusConfig]?.label}
                              </Button>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`https://maps.google.com/?q=${encodeURIComponent(`${delivery.address.street}, ${delivery.address.number}, ${delivery.address.neighborhood}, ${delivery.address.city}, ${delivery.address.state}`)}`} target="_blank" rel="noopener">
                              <Navigation className="w-4 h-4 mr-1" aria-hidden="true" />
                              Rota
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`tel:${delivery.customer.phone}`}>
                              <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
                              Ligar
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Items expandable */}
                    <details className="mt-4 pt-4 border-t border-frost-200 dark:border-frost-700">
                      <summary className="flex items-center gap-2 text-sm text-frost-500 dark:text-frost-400 cursor-pointer">
                        <ChevronRight className="w-4 h-4 transition-transform" aria-hidden="true" />
                        Ver itens do pedido
                      </summary>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {delivery.items.map((item, i) => (
                          <div key={i} className="p-3 bg-frost-50 dark:bg-frost-800/50 rounded-lg">
                            <p className="font-medium text-frost-900 dark:text-white">{item.productName}</p>
                            <p className="text-sm text-frost-500 dark:text-frost-400">
                              Qtd: {item.quantity} • {item.weight}kg cada
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
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