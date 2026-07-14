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
  ArrowLeft, Tag, Weight, Package as PackageIcon, AlertCircle
} from 'lucide-react';

const products = {
  'gelo-cubos-5kg': {
    id: 'gelo-cubos-5kg',
    name: 'Gelo em Cubos - 5kg',
    description: 'Gelo cristalino em cubos perfeitos, ideal para bebidas, drinks e resfriamento rápido. Produzido com água purificada por osmose reversa e tratamento UV, garantindo pureza e sabor neutro.',
    longDescription: 'Nosso gelo em cubos de 5kg é a escolha ideal para uso doméstico e comercial leve. Cada cubo é produzido em fábrica própria com rigoroso controle de qualidade, garantindo transparência total e ausência de impurezas. A embalagem plástica alimentícia lacrada mantém a integridade do produto até o momento do uso.',
    category: 'CUBES',
    weight: 5,
    price: 12.90,
    originalPrice: 14.90,
    image: '/images/gelo-cubos.jpg',
    images: ['/images/gelo-cubos.jpg', '/images/gelo-cubos-2.jpg', '/images/gelo-cubos-3.jpg'],
    featured: true,
    stock: 500,
    specs: {
      'Tipo': 'Cubos cristalinos',
      'Peso líquido': '5 kg',
      'Dimensões da embalagem': '35 x 25 x 15 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Água purificada (osmose reversa + UV)',
      'Cubos perfeitos e transparentes',
      'Embalagem alimentícia lacrada',
      'Caixa térmica na entrega',
      'Rastreabilidade por lote',
    ],
    warnings: [],
  },
  'gelo-cubos-10kg': {
    id: 'gelo-cubos-10kg',
    name: 'Gelo em Cubos - 10kg',
    description: 'Embalagem econômica para maior volume. Gelo cristalino em cubos perfeitos para eventos e estabelecimentos.',
    longDescription: 'Embalagem de 10kg com excelente custo-benefício para bares, restaurantes e eventos de médio porte. Mesma qualidade premium do gelo em cubos 5kg, com desconto por volume.',
    category: 'CUBES',
    weight: 10,
    price: 22.90,
    originalPrice: 25.90,
    image: '/images/gelo-cubos-10kg.jpg',
    images: ['/images/gelo-cubos-10kg.jpg', '/images/gelo-cubos-10kg-2.jpg'],
    featured: true,
    stock: 300,
    specs: {
      'Tipo': 'Cubos cristalinos',
      'Peso líquido': '10 kg',
      'Dimensões da embalagem': '45 x 30 x 20 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Água purificada (osmose reversa + UV)',
      'Desconto por volume (10kg)',
      'Embalagem reforçada para transporte',
      'Caixa térmica na entrega',
      'Rastreabilidade por lote',
    ],
    warnings: [],
  },
  'gelo-triturado-5kg': {
    id: 'gelo-triturado-5kg',
    name: 'Gelo Triturado - 5kg',
    description: 'Gelo picado finamente, perfeito para caipirinhas, smoothies, drinks tropicais e resfriamento de alimentos.',
    longDescription: 'Nosso gelo triturado passa por processo de fragmentação controlada, resultando em pedaços uniformes que resfriam mais rápido e diluem de forma equilibrada. Ideal para coquetelaria profissional e resfriamento rápido de bebidas e alimentos.',
    category: 'CRUSHED',
    weight: 5,
    price: 14.90,
    originalPrice: 16.90,
    image: '/images/gelo-triturado.jpg',
    images: ['/images/gelo-triturado.jpg', '/images/gelo-triturado-2.jpg'],
    featured: true,
    stock: 400,
    specs: {
      'Tipo': 'Triturado uniforme',
      'Peso líquido': '5 kg',
      'Granulometria': '5-10 mm',
      'Dimensões da embalagem': '35 x 25 x 15 cm',
      'Validade': 'Indeterminada (congelado)',
      'Armazenamento': 'Freezer a -18°C ou inferior',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Granulometria controlada (5-10mm)',
      'Resfriamento 40% mais rápido',
      'Diluição equilibrada para drinks',
      'Embalagem alimentícia lacrada',
      'Caixa térmica na entrega',
    ],
    warnings: [],
  },
  'gelo-seco-1kg': {
    id: 'gelo-seco-1kg',
    name: 'Gelo Seco - 1kg',
    description: 'Dióxido de carbono sólido a -78°C. Ideal para efeitos especiais, transporte de perecíveis, limpeza criogênica e aplicações industriais.',
    longDescription: 'Gelo seco de alta pureza para aplicações que exigem temperaturas extremamente baixas. Sublima diretamente de sólido para gás sem deixar resíduos líquidos. ATENÇÃO: Manuseie com luvas térmicas. Não ingerir. Mantenha em local ventilado.',
    category: 'DRY_ICE',
    weight: 1,
    price: 45.00,
    originalPrice: 49.00,
    image: '/images/gelo-seco.jpg',
    images: ['/images/gelo-seco.jpg', '/images/gelo-seco-2.jpg'],
    featured: false,
    stock: 100,
    specs: {
      'Tipo': 'CO₂ sólido (gelo seco)',
      'Temperatura': '-78,5°C',
      'Peso líquido': '1 kg',
      'Duração aprox.': '18-24h em caixa térmica',
      'Embalagem': 'Isopor + saco plástico',
      'Certificação': 'ABNT NBR 15714',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Temperatura -78,5°C',
      'Sublimação sem resíduo líquido',
      'Embalagem isolante inclusa',
      'Aviso de segurança na embalagem',
      'Entrega em caixa térmica selada',
    ],
    warnings: [
      'USE LUVAS TÉRMICAS - Risco de queimadura por frio',
      'NÃO INGERIR - Não é próprio para consumo',
      'VENTILAÇÃO ADEQUADA - Sublima CO₂, desloca oxigênio',
      'NÃO ARMAZENAR EM RECIPIENTES HERMÉTICOS - Risco de explosão',
      'MANTENHA FORA DO ALCANCE DE CRIANÇAS E ANIMAIS',
    ],
  },
  'gelo-personalizado': {
    id: 'gelo-personalizado',
    name: 'Gelo Personalizado',
    description: 'Gelo com sua marca, logotipo ou formato exclusivo. Ideal para eventos corporativos, casamentos, lançamentos de produtos e ações promocionais.',
    longDescription: 'Produzimos gelo personalizado com a identidade visual da sua marca ou evento. Utilizamos moldes exclusivos para criar cubos com logotipos, iniciais ou formatos especiais. Pedido mínimo: 50kg. Prazo de produção: 72h após aprovação da arte.',
    category: 'CUSTOM',
    weight: 50,
    price: 35.00,
    originalPrice: 39.00,
    image: '/images/gelo-personalizado.jpg',
    images: ['/images/gelo-personalizado.jpg', '/images/gelo-personalizado-2.jpg', '/images/gelo-personalizado-3.jpg'],
    featured: true,
    stock: 999,
    specs: {
      'Tipo': 'Personalizado (conforme arte)',
      'Pedido mínimo': '50 kg',
      'Prazo de produção': '72h após aprovação da arte',
      'Formatos disponíveis': 'Cubos com logo, esferas, formatos especiais',
      'Cores': 'Natural (transparente) ou corante alimentício',
      'Embalagem': 'Sacos personalizados opcionais',
      'Certificação': 'ANVISA / Ministério da Agricultura',
      'Origem': 'Fábrica própria Mauá/SP',
    },
    features: [
      'Molde exclusivo para sua marca',
      'Aprovação de arte antes da produção',
      'Corante alimentício opcional',
      'Embalagem personalizada disponível',
      'Entrega em caixas térmicas',
      'Ideal para eventos e ações de marca',
    ],
    warnings: [],
  },
};

const relatedProducts = [
  { id: 'gelo-cubos-5kg', name: 'Gelo em Cubos - 5kg', price: 12.90, image: '/images/gelo-cubos.jpg', category: 'CUBES' },
  { id: 'gelo-triturado-5kg', name: 'Gelo Triturado - 5kg', price: 14.90, image: '/images/gelo-triturado.jpg', category: 'CRUSHED' },
  { id: 'gelo-seco-1kg', name: 'Gelo Seco - 1kg', price: 45.00, image: '/images/gelo-seco.jpg', category: 'DRY_ICE' },
  { id: 'gelo-personalizado', name: 'Gelo Personalizado', price: 35.00, image: '/images/gelo-personalizado.jpg', category: 'CUSTOM' },
];

const categoryLabels: Record<string, string> = {
  CUBES: 'Cubos',
  CRUSHED: 'Triturado',
  DRY_ICE: 'Gelo Seco',
  CUSTOM: 'Personalizado',
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  CUBES: Snowflake,
  CRUSHED: PackageIcon,
  DRY_ICE: Snowflake,
  CUSTOM: Tag,
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products[resolvedParams.slug as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center p-8">
          <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Produto não encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">O produto que você procura não existe ou foi removido.</p>
          <Link href="/produtos" className="text-ice-600 dark:text-ice-400 hover:underline font-medium">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

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

  const whatsappMessage = `Olá! Gostaria de pedir: ${product.name} (${product.weight}kg) - ${formatCurrency(product.price)}. Quantidade: ${quantity}. Podem me passar o valor total com entrega?`;
  const whatsappUrl = generateWhatsAppLink(whatsappMessage);

  const CategoryIcon = categoryIcons[product.category] || Snowflake;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-frost-200 dark:border-frost-800 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/produtos" className="flex items-center gap-2 text-ice-600 dark:text-ice-400 hover:opacity-80">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar aos produtos</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Snowflake className="w-8 h-8 text-ice-600 dark:text-ice-400" />
              <span className="font-space-grotesk font-bold text-xl text-gray-900 dark:text-white">BEST<span className="text-red-600">Gelo</span></span>
            </Link>
          </div>
        </div>
      </motion.nav>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8 lg:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/" className="hover:text-ice-600 dark:hover:text-ice-400">Início</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/produtos" className="hover:text-ice-600 dark:hover:text-ice-400">Produtos</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link href={`/produtos?category=${product.category}`} className="hover:text-ice-600 dark:hover:text-ice-400 capitalize">{categoryLabels[product.category].toLowerCase()}</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-900 dark:text-white truncate max-w-xs" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                    <CategoryIcon className="w-3 h-3" />
                    {categoryLabels[product.category]}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <PackageIcon className="w-3 h-3" />
                    {product.weight} kg
                  </Badge>
                  <Badge variant={product.stock > 50 ? 'default' : product.stock > 10 ? 'secondary' : 'destructive'} className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {product.stock > 50 ? `Em estoque (${product.stock})` : product.stock > 10 ? `Poucas unidades (${product.stock})` : `Últimas ${product.stock} unidades`}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-3 gap-1">
                    <CategoryIcon className="w-3 h-3" />
                    {categoryLabels[product.category]}
                  </Badge>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-3xl lg:text-4xl font-bold text-ice-600 dark:text-ice-400">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <Badge variant="secondary" className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </div>

                {/* Quantity Selector & Add to Cart */}
                <div className="border-t border-frost-200 dark:border-frost-700 pt-6 space-y-4">
                  <div>
                    <Label htmlFor="quantity" className="text-lg font-medium text-gray-900 dark:text-white">
                      Quantidade
                    </Label>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border border-frost-300 dark:border-frost-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <Input
                          id="quantity"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 text-center border-none focus:ring-0 bg-transparent text-lg font-medium"
                          min={1}
                          max={product.stock}
                        />
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Disponível: {product.stock} unidades
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleAddToCart}
                      disabled={addedToCart}
                      className="flex-1 py-4 text-lg"
                      size="lg"
                    >
                      {addedToCart ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Adicionado ao carrinho!
                        </>
                      ) : (
                        <>
                          <Package className="w-5 h-5 mr-2" />
                          Adicionar ao Carrinho
                        </>
                      )}
                    </Button>
                    <Button
                      variant="whatsapp"
                      asChild
                      className="flex-1 py-4 text-lg"
                      size="lg"
                    >
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Pedir pelo WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Delivery & Payment Info */}
                <div className="border-t border-frost-200 dark:border-frost-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Entrega e Pagamento
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Entrega Rápida</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Até 4h úteis (padrão)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">PIX com 5% OFF</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Desconto automático</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Cartão Crédito/Débito</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Visa, Master, Elo, Amex</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Garantia de Qualidade</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Troca imediata se houver defeito</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="border-t border-frost-200 dark:border-frost-700 pt-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compartilhar:</span>
                    <button className="p-2 rounded-lg bg-frost-100 dark:bg-frost-800 text-gray-600 dark:text-gray-300 hover:bg-ice-100 dark:hover:bg-ice-900/30 transition-colors" aria-label="Compartilhar no WhatsApp">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </button>
                    <button className="p-2 rounded-lg bg-frost-100 dark:bg-frost-800 text-gray-600 dark:text-gray-300 hover:bg-ice-100 dark:hover:bg-ice-900/30 transition-colors" aria-label="Compartilhar por e-mail">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-frost-100 dark:bg-frost-800 text-gray-600 dark:text-gray-300 hover:bg-ice-100 dark:hover:bg-ice-900/30 transition-colors" aria-label="Adicionar aos favoritos">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 lg:mt-16"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
                <TabsTrigger value="descricao">Descrição Completa</TabsTrigger>
                <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
                <TabsTrigger value="caracteristicas">Características</TabsTrigger>
                {product.warnings && <TabsTrigger value="avisos" className="text-red-600 dark:text-red-400">⚠ Avisos Importantes</TabsTrigger>}
              </TabsList>

              <TabsContent value="descricao" className="mt-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.longDescription}</p>
                </div>
              </TabsContent>

              <TabsContent value="especificacoes" className="mt-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <dt className="font-medium text-gray-900 dark:text-white sm:w-48">{key}</dt>
                      <dd className="text-gray-600 dark:text-gray-300">{value}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>

              <TabsContent value="caracteristicas" className="mt-6">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-ice-600 dark:text-ice-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {product.warnings && (
                <TabsContent value="avisos" className="mt-6">
                  <div className="space-y-3 border-l-4 border-red-500 pl-6">
                    {product.warnings.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-r-xl">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 dark:text-red-200 font-medium">{warning}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 lg:mt-20"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Produtos Relacionados
              </h2>
              <Link href="/produtos" className="text-ice-600 dark:text-ice-400 font-medium hover:underline flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((related) => (
                <Link
                  key={related.id}
                  href={`/produtos/${related.id}`}
                  className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-frost-200 dark:border-frost-700 hover:border-ice-300 dark:hover:border-ice-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-frost-50 dark:bg-frost-900/30">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3" variant="outline">
                      {categoryLabels[related.category]}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-ice-600 dark:group-hover:text-ice-400 transition-colors line-clamp-1">
                      {related.name}
                    </h3>
                    <p className="text-xl font-bold text-ice-600 dark:text-ice-400">
                      {formatCurrency(related.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Snowflake className="w-8 h-8 text-ice-400" />
            <span className="font-space-grotesk font-bold text-xl text-white">BEST<span className="text-red-400">Gelo</span></span>
          </Link>
          <p className="text-sm">Fábrica própria em Mauá/SP. Gelo cristalino, seguro e entregue rapidamente.</p>
          <p className="text-sm mt-2">© 2025 BEST Gelo Comércio de Gelo LTDA. CNPJ 00.000.000/0000-00</p>
        </div>
      </footer>
    </div>
  );
}