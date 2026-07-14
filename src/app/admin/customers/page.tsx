'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Users,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  isActive: boolean;
  addresses: Array<{
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }>;
  ordersCount: number;
  totalSpent: number;
  lastOrderAt: string | null;
  createdAt: string;
}

interface CustomersResponse {
  customers: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminCustomersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
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
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchCustomers();
    }
  }, [isAuthenticated, authLoading, filters, pagination.page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };

      const response = await api.adminGetCustomers(params);
      setCustomers(response.customers);
      setPagination(response.pagination);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error('Fetch customers error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      setDeletingId(id);
      await api.adminDeleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert('Erro ao excluir cliente');
      console.error('Delete customer error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (customer: Customer) => {
    try {
      await api.adminUpdateCustomer(customer.id, { isActive: !customer.isActive });
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? { ...c, isActive: !c.isActive } : c))
      );
    } catch (err) {
      alert('Erro ao alterar status');
      console.error('Toggle status error:', err);
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    const aVal = a[filters.sortBy as keyof Customer];
    const bVal = b[filters.sortBy as keyof Customer];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return filters.sortOrder === 'asc' ? 1 : -1;
    if (bVal == null) return filters.sortOrder === 'asc' ? -1 : 1;
    if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: key,
      sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc',
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
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Clientes</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Gerencie sua base de clientes
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-frost-400" aria-hidden="true" />
                <Input
                  placeholder="Buscar por nome, email, telefone..."
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
                  className="px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent min-w-[150px]"
                >
                  <option value="">Todos os status</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Lista de Clientes ({pagination.total})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-ice-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">Carregando clientes...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchCustomers}>
                  Tentar novamente
                </Button>
              </div>
            ) : customers.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-frost-300 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500 dark:text-frost-400 mb-4">Nenhum cliente encontrado</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full" role="table">
                    <thead>
                      <tr className="border-b border-frost-200 dark:border-frost-700">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('ordersCount')}>
                          Pedidos
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('totalSpent')}>
                          Total Gasto
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('lastOrderAt')}>
                          Último Pedido
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('createdAt')}>
                          Cadastro
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider pr-6">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-frost-200 dark:divide-frost-700">
                      <AnimatePresence mode="popLayout">
                        {sortedCustomers.map((customer, index) => (
                          <motion.tr
                            key={customer.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className={cn('hover:bg-frost-50 dark:hover:bg-frost-800/50 transition-colors', !customer.isActive && 'opacity-50')}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-frost-900 dark:text-white">{customer.name}</p>
                                <p className="text-sm text-frost-500 dark:text-frost-400">{customer.email}</p>
                                <p className="text-sm text-frost-500 dark:text-frost-400">{customer.phone}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-frost-400" aria-hidden="true" />
                                <span className="font-medium text-frost-900 dark:text-white">{customer.ordersCount}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-frost-900 dark:text-white">
                                {formatCurrency(customer.totalSpent)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-frost-600 dark:text-frost-400">
                                {customer.lastOrderAt ? formatDate(customer.lastOrderAt) : 'Nunca'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-frost-600 dark:text-frost-400">
                                {formatDate(customer.createdAt)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                variant={customer.isActive ? 'default' : 'outline'}
                                className={cn(
                                  customer.isActive
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'bg-frost-100 text-frost-600 dark:bg-frost-800 dark:text-frost-400'
                                )}
                              >
                                {customer.isActive ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`Ver ${customer.name}`}
                                >
                                  <Link href={`/admin/customers/${customer.id}`}>
                                    <Eye className="w-4 h-4" aria-hidden="true" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`Editar ${customer.name}`}
                                >
                                  <Link href={`/admin/customers/${customer.id}/edit`}>
                                    <Edit className="w-4 h-4" aria-hidden="true" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleStatus(customer)}
                                  aria-label={customer.isActive ? `Desativar ${customer.name}` : `Ativar ${customer.name}`}
                                  className={customer.isActive ? 'text-frost-600 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-600'}
                                >
                                  {customer.isActive ? (
                                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                  ) : (
                                    <XCircle className="w-4 h-4" aria-hidden="true" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(customer.id)}
                                  disabled={deletingId === customer.id}
                                  aria-label={`Excluir ${customer.name}`}
                                  className="text-frost-600 hover:text-red-600"
                                >
                                  {deletingId === customer.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                  )}
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