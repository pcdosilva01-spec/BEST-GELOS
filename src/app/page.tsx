'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Snowflake, Truck, Shield, Star, Award, Zap,
  ChevronRight, CheckCircle, MessageCircle, MapPin,
  Clock, Users, Factory, Leaf, Droplet, Sparkles,
  Menu, X, Phone, Mail, Facebook, Instagram,
  Droplets, Truck as TruckIcon, Factory as FactoryIcon,
  Award as AwardIcon, Check, ArrowRight, Zap as ZapIcon,
  Box, Droplets as DropletsIcon, Flame, Sparkles as SparklesIcon,
  ArrowDown, ChevronDown, Filter, Package
} from 'lucide-react';
import { cn, formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';
import Image from 'next/image';

// Deterministic floating positions to avoid hydration mismatch
const floatingPositions = [
  { left: 12.5, top: 18.3, delay: 0.2, size: 24 },
  { left: 78.2, top: 8.7, delay: 0.8, size: 16 },
  { left: 23.1, top: 65.4, delay: 1.1, size: 20 },
  { left: 85.6, top: 42.9, delay: 0.5, size: 12 },
  { left: 5.8, top: 33.7, delay: 1.4, size: 18 },
  { left: 92.3, top: 71.2, delay: 0.3, size: 14 },
  { left: 34.7, top: 15.6, delay: 1.7, size: 22 },
  { left: 67.9, top: 58.4, delay: 0.9, size: 16 },
  { left: 41.2, top: 82.1, delay: 1.3, size: 10 },
  { left: 18.6, top: 49.8, delay: 0.6, size: 20 },
  { left: 73.4, top: 24.5, delay: 1.0, size: 18 },
  { left: 56.8, top: 91.3, delay: 1.5, size: 12 },
];

const products = [
  {
    id: 'gelo-cubos',
    name: 'Gelo em Cubos',
    description: 'Gelo cristalino em cubos perfeitos, ideal para bebidas, drinks e resfriamento rápido. Produzido com água purificada.',
    category: 'CUBES',
    weight: 5,
    price: 12.90,
    image: '/images/products/gelo-cubos.svg',
    featured: true,
    icon: Box,
    badge: 'Mais Vendido',
  },
  {
    id: 'gelo-triturado',
    name: 'Gelo Triturado',
    description: 'Gelo picado finamente, perfeito para caipirinhas, smoothies, drinks tropicais e resfriamento de alimentos.',
    category: 'CRUSHED',
    weight: 5,
    price: 14.90,
    image: '/images/products/gelo-triturado.svg',
    featured: true,
    icon: DropletsIcon,
    badge: 'Ideal para Drinks',
  },
  {
    id: 'gelo-especial',
    name: 'Gelo Especial',
    description: 'Gelo em formatos especiais para eventos premium, coquetelaria de alto padrão e apresentações exclusivas.',
    category: 'CUSTOM',
    weight: 5,
    price: 19.90,
    image: '/images/products/gelo-personalizado.svg',
    featured: true,
    icon: SparklesIcon,
    badge: 'Premium',
  },
  {
    id: 'gelo-seco',
    name: 'Gelo Seco',
    description: 'Gelo seco para transporte de perecíveis, efeitos especiais, conservação médica e industrial. -78°C.',
    category: 'DRY_ICE',
    weight: 1,
    price: 45.00,
    image: '/images/products/gelo-seco.svg',
    featured: true,
    icon: Flame,
    badge: 'Especialista',
  },
];

const differentiators = [
  {
    icon: Droplets,
    title: 'Pureza Absoluta',
    description: 'Água tratada por osmose reversa e UV. Gelo cristalino, sem odor, sem sabor, sem impurezas.',
    gradient: 'from-ice-600 to-cyan-500',
    bgGradient: 'from-ice-50 to-cyan-50 dark:from-ice-900/20 dark:to-cyan-900/20',
  },
  {
    icon: FactoryIcon,
    title: 'Produção Própria',
    description: 'Fábrica própria em Mauá/SP com tecnologia de ponta. Controle total da qualidade da água ao produto final.',
    gradient: 'from-blue-600 to-ice-500',
    bgGradient: 'from-blue-50 to-ice-50 dark:from-blue-900/20 dark:to-ice-900/20',
  },
  {
    icon: TruckIcon,
    title: 'Entrega Rápida',
    description: 'Frota refrigerada própria. Entrega em até 2h na Grande SP. Agendamento flexível para seu negócio.',
    gradient: 'from-emerald-600 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
  },
  {
    icon: AwardIcon,
    title: 'Certificação',
    description: 'Certificados ANVISA, ISO 9001 e boas práticas de fabricação. Qualidade auditada e garantida.',
    gradient: 'from-amber-600 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Água Pura',
    description: 'Captação e tratamento por osmose reversa + UV. Pureza absoluta certificada.',
    icon: Droplet,
    color: 'from-ice-500 to-cyan-500',
  },
  {
    step: '02',
    title: 'Filtragem Avançada',
    description: 'Múltiplas etapas de filtração para remoção total de partículas e microrganismos.',
    icon: Filter,
    color: 'from-blue-500 to-ice-500',
  },
  {
    step: '03',
    title: 'Congelamento Direcionado',
    description: 'Congelamento lento e controlado que elimina bolhas de ar. Cubos perfeitamente cristalinos.',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    step: '04',
    title: 'Corte e Formatação',
    description: 'Corte preciso em cubos, triturado ou formatos especiais. Padrão de qualidade rigoroso.',
    icon: Box,
    color: 'from-ice-500 to-blue-600',
  },
  {
    step: '05',
    title: 'Embalagem Alimentícia',
    description: 'Embalagens lacradas, atóxicas e resistentes. Rastreabilidade total do lote.',
    icon: Package,
    color: 'from-blue-600 to-ice-600',
  },
  {
    step: '06',
    title: 'Entrega Refrigerada',
    description: 'Frota própria climatizada. Temperatura controlada do nosso freezer até seu negócio.',
    icon: TruckIcon,
    color: 'from-emerald-500 to-teal-500',
  },
];

const heroStats = [
  { value: '15+', label: 'Anos de Mercado', icon: Award },
  { value: '500+', label: 'Clientes Ativos', icon: Users },
  { value: '50t', label: 'Produção Mensal', icon: Factory },
  { value: '2h', label: 'Entrega Expressa', icon: Truck },
];

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Proprietário - Bar do Carlos',
    company: 'Bar & Restaurante',
    content: 'A Best Gelo é nossa fornecedora há 3 anos. Gelo sempre cristalino, entrega no horário combinado e preço justo. Recomendo de olhos fechados!',
    rating: 5,
    avatar: '/avatars/carlos.jpg',
  },
  {
    name: 'Mariana Santos',
    role: 'Organizadora de Eventos',
    company: 'MS Eventos',
    content: 'Para nossos casamentos e eventos corporativos, só confio na Best Gelo. O gelo especial com logo da empresa faz toda diferença na apresentação.',
    rating: 5,
    avatar: '/avatars/mariana.jpg',
  },
  {
    name: 'Roberto Lima',
    role: 'Gerente de Compras',
    company: 'Rede Supermercados Bom Preço',
    content: 'Parceria sólida há 5 anos. Cumprem prazos, qualidade consistente e o suporte comercial é excelente. Fornecedor nota 10.',
    rating: 5,
    avatar: '/avatars/roberto.jpg',
  },
];

const faqs = [
  {
    question: 'Qual a área de atendimento da Best Gelo?',
    answer: 'Atendemos toda a Grande São Paulo (Mauá, Santo André, São Bernardo, São Caetano, Diadema, SP Capital, Guarulhos, Osasco, etc.) e região do ABC. Para outras regiões, consulte disponibilidade.',
  },
  {
    question: 'Qual o pedido mínimo para entrega?',
    answer: 'Para entrega: mínimo de 5 sacos (25kg). Para retirada na fábrica: venda a partir de 1 saco (5kg). Consulte condições para clientes recorrentes.',
  },
  {
    question: 'Como é feita a entrega?',
    answer: 'Entrega em veículos refrigerados (baú isotérmico) para manter a qualidade do gelo. Agendamos janela de 2h. Entregamos no local indicado (cozinha, área de eventos, etc.).',
  },
  {
    question: 'Vocês emitem nota fiscal?',
    answer: 'Sim, emitimos NF-e para todos os pedidos. Para PJ, emitimos com destaque de ICMS/ST conforme legislação. Para PF, emitimos NF-e simplificada.',
  },
  {
    question: 'Posso personalizar o gelo com a logo da minha empresa?',
    answer: 'Sim! Produzimos gelo personalizado com logomarca em relevo nos cubos. Ideal para eventos corporativos, lançamentos de produtos e brindes. Pedido mínimo: 100kg.',
  },
  {
    question: 'Como faço para me tornar cliente recorrente?',
    answer: 'Basta fazer o primeiro pedido e solicitar cadastro como cliente recorrente. Oferecemos condições especiais: faturamento para 15/30 dias, desconto por volume e prioridade na entrega.',
  },
];

const statsSection = [
  { value: '50+', label: 'Toneladas/dia de capacidade' },
  { value: '500+', label: 'Clientes ativos' },
  { value: '15+', label: 'Anos de mercado' },
  { value: '99.9%', label: 'Taxa de entrega no prazo' },
];

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#processo', label: 'Processo' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
];

export default function HomePage() {
  const { items, isOpen, toggleCart, closeCart, getTotalItems, getSubtotal } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const whatsappUrl = generateWhatsAppLink('5511999999999', 'Olá, gostaria de fazer um pedido de gelo.');

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-ice-600 text-white rounded-lg">
        Pular para o conteúdo principal
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-frost-900/80 backdrop-blur-glass border-b border-frost-200 dark:border-frost-700">
        <nav className="container-custom" aria-label="Navegação principal">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="Best Gelo - Página inicial">
              <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-xl text-frost-900 dark:text-white hidden sm:block">
                Best Gelo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm font-medium text-frost-600 dark:text-frost-400 hover:text-ice-600 dark:hover:text-ice-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                  Entrar
                </Link>
              </Button>
              <Button variant="whatsapp" size="sm" asChild>
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  WhatsApp
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild onClick={toggleCart}>
                <Link href="/pedido/novo">
                  <Snowflake className="w-4 h-4 mr-1" aria-hidden="true" />
                  Pedir
                  {getTotalItems() > 0 && (
                    <span className="ml-1 bg-white/30 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-800"
              onClick={toggleCart}
              aria-label="Abrir menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn('md:hidden overflow-hidden transition-all duration-300', isOpen ? 'block' : 'hidden')}
          >
            <div className="py-4 space-y-2 border-t border-frost-200 dark:border-frost-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-body font-medium text-frost-600 dark:text-frost-400 hover:text-ice-600 dark:hover:text-ice-400 hover:bg-frost-50 dark:hover:bg-frost-800 rounded-lg"
                  onClick={closeCart}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-2 border-t border-frost-200 dark:border-frost-700">
                <Button variant="whatsapp" className="w-full" asChild>
                  <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeCart}>
                    <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    Pedir pelo WhatsApp
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login" onClick={closeCart}>
                    Entrar na conta
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-ice-dark">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ice-500/10 blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ice-500/5 blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Floating Snowflake Cubes */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {floatingPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 bg-white/10 rounded-xl rotate-45"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: pos.delay,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>

          <div className="relative container-custom py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span>Entrega em até 2h na Grande SP</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="heading-display text-5xl sm:text-6xl lg:text-7xl text-white mb-8 text-balance"
              >
                Gelo de{' '}
                <span className="bg-gradient-to-r from-ice-300 via-white to-teal-300 bg-clip-text text-transparent">
                  Qualidade
                </span>{' '}
                para seu{' '}
                <span className="bg-gradient-to-r from-ice-300 via-white to-teal-300 bg-clip-text text-transparent">
                  Negócio
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl text-ice-100/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
              >
                Fábrica própria em Mauá/SP. Gelo em cubos, triturado, seco e personalizado.
                Atendemos eventos, bares, restaurantes, mercados e consumidor final.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="xl" asChild className="w-full sm:w-auto">
                  <Link href="/pedido/novo">
                    <Snowflake className="w-5 h-5 mr-2" aria-hidden="true" />
                    Fazer Pedido Online
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                    Pedir pelo WhatsApp
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {heroStats.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-ice-200 text-sm sm:text-base">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            aria-hidden="true"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="section-padding bg-white dark:bg-frost-950">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Nossos Produtos</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Gelo para{' '}
                <span className="text-gradient-ice">todo tipo</span>
                de negócio
              </h2>
              <p className="text-body-lg text-frost-600 dark:text-frost-400 max-w-2xl mx-auto">
                Produção própria com água purificada. Do cubo cristalino ao gelo seco industrial,
                entregamos qualidade que seu cliente nota no primeiro gole.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden bg-white dark:bg-frost-900 border-frost-200 dark:border-frost-800 hover:shadow-ice-lg transition-all duration-300 group">
                    <div className="relative aspect-square bg-gradient-ice-light dark:bg-frost-800 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <product.icon className="w-24 h-24 text-ice-300 dark:text-ice-700 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                      </div>
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-ice-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-frost-900 dark:text-white group-hover:text-ice-600 dark:group-hover:text-ice-400 transition-colors">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-frost-500 mt-1">
                        <span className="font-medium">{product.weight}kg</span>
                        <span className="w-1 h-1 rounded-full bg-frost-300" aria-hidden="true" />
                        <span className="text-gradient-ice font-semibold">{formatCurrency(product.price)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-body text-frost-600 dark:text-frost-400 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <Button asChild className="w-full" variant="default">
                        <Link href={`/produto/${product.id}`}>
                          <ArrowRight className="w-4 h-4 mr-2" aria-hidden="true" />
                          Ver detalhes
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Button variant="outline" size="lg" asChild>
                <Link href="/produtos">
                  Ver todos os produtos
                  <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section id="diferenciais" className="section-padding bg-frost-50 dark:bg-frost-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Por que Best Gelo</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Diferenciais que fazem a{' '}
                <span className="text-gradient-ice">diferença</span>
              </h2>
              <p className="text-body-lg text-frost-600 dark:text-frost-400 max-w-2xl mx-auto">
                Não somos apenas mais um fornecedor. Somos fabricantes com controle total,
                do tratamento da água à entrega no seu freezer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((diff, index) => (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-br dark:from-frost-800 dark:to-frost-900 border-frost-200 dark:border-frost-700 hover:shadow-ice-lg transition-all duration-300 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${diff.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
                    <CardContent className="relative p-6 h-full flex flex-col">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${diff.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <diff.icon className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl font-bold text-frost-900 dark:text-white mb-3">
                        {diff.title}
                      </CardTitle>
                      <p className="text-body text-frost-600 dark:text-frost-400 flex-1">
                        {diff.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="processo" className="section-padding bg-white dark:bg-frost-950">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Nosso Processo</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Do tratamento da água à{' '}
                <span className="text-gradient-ice">entrega</span>
              </h2>
              <p className="text-body-lg text-frost-600 dark:text-frost-400 max-w-2xl mx-auto">
                Seis etapas de controle rigoroso para garantir o gelo mais puro do mercado.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-ice-200 via-ice-400 to-ice-200" aria-hidden="true" />

              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={cn('relative flex items-start gap-8 lg:gap-16', index % 2 === 1 && 'flex-row-reverse')}
                  >
                    <div className={cn('flex-1 lg:w-1/2 px-4', index % 2 === 1 && 'text-right lg:text-left')}>
                      <div className={cn('inline-flex items-center gap-3 mb-4', index % 2 === 1 && 'justify-end lg:justify-start')}>
                        <span className="font-display font-extrabold text-2xl text-ice-600 dark:text-ice-400">
                          {step.step}
                        </span>
                        <div className="w-16 h-px bg-gradient-ice" aria-hidden="true" />
                      </div>
                      <h3 className="heading-section text-2xl mb-3 text-frost-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-body-lg text-frost-600 dark:text-frost-400">
                        {step.description}
                      </p>
                    </div>
                    <div className={cn('flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center flex-col lg:w-24 lg:h-24 z-10', index % 2 === 1 && 'order-first')}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <div className={cn('flex-1 lg:w-1/2 px-4', index % 2 === 0 && 'text-left lg:text-right')}>
                      <div className={cn('inline-flex items-center gap-3 mb-4', index % 2 === 0 && 'justify-start lg:justify-end')}>
                        <div className="w-16 h-px bg-gradient-ice" aria-hidden="true" />
                        <span className="font-display font-extrabold text-2xl text-ice-600 dark:text-ice-400">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="heading-section text-2xl mb-3 text-frost-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-body-lg text-frost-600 dark:text-frost-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-ice-dark">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsSection.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-ice-200 text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="section-padding bg-white dark:bg-frost-950">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Depoimentos</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Confiam na{' '}
                <span className="text-gradient-ice">Best Gelo</span>
              </h2>
              <p className="text-body-lg text-frost-600 dark:text-frost-400 max-w-2xl mx-auto">
                Mais de 500 clientes ativos. Veja o que dizem sobre nossa parceria.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-frost-900 border-frost-200 dark:border-frost-800 hover:shadow-ice-lg transition-all duration-300">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} de 5 estrelas`}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-body text-frost-700 dark:text-frost-300 mb-6 flex-1 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-ice flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-frost-900 dark:text-white">{testimonial.name}</div>
                          <div className="text-sm text-frost-500 dark:text-frost-400">{testimonial.role}</div>
                          <div className="text-xs text-frost-400 dark:text-frost-500">{testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-padding bg-frost-50 dark:bg-frost-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Perguntas Frequentes</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Dúvidas? A gente{' '}
                <span className="text-gradient-ice">responde</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <details className="group bg-white dark:bg-frost-900 border border-frost-200 dark:border-frost-800 rounded-xl overflow-hidden mb-4">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="text-body-lg font-medium text-frost-900 dark:text-white pr-8">
                        {faq.question}
                      </span>
                      <ChevronDown className="w-5 h-5 text-ice-600 dark:text-ice-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0" aria-hidden="true" />
                    </summary>
                    <div className="px-6 pb-6 text-body text-frost-600 dark:text-frost-400 border-t border-frost-200 dark:border-frost-800 animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-body text-frost-600 dark:text-frost-400 mb-4">
                Não encontrou sua resposta?
              </p>
              <Button variant="whatsapp" size="lg" asChild>
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  Perguntar no WhatsApp
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-ice-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ice-500/10 via-transparent to-transparent" aria-hidden="true" />
          <div className="relative container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="badge-ice mb-4 inline-block bg-white/10 border-white/20">Pronto para começar?</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-6 text-white">
                Peça seu gelo agora e receba em{' '}
                <span className="text-ice-300">até 2 horas</span>
              </h2>
              <p className="text-xl text-ice-100/80 mb-8 max-w-lg mx-auto">
                Fábrica própria, frota refrigerada e atendimento especializado.
                Seu negócio não pode esperar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" asChild className="w-full sm:w-auto bg-ice-600 hover:bg-ice-700 text-white">
                  <Link href="/pedido/novo">
                    <Snowflake className="w-5 h-5 mr-2" aria-hidden="true" />
                    Fazer Pedido Online
                  </Link>
                </Button>
                <Button size="xl" variant="whatsapp" asChild className="w-full sm:w-auto">
                  <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                    WhatsApp: (11) 99999-9999
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-ice-300/80 text-sm">
                Atendimento: Seg-Sex 6h-22h | Sáb 6h-18h | Dom 6h-12h
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="section-padding bg-white dark:bg-frost-950">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="badge-ice mb-4 inline-block">Contato</span>
                <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-6">
                  Vamos{' '}
                  <span className="text-gradient-ice">conversar</span>
                </h2>
                <p className="text-body-lg text-frost-600 dark:text-frost-400 mb-8 max-w-lg">
                  Tem um projeto, evento ou precisa de fornecimento recorrente?
                  Nossa equipe comercial está pronta para atender.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-ice flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-frost-900 dark:text-white mb-1">Fábrica e Sede</h3>
                      <p className="text-frost-600 dark:text-frost-400">
                        Av. Barão de Mauá, 1234 - Mauá/SP<br />
                        CEP 09310-000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-ice flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-frost-900 dark:text-white mb-1">Telefone Comercial</h3>
                      <p className="text-frost-600 dark:text-frost-400">
                        (11) 99999-9999<br />
                        Seg-Sex: 8h-18h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-ice flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-frost-900 dark:text-white mb-1">E-mail</h3>
                      <p className="text-frost-600 dark:text-frost-400">
                        comercial@bestgelo.com.br<br />
                        vendas@bestgelo.com.br
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-100 dark:bg-frost-800 flex items-center justify-center text-frost-600 dark:text-frost-400 hover:bg-ice-100 dark:hover:bg-ice-900 hover:text-ice-600 dark:hover:text-ice-400 transition-colors" aria-label="Facebook">
                    <Facebook className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-100 dark:bg-frost-800 flex items-center justify-center text-frost-600 dark:text-frost-400 hover:bg-ice-100 dark:hover:bg-ice-900 hover:text-ice-600 dark:hover:text-ice-400 transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-100 dark:bg-frost-800 flex items-center justify-center text-frost-600 dark:text-frost-400 hover:bg-ice-100 dark:hover:bg-ice-900 hover:text-ice-600 dark:hover:text-ice-400 transition-colors" aria-label="WhatsApp">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white dark:bg-frost-900 border-frost-200 dark:border-frost-800 shadow-ice-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Fale Conosco</CardTitle>
                    <p className="text-frost-500 dark:text-frost-400 mt-1">Preencha o formulário e retornamos em até 1h</p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="nome" className="block text-sm font-medium text-frost-700 dark:text-frost-300 mb-1">
                            Nome *
                          </label>
                          <input
                            type="text"
                            id="nome"
                            name="nome"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-frost-300 dark:border-frost-700 bg-white dark:bg-frost-800 text-frost-900 dark:text-white placeholder-frost-400 focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent transition-all"
                            placeholder="Seu nome"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-frost-700 dark:text-frost-300 mb-1">
                            E-mail *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-frost-300 dark:border-frost-700 bg-white dark:bg-frost-800 text-frost-900 dark:text-white placeholder-frost-400 focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent transition-all"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-frost-700 dark:text-frost-300 mb-1">
                          Telefone/WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-frost-300 dark:border-frost-700 bg-white dark:bg-frost-800 text-frost-900 dark:text-white placeholder-frost-400 focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent transition-all"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label htmlFor="tipo" className="block text-sm font-medium text-frost-700 dark:text-frost-300 mb-1">
                          Tipo de Solicitação *
                        </label>
                        <select
                          id="tipo"
                          name="tipo"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-frost-300 dark:border-frost-700 bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent transition-all"
                        >
                          <option value="">Selecione</option>
                          <option value="orcamento">Orçamento / Pedido</option>
                          <option value="parceria">Parceria Comercial</option>
                          <option value="eventos">Eventos e Personalização</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="mensagem" className="block text-sm font-medium text-frost-700 dark:text-frost-300 mb-1">
                          Mensagem *
                        </label>
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          rows={4}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-frost-300 dark:border-frost-700 bg-white dark:bg-frost-800 text-frost-900 dark:text-white placeholder-frost-400 focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent transition-all resize-none"
                          placeholder="Conte-nos sua necessidade..."
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        <ArrowRight className="w-4 h-4 mr-2" aria-hidden="true" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-frost-900 dark:bg-frost-950 border-t border-frost-800">
        <div className="container-custom py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Best Gelo - Página inicial">
                <div className="w-12 h-12 rounded-xl bg-gradient-ice flex items-center justify-center">
                  <Snowflake className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-2xl text-white">Best Gelo</span>
              </Link>
              <p className="text-ice-200/80 text-body max-w-xs mb-6">
                Fábrica própria de gelo em Mauá/SP. Qualidade certificada, entrega rápida e atendimento especializado para seu negócio.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
                <a href="tel:+5511999999999" className="inline-flex items-center gap-2 px-4 py-2 bg-ice-600 hover:bg-ice-700 text-white rounded-lg font-medium text-sm transition-colors">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Ligar
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Produtos</h3>
              <nav aria-label="Produtos">
                <ul className="space-y-2">
                  {products.map((p) => (
                    <li key={p.id}>
                      <Link href={`/produto/${p.id}`} className="text-ice-200/80 hover:text-white transition-colors text-body">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Empresa</h3>
              <nav aria-label="Empresa">
                <ul className="space-y-2">
                  <li><Link href="#diferenciais" className="text-ice-200/80 hover:text-white transition-colors text-body">Diferenciais</Link></li>
                  <li><Link href="#processo" className="text-ice-200/80 hover:text-white transition-colors text-body">Nosso Processo</Link></li>
                  <li><Link href="#depoimentos" className="text-ice-200/80 hover:text-white transition-colors text-body">Depoimentos</Link></li>
                  <li><Link href="#faq" className="text-ice-200/80 hover:text-white transition-colors text-body">Perguntas Frequentes</Link></li>
                  <li><Link href="#contato" className="text-ice-200/80 hover:text-white transition-colors text-body">Contato</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-frost-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ice-200/60 text-sm">
              © {new Date().getFullYear()} Best Gelo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-ice-200/60">
              <a href="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="/termos-uso" className="hover:text-white transition-colors">Termos de Uso</a>
              <span>CNPJ: 00.000.000/0001-00</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-full max-w-sm z-50 bg-white dark:bg-frost-900 shadow-ice-xl md:hidden flex flex-col"
        >
          <div className="p-4 border-b border-frost-200 dark:border-frost-800 flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-frost-900 dark:text-white">Carrinho</h2>
            <button onClick={closeCart} className="p-2 rounded-lg text-frost-500 hover:bg-frost-100 dark:hover:bg-frost-800" aria-label="Fechar carrinho">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Snowflake className="w-12 h-12 mx-auto text-frost-300 dark:text-frost-600 mb-4" aria-hidden="true" />
                <p className="text-frost-500 dark:text-frost-400">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-frost-50 dark:bg-frost-800 rounded-lg">
                    <div className="w-16 h-16 rounded-lg bg-gradient-ice-light dark:bg-frost-700 flex items-center justify-center flex-shrink-0">
                      <Snowflake className="w-8 h-8 text-ice-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-frost-900 dark:text-white truncate">{item.name}</h3>
                      <p className="text-sm text-frost-500 dark:text-frost-400">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="w-8 h-8 rounded border border-frost-300 dark:border-frost-700 flex items-center justify-center text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-700" aria-label="Diminuir quantidade">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                        <span className="font-medium text-frost-900 dark:text-white w-8 text-center">{item.quantity}</span>
                        <button className="w-8 h-8 rounded border border-frost-300 dark:border-frost-700 flex items-center justify-center text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-700" aria-label="Aumentar quantidade">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>
                    <button className="text-frost-400 hover:text-red-500 flex-shrink-0" aria-label="Remover item">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="p-4 border-t border-frost-200 dark:border-frost-800 space-y-4">
              <div className="flex justify-between text-body">
                <span className="text-frost-600 dark:text-frost-400">Subtotal</span>
                <span className="font-semibold text-frost-900 dark:text-white">{formatCurrency(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-body">
                <span className="text-frost-600 dark:text-frost-400">Entrega</span>
                <span className="font-semibold text-frost-900 dark:text-white">Calcular no checkout</span>
              </div>
              <div className="flex justify-between text-body-lg font-bold">
                <span className="text-frost-900 dark:text-white">Total</span>
                <span className="text-ice-600 dark:text-ice-400">{formatCurrency(getSubtotal())}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/pedido/novo" onClick={closeCart}>
                  Finalizar Pedido
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="whatsapp" className="w-full" asChild>
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeCart}>
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Pedir pelo WhatsApp
                </Link>
              </Button>
            </div>
          )}
        </motion.aside>
      )}
    </>
  );
}