'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Snowflake, Truck, Shield, Star, CheckCircle, ChevronLeft,
  ChevronRight, Plus, Minus, MessageCircle, Package,
  MapPin, Clock, CreditCard, Heart, Share2, Loader2,
  ArrowLeft, Tag, Weight, Package as PackageIcon, AlertCircle,
  Droplets, Box, Flame, Sparkles, Filter
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  weight: number;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  featured: boolean;
  stock: number;
  specs: Record<string, string>;
  features: string[];
  warnings: string[];
}

interface ProductDetailClientProps {
  product: Product;
  categoryLabels: Record<string, string>;
  categoryIcons: Record<string, string>;
  relatedProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CUBES: Box,
  CRUSHED: Droplets,
  DRY_ICE: Flame,
  CUSTOM: Sparkles,
};

const CategoryIcon = ({ category, categoryIcons }: { category: string; categoryIcons: Record<string, string> }) => {
  const Icon = iconMap[categoryIcons[category] as keyof typeof iconMap] || Box;
  return <Icon className="w-4 h-4" />;
};

export default function ProductDetailClient({
  product,
  categoryLabels,
  categoryIcons,
  relatedProducts,
}: ProductDetailClientProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('descricao');
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image,
      category: product.category,
      weight: product.weight,
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const whatsappUrl = generateWhatsAppLink(`Olá! Gostaria de pedir: ${product.name} (${product.weight}kg)`);

  return (
    <main className="min-h-screen bg-frost-50 dark:bg-frost-950">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 dark:bg-frost-900/90 backdrop-blur-glass border-b border-frost-200 dark:border-frost-800 sticky top-0 z-50"
      >
        <div className="container-custom flex items-center justify-between h-16 lg:h-20">
          <Link href="/produtos" className="flex items-center gap-2 p-2 hover:bg-frost-100 dark:hover:bg-frost-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-frost-600 dark:text-frost-400" />
            <span className="hidden sm:block font-medium text-frost-700 dark:text-frost-300">Voltar ao catálogo</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-cta text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:block">WhatsApp</span>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="container-custom py-8 lg:py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 lg:mb-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm text-frost-500 dark:text-frost-400">
            <li><Link href="/" className="hover:text-ice-600 dark:hover:text-ice-400 transition-colors">Início</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/produtos" className="hover:text-ice-600 dark:hover:text-ice-400 transition-colors">Produtos</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-frost-900 dark:text-white truncate max-w-xs" aria-current="page">{product.name}</li>
          </ol>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-frost-50 dark:bg-frost-900/30">
                <motion.img
                  src={product.images[currentImage]}
                  alt={`${product.name} - Imagem ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((currentImage - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors z-10"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((currentImage + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors z-10"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </>
                )}
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-white" variant="default">
                    <Star className="w-3 h-3 mr-1" /> Destaque
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white line-through" variant="default">
                    {formatCurrency(product.originalPrice)}
                  </Badge>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={cn(
                        'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                        idx === currentImage
                          ? 'border-ice-500 dark:border-ice-400 ring-2 ring-ice-500/20'
                          : 'border-transparent hover:border-frost-300 dark:hover:border-frost-600'
                      )}
                      aria-label={`Ver imagem ${idx + 1}`}
                      aria-current={idx === currentImage ? 'true' : 'false'}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <CategoryIcon category={product.category} categoryIcons={categoryIcons} />
                  {categoryLabels[product.category]}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Weight className="w-3 h-3" />
                  {product.weight}kg
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <PackageIcon className="w-3 h-3" />
                  Em estoque
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-frost-900 dark:text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-frost-600 dark:text-frost-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 flex-wrap p-4 bg-gradient-ice-light dark:from-frost-900/50 dark:to-frost-800/50 rounded-xl border border-frost-200 dark:border-frost-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-cta bg-clip-text text-transparent">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-frost-500 dark:text-frost-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-frost-500 dark:text-frost-400 ml-auto">
                  Entrega em até 2h na Grande SP
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity" className="font-semibold text-frost-900 dark:text-white">
                    Quantidade
                  </Label>
                  <div className="flex items-center border border-frost-300 dark:border-frost-600 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-5 h-5 text-frost-600 dark:text-frost-400" />
                    </button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center border-none bg-transparent focus:ring-0 text-lg font-semibold"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-5 h-5 text-frost-600 dark:text-frost-400" />
                    </button>
                  </div>
                  <span className="text-sm text-frost-500 dark:text-frost-400">Estoque: {product.stock} un.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className="flex-1 py-4 text-lg bg-gradient-cta hover:shadow-lg hover:shadow-red-500/25 transition-all"
                    size="lg"
                  >
                    {addedToCart ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" /> Adicionado ao carrinho
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5 mr-2" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </Button>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pedir via WhatsApp</span>
                  </Link>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-white dark:bg-frost-900 rounded-xl border border-frost-200 dark:border-frost-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                    <Snowflake className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-frost-900 dark:text-white">Pureza Garantida</p>
                    <p className="text-xs text-frost-500 dark:text-frost-400">Água osmose reversa + UV</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-frost-900 dark:text-white">Entrega Rápida</p>
                    <p className="text-xs text-frost-500 dark:text-frost-400">Até 2h Grande SP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-frost-900 dark:text-white">Qualidade Certificada</p>
                    <p className="text-xs text-frost-500 dark:text-frost-400">ANVISA e MAPA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                    <Package className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-frost-900 dark:text-white">Embalagem Térmica</p>
                    <p className="text-xs text-frost-500 dark:text-frost-400">Caixa inclusa na entrega</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-frost-100 dark:bg-frost-800 rounded-xl p-1">
                  <TabsTrigger value="descricao" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-ice-600 dark:data-[state=active]:text-ice-400">
                    Descrição
                  </TabsTrigger>
                  <TabsTrigger value="especificacoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-ice-600 dark:data-[state=active]:text-ice-400">
                    Especificações
                  </TabsTrigger>
                  <TabsTrigger value="beneficios" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-ice-600 dark:data-[state=active]:text-ice-400">
                    Benefícios
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="descricao" className="mt-6 space-y-4">
                  <div className="prose prose-frost dark:prose-invert max-w-none">
                    <p className="text-frost-700 dark:text-frost-300 leading-relaxed">{product.longDescription}</p>
                  </div>
                  {product.warnings.length > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5" /> Atenção
                      </h4>
                      <ul className="space-y-1 text-red-700 dark:text-red-300">
                        {product.warnings.map((warning, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="flex-shrink-0 mt-0.5">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="especificacoes" className="mt-6">
                  <dl className="divide-y divide-frost-200 dark:divide-frost-800">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <dt className="font-medium text-frost-900 dark:text-white">{key}</dt>
                        <dd className="text-frost-600 dark:text-frost-300 text-right sm:text-left">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </TabsContent>

                <TabsContent value="beneficios" className="mt-6">
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-frost-900 rounded-xl border border-frost-200 dark:border-frost-800">
                        <CheckCircle className="w-5 h-5 text-ice-500 dark:text-ice-400 flex-shrink-0 mt-0.5" />
                        <span className="text-frost-700 dark:text-frost-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 lg:mt-24"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-frost-900 dark:text-white">
                Produtos Relacionados
              </h2>
              <Link
                href="/produtos"
                className="text-ice-600 dark:text-ice-400 hover:underline font-medium flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/produtos/${related.id}`}
                  className="group bg-white dark:bg-frost-900 rounded-2xl overflow-hidden border border-frost-200 dark:border-frost-800 hover:border-ice-300 dark:hover:border-ice-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-frost-50 dark:bg-frost-900/30">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[related.category as keyof typeof categoryLabels] || related.category}
                    </Badge>
                    <h3 className="font-semibold text-frost-900 dark:text-white group-hover:text-ice-600 dark:group-hover:text-ice-400 transition-colors line-clamp-1">
                      {related.name}
                    </h3>
                    <span className="text-xl font-bold bg-gradient-cta bg-clip-text text-transparent">
                      {formatCurrency(related.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA WhatsApp */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 lg:mt-24"
        >
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-cta rounded-2xl p-8 lg:p-12 text-center hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white/20" />
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Peça Agora pelo WhatsApp
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Atendimento rápido e personalizado. Tire dúvidas, faça seu pedido e agende a entrega.
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur rounded-full text-white font-semibold hover:bg-white/30 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Abrir Conversa no WhatsApp
            </span>
          </Link>
        </motion.section>
      </div>
    </main>
  );
}