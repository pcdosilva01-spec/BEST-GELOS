'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronRight, Filter, X, Package, Snowflake, Tag, Search, MessageCircle, Star } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const categories = [
  { value: 'all', label: 'Todos os Produtos' },
  { value: 'CUBES', label: 'Gelo em Cubos' },
  { value: 'CRUSHED', label: 'Gelo Triturado' },
  { value: 'DRY_ICE', label: 'Gelo Seco' },
  { value: 'CUSTOM', label: 'Gelo Personalizado' },
];

const products = [
  {
    id: 'gelo-cubos-5kg',
    name: 'Gelo em Cubos - 5kg',
    description: 'Gelo cristalino em cubos perfeitos, ideal para bebidas, drinks e resfriamento rápido. Produzido com água purificada.',
    category: 'CUBES',
    weight: 5,
    price: 12.90,
    image: '/images/gelo-cubos.jpg',
    featured: true,
    stock: 500,
  },
  {
    id: 'gelo-cubos-10kg',
    name: 'Gelo em Cubos - 10kg',
    description: 'Embalagem econômica para maior volume. Gelo cristalino em cubos perfeitos para eventos e estabelecimentos.',
    category: 'CUBES',
    weight: 10,
    price: 22.90,
    image: '/images/gelo-cubos-10kg.jpg',
    featured: true,
    stock: 300,
  },
  {
    id: 'gelo-cubos-20kg',
    name: 'Gelo em Cubos - 20kg',
    description: 'Grande volume para eventos e uso comercial intensivo. Cubos cristalinos de longa duração.',
    category: 'CUBES',
    weight: 20,
    price: 39.90,
    image: '/images/gelo-cubos-20kg.jpg',
    featured: false,
    stock: 150,
  },
  {
    id: 'gelo-triturado-5kg',
    name: 'Gelo Triturado - 5kg',
    description: 'Gelo picado finamente, perfeito para caipirinhas, smoothies, drinks tropicais e resfriamento de alimentos.',
    category: 'CRUSHED',
    weight: 5,
    price: 14.90,
    image: '/images/gelo-triturado.jpg',
    featured: true,
    stock: 400,
  },
  {
    id: 'gelo-triturado-10kg',
    name: 'Gelo Triturado - 10kg',
    description: 'Embalagem maior para bares e eventos. Gelo triturado de alta qualidade para drinks profissionais.',
    category: 'CRUSHED',
    weight: 10,
    price: 26.90,
    image: '/images/gelo-triturado-10kg.jpg',
    featured: false,
    stock: 200,
  },
  {
    id: 'gelo-seco-1kg',
    name: 'Gelo Seco - 1kg',
    description: 'Gelo seco (CO2 sólido) para efeitos especiais, transporte de alimentos perecíveis e limpeza criogênica.',
    category: 'DRY_ICE',
    weight: 1,
    price: 45.00,
    image: '/images/gelo-seco.jpg',
    featured: true,
    stock: 100,
  },
  {
    id: 'gelo-seco-5kg',
    name: 'Gelo Seco - 5kg',
    description: 'Embalagem para uso comercial e eventos. Ideal para transporte refrigerado e efeitos especiais.',
    category: 'DRY_ICE',
    weight: 5,
    price: 180.00,
    image: '/images/gelo-seco-5kg.jpg',
    featured: false,
    stock: 50,
  },
  {
    id: 'gelo-personalizado',
    name: 'Gelo Personalizado',
    description: 'Gelo com logotipo, formato personalizado ou cor para eventos corporativos, casamentos e marcas. Consulte condições.',
    category: 'CUSTOM',
    weight: 5,
    price: 35.00,
    image: '/images/gelo-personalizado.jpg',
    featured: true,
    stock: 999,
  },
];

const categoryLabels: Record<string, string> = {
  CUBES: 'Cubos',
  CRUSHED: 'Triturado',
  DRY_ICE: 'Seco',
  CUSTOM: 'Personalizado',
};

const categoryColors: Record<string, string> = {
  CUBES: 'bg-ice-100 text-ice-700 dark:bg-ice-900/30 dark:text-ice-300',
  CRUSHED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DRY_ICE: 'bg-frost-100 text-frost-700 dark:bg-frost-900/30 dark:text-frost-300',
  CUSTOM: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'featured':
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-ice-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ice-200/30 dark:bg-ice-800/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 dark:bg-red-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 text-sm lg:text-base px-4 py-2" style={{ borderColor: 'hsl(var(--ice-border))' }}>
              <Snowflake className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Catálogo Completo de Produtos
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Produtos de <span className="text-ice-600 dark:text-ice-400">Qualidade Superior</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Gelo cristalino produzido em fábrica própria com água purificada.
              Cubos, triturado, seco e personalizado para atender sua necessidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {/* Search */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Buscar Produtos
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Buscar por nome..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoria
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas as categorias" />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ordenar por
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Ordenar" />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destaques</SelectItem>
                      <SelectItem value="price-asc">Menor Preço</SelectItem>
                      <SelectItem value="price-desc">Maior Preço</SelectItem>
                      <SelectItem value="name-asc">Nome A-Z</SelectItem>
                      <SelectItem value="name-desc">Nome Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters */}
                {(searchQuery || selectedCategory !== 'all') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          Busca: "{searchQuery}"
                          <button onClick={() => setSearchQuery('')} className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedCategory !== 'all' && (
                        <Badge variant="secondary" className={categoryColors[selectedCategory]}>
                          {categoryLabels[selectedCategory]}
                          <button onClick={() => setSelectedCategory('all')} className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                    {(searchQuery || selectedCategory !== 'all') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      >
                        Limpar todos os filtros
                      </Button>
                    )}
                  </motion.div>
                )}

                {/* Stock Status */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Disponibilidade</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Em estoque ({filteredProducts.filter(p => p.stock > 10).length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span>Pouco estoque ({filteredProducts.filter(p => p.stock > 0 && p.stock <= 10).length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Indisponível ({filteredProducts.filter(p => p.stock === 0).length})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="gap-1"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="gap-1"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </Button>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Tente ajustar seus filtros ou buscar por outro termo.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpar filtros
                  </Button>
                </motion.div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {filteredProducts.map((product, index) => (
                        <motion.article
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <ProductCard product={product} />
                        </motion.article>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {filteredProducts.map((product, index) => (
                        <motion.article
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <ProductListItem product={product} />
                        </motion.article>
                      ))}
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-ice-600 to-ice-700 dark:from-ice-700 dark:to-ice-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-space-grotesk">
              Não encontrou o que procura?
            </h2>
            <p className="text-ice-100 text-lg mb-8 max-w-2xl mx-auto">
              Precisa de gelo personalizado para seu evento ou empresa?
              Fazemos sob medida com seu logotipo, formato ou cor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pedido/novo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-ice-600 hover:bg-ice-50 text-lg px-8 py-3">
                  <Snowflake className="h-5 w-5 mr-2" />
                  Fazer Pedido Personalizado
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const inStock = product.stock > 10;
  const lowStock = product.stock > 0 && product.stock <= 10;

  return (
    <Link href={`/produtos/${product.id}`}>
      <Card className="h-full group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
            <Snowflake className="h-12 w-12" />
          </div>
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white" variant="default">
              Destaque
            </Badge>
          )}
          <div className="absolute top-3 right-3 flex gap-1">
            <Badge
              variant="outline"
              className={cn(categoryColors[product.category], 'backdrop-blur-sm bg-white/80 dark:bg-gray-900/80')}
            >
              {categoryLabels[product.category]}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button size="sm" variant="secondary" className="flex-1">
              <Snowflake className="h-4 w-4 mr-1" />
              Detalhes
            </Button>
            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
              <Package className="h-4 w-4 mr-1" />
              Pedir
            </Button>
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1 pr-2">
              {product.name}
            </CardTitle>
            {product.featured && (
              <Star className="h-4 w-4 text-amber-500 fill-current flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
            {product.description}
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                / {product.weight}kg
              </span>
            </div>
            <Badge
              variant={inStock ? 'default' : lowStock ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {inStock ? 'Em estoque' : lowStock ? `Últimas ${product.stock} un.` : 'Indisponível'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.weight}kg por embalagem
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ProductListItem({ product }: { product: typeof products[0] }) {
  const inStock = product.stock > 10;
  const lowStock = product.stock > 0 && product.stock <= 10;

  return (
    <Card className="flex flex-col sm:flex-row gap-4 p-4 group hover:shadow-md transition-shadow">
      <div className="relative w-full sm:w-32 h-32 sm:h-auto aspect-square flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <Snowflake className="h-8 w-8" />
        </div>
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white" variant="default">
            Destaque
          </Badge>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant={inStock ? 'default' : lowStock ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {inStock ? 'Em estoque' : lowStock ? `Últimas ${product.stock} un.` : 'Indisponível'}
              </Badge>
              <Badge variant="outline" className={categoryColors[product.category]}>
                {categoryLabels[product.category]}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                / {product.weight}kg
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Package className="h-4 w-4" />
              <span>{product.weight}kg por embalagem</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`/produtos/${product.id}`}>
                <ChevronRight className="h-4 w-4 mr-1" />
                Detalhes
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              disabled={!inStock && !lowStock}
            >
              <Package className="h-4 w-4 mr-1" />
              Adicionar ao Pedido
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}