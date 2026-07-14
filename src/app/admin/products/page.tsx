'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  weight: number;
  price: number;
  stock: number;
  minStock: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const categories = [
  { value: 'CUBES', label: 'Cubos' },
  { value: 'CRUSHED', label: 'Triturado' },
  { value: 'CUSTOM', label: 'Personalizado' },
  { value: 'DRY_ICE', label: 'Gelo Seco' },
];

export default function AdminProductsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
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
    category: '',
    status: '',
    stock: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'sortOrder', direction: 'asc' as 'asc' | 'desc' });
  const [showInactive, setShowInactive] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchProducts();
    }
  }, [isAuthenticated, authLoading, filters, pagination.page, sortConfig, showInactive]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search || undefined,
        category: filters.category || undefined,
        includeInactive: showInactive,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      };

      const response = await api.adminGetProducts(params);
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      setDeletingId(id);
      await api.adminDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Erro ao excluir produto');
      console.error('Delete product error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      await api.adminUpdateProduct(product.id, { isActive: !product.isActive });
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isActive: !p.isActive } : p))
      );
    } catch (err) {
      alert('Erro ao alterar status');
      console.error('Toggle status error:', err);
    }
  };

  const handleStockUpdate = async (product: Product, operation: 'add' | 'subtract', amount: number) => {
    try {
      await api.adminUpdateStock(product.id, amount, operation);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, stock: operation === 'add' ? p.stock + amount : p.stock - amount }
            : p
        )
      );
    } catch (err) {
      alert('Erro ao atualizar estoque');
      console.error('Stock update error:', err);
    }
  };

  const handleReorder = async () => {
    const ids = products.map((p) => p.id);
    try {
      setReordering(true);
      await api.adminReorderProducts(ids);
      alert('Ordem atualizada com sucesso');
    } catch (err) {
      alert('Erro ao reordenar');
      console.error('Reorder error:', err);
    } finally {
      setReordering(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof Product];
    const bVal = b[sortConfig.key as keyof Product];
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
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Produtos</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Gerencie seu catálogo de produtos de gelo
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/products/import">Importar</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                Novo Produto
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-frost-400" aria-hidden="true" />
                <Input
                  placeholder="Buscar produtos..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && setPagination((prev) => ({ ...prev, page: 1 }))}
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <select
                  value={filters.category}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, category: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent min-w-[150px]"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>

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
                  <option value="featured">Destaque</option>
                </select>

                <select
                  value={filters.stock}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, stock: e.target.value }));
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent min-w-[150px]"
                >
                  <option value="">Estoque</option>
                  <option value="low">Baixo</option>
                  <option value="out">Zerado</option>
                  <option value="ok">Normal</option>
                </select>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="w-4 h-4 text-ice-500 border-frost-300 rounded focus:ring-ice-500"
                  />
                  <span className="text-sm text-frost-600 dark:text-frost-400">Mostrar inativos</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Lista de Produtos ({pagination.total})</CardTitle>
              {products.length > 1 && (
                <Button variant="outline" size="sm" onClick={handleReorder} disabled={reordering}>
                  <ArrowUpDown className="w-4 h-4 mr-2" aria-hidden="true" />
                  {reordering ? 'Salvando...' : 'Reordenar'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-ice-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500">{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchProducts}>
                  Tentar novamente
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-frost-300 mx-auto mb-2" aria-hidden="true" />
                <p className="text-frost-500 dark:text-frost-400 mb-4">Nenhum produto encontrado</p>
                <Button asChild>
                  <Link href="/admin/products/new">Criar primeiro produto</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full" role="table">
                    <thead>
                      <tr className="border-b border-frost-200 dark:border-frost-700">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider">
                          Produto
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('category')}>
                          Categoria
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('price')}>
                          Preço
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-frost-500 dark:text-frost-400 uppercase tracking-wider cursor-pointer hover:text-frost-700 dark:hover:text-frost-300"
                            onClick={() => handleSort('stock')}>
                          Estoque
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
                        {sortedProducts.map((product, index) => (
                          <motion.tr
                            key={product.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className={cn('hover:bg-frost-50 dark:hover:bg-frost-800/50', !product.isActive && 'opacity-50')}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-frost-100 dark:bg-frost-800 flex items-center justify-center flex-shrink-0">
                                  {product.images[0] ? (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="w-full h-full rounded-xl object-cover"
                                    />
                                  ) : (
                                    <Package className="w-6 h-6 text-frost-400" aria-hidden="true" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-frost-900 dark:text-white truncate">{product.name}</p>
                                  <p className="text-sm text-frost-500 dark:text-frost-400 truncate">
                                    {product.weight}kg • {product.category}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.value === product.category)?.label || product.category}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-frost-900 dark:text-white">
                                {formatCurrency(product.price)}
                              </span>
                              <span className="text-sm text-frost-500 dark:text-frost-400 ml-1">
                                /saco
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  'font-medium',
                                  product.stock <= product.minStock ? 'text-red-600 dark:text-red-400' :
                                  product.stock === 0 ? 'text-red-600 dark:text-red-400' :
                                  'text-frost-900 dark:text-white'
                                )}>
                                  {product.stock}
                                </span>
                                {product.stock <= product.minStock && product.stock > 0 && (
                                  <AlertTriangle className="w-4 h-4 text-amber-500" aria-label="Estoque baixo" />
                                )}
                                {product.stock === 0 && (
                                  <XCircle className="w-4 h-4 text-red-500" aria-label="Sem estoque" />
                                )}
                              </div>
                              <p className="text-xs text-frost-400">Mín: {product.minStock}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={product.isActive ? 'default' : 'outline'}
                                  className={cn(
                                    product.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                    'bg-frost-100 text-frost-600 dark:bg-frost-800 dark:text-frost-400'
                                  )}
                                >
                                  {product.isActive ? 'Ativo' : 'Inativo'}
                                </Badge>
                                {product.isFeatured && (
                                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                    Destaque
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`Ver ${product.name}`}
                                >
                                  <Link href={`/admin/products/${product.id}`}>
                                    <Eye className="w-4 h-4" aria-hidden="true" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  aria-label={`Editar ${product.name}`}
                                >
                                  <Link href={`/admin/products/${product.id}/edit`}>
                                    <Edit className="w-4 h-4" aria-hidden="true" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleStatus(product)}
                                  aria-label={product.isActive ? `Desativar ${product.name}` : `Ativar ${product.name}`}
                                  className={product.isActive ? 'text-frost-600 hover:text-red-600' : 'text-emerald-600 hover:text-emerald-600'}
                                >
                                  {product.isActive ? (
                                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                  ) : (
                                    <XCircle className="w-4 h-4" aria-hidden="true" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(product.id)}
                                  disabled={deletingId === product.id}
                                  aria-label={`Excluir ${product.name}`}
                                  className="text-frost-600 hover:text-red-600"
                                >
                                  {deletingId === product.id ? (
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