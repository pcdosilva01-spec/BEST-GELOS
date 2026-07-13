'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Snowflake, Truck, Shield, Star, Award, Zap,
  ChevronRight, CheckCircle, MessageCircle, MapPin,
  Clock, Users, Factory, Leaf, Droplet, Sparkles,
  Menu, X, Phone, Mail, Facebook, Instagram
} from 'lucide-react';
import { cn, formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';

// Deterministic floating positions to avoid hydration mismatch
const floatingPositions = [
  { left: 12.5, top: 18.3, delay: 0.2 },
  { left: 78.2, top: 8.7, delay: 0.8 },
  { left: 23.1, top: 65.4, delay: 1.1 },
  { left: 85.6, top: 42.9, delay: 0.5 },
  { left: 5.8, top: 33.7, delay: 1.4 },
  { left: 92.3, top: 71.2, delay: 0.3 },
  { left: 34.7, top: 15.6, delay: 1.7 },
  { left: 67.9, top: 58.4, delay: 0.9 },
  { left: 41.2, top: 82.1, delay: 1.3 },
  { left: 18.6, top: 49.8, delay: 0.6 },
  { left: 73.4, top: 24.5, delay: 1.0 },
  { left: 56.8, top: 91.3, delay: 1.5 },
];

const products = [
  {
    id: 'gelo-cubos',
    name: 'Gelo em Cubos',
    description: 'Gelo cristalino em cubos perfeitos, ideal para bebidas, drinks e resfriamento rápido. Produzido com água purificada.',
    category: 'CUBES',
    weight: 5,
    price: 12.90,
    image: '/images/gelo-cubos.jpg',
    featured: true,
  },
  {
    id: 'gelo-triturado',
    name: 'Gelo Triturado',
    description: 'Gelo picado finamente, perfeito para caipirinhas, smoothies, drinks tropicais e resfriamento de alimentos.',
    category: 'CRUSHED',
    weight: 5,
    price: 14.90,
    image: '/images/gelo-triturado.jpg',
    featured: true,
  },
  {
    id: 'gelo-especial',
    name: 'Gelo Especial',
    description: 'Gelo personalizado para empresas e eventos: cubos com logo, formatos especiais, gelo seco e esculturas de gelo.',
    category: 'SPECIAL',
    weight: 1,
    price: 45.00,
    image: '/images/gelo-especial.jpg',
    featured: true,
  },
  {
    id: 'gelo-seco',
    name: 'Gelo Seco',
    description: 'Dióxido de carbono sólido (-78°C) para efeitos especiais, transporte de perecíveis, limpeza criogênica.',
    category: 'DRY_ICE',
    weight: 1,
    price: 35.00,
    image: '/images/gelo-seco.jpg',
    featured: false,
  },
];

const differentiators = [
  {
    icon: Snowflake,
    title: 'Pureza Absoluta',
    description: 'Água purificada por osmose reversa e filtração UV. Gelo cristalino, sem impurezas, sem gosto, sem cheiro.',
    color: 'from-ice-500 to-ice-600',
  },
  {
    icon: Factory,
    title: 'Produção Própria',
    description: 'Fábrica própria em Mauá/SP com capacidade de 50 toneladas/dia. Controle total de qualidade do início ao fim.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Frota própria refrigerada. Entregamos em até 2h na Grande SP. Agendamento flexível para eventos.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Certificado ANVISA',
    description: 'Registro no Ministério da Agricultura e vigilância sanitária. Atendemos todas as normas para alimentos.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Users,
    title: 'Atendimento B2B e B2C',
    description: 'Atendemos de consumidor final a grandes redes. Condições especiais para restaurantes, bares e eventos.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Sparkles,
    title: 'Sustentabilidade',
    description: 'Processo eco-friendly: reaproveitamento de água, energia solar na fábrica, embalagens recicláveis.',
    color: 'from-green-500 to-green-600',
  },
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

const stats = [
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
                {stats.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-ice-200 text-sm sm:text-base">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
              aria-hidden="true"
            >
              <svg className="w-6 h-6 text-ice-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="section-padding bg-frost-50">
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
                Gelo para Todas as{' '}
                <span className="text-gradient-ice">Ocasiões</span>
              </h2>
              <p className="text-body text-lg max-w-2xl mx-auto text-frost-600">
                Produzimos com água purificada e rigoroso controle de qualidade.
                Escolha o tipo ideal para sua necessidade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/produtos/${product.id}`} className="block">
                    <Card variant="interactive" className="h-full overflow-hidden">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gradient-to-br from-ice-100 to-ice-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Snowflake className="w-16 h-16 text-ice-300" aria-hidden="true" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-frost-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {product.featured && (
                          <span className="absolute top-3 left-3 badge-ice z-10">Mais Vendido</span>
                        )}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          <Button variant="ghost" size="icon" className="bg-white/90 text-frost-900">
                            <ChevronRight className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-ice-600 bg-ice-100 px-2 py-1 rounded-full">
                            {product.category === 'CUBES' ? 'Cubos' : product.category === 'CRUSHED' ? 'Triturado' : product.category === 'SPECIAL' ? 'Especial' : 'Seco'}
                          </span>
                          <span className="text-xs text-frost-400">{product.weight}kg</span>
                        </div>
                        <h3 className="font-display font-semibold text-frost-900 text-lg mb-2 group-hover:text-ice-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-frost-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-2xl text-ice-600">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-sm text-frost-400">/ saco {product.weight}kg</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg" asChild>
                <Link href="/produtos">Ver Todos os Produtos <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section id="diferenciais" className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="badge-ice mb-4 inline-block">Diferenciais</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Por que Escolher a{' '}
                <span className="text-gradient-ice">Best Gelo</span>?
              </h2>
              <p className="text-body text-lg max-w-2xl mx-auto text-frost-600">
                Não somos apenas mais um fornecedor. Somos uma fábrica com paixão por qualidade,
                comprometida com seu sucesso.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((diff, index) => (
                <motion.article
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="default" className="h-full p-6">
                    <div className="relative mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${diff.color} flex items-center justify-center shadow-lg`}>
                        <diff.icon className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-frost-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-ice-600" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-frost-900 text-xl mb-3">{diff.title}</h3>
                    <p className="text-body text-frost-600">{diff.description}</p>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="processo" className="section-padding bg-gradient-frost">
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
                Da Água ao Gelo:{' '}
                <span className="text-gradient-ice">Pureza em Cada Etapa</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-ice-300 via-ice-500 to-teal-400 -translate-x-1/2" />

              <div className="space-y-12 lg:space-y-20">
                {[
                  { step: '01', title: 'Captação e Purificação', description: 'Água de poço artesiano passa por osmose reversa, filtração por carvão ativado e esterilização UV. Resultado: água 99,9% pura.', icon: Droplet, side: 'left' },
                  { step: '02', title: 'Congelamento Controlado', description: 'Congelamento lento e direcional (-25°C) que elimina bolhas de ar e impurezas. Forma cristais perfeitos e transparentes.', icon: Snowflake, side: 'right' },
                  { step: '03', title: 'Corte e Formatação', description: 'Máquinas automatizadas cortam em cubos padronizados (2,5cm) ou trituram conforme especificação. Zero contato manual.', icon: Factory, side: 'left' },
                  { step: '04', title: 'Embalagem Inteligente', description: 'Ensacamento em PEAD atóxico, selado a vácuo. Etiquetagem com lote, validade e QR Code de rastreabilidade.', icon: Shield, side: 'right' },
                  { step: '05', title: 'Armazenamento Climatizado', description: 'Câmara fria a -18°C com controle de umidade. Estoque rotativo (FIFO) garante produto sempre fresco.', icon: Leaf, side: 'left' },
                  { step: '06', title: 'Entrega Refrigerada', description: 'Frota própria com baú isotérmico monitorado por GPS. Temperatura mantida até o destino final.', icon: Truck, side: 'right' },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex lg:flex-row ${item.side === 'right' ? 'lg:flex-row-reverse' : ''} items-center gap-8 relative z-10`}
                  >
                    <div className={`w-full lg:w-5/12 ${item.side === 'right' ? 'lg:text-right' : ''}`}>
                      <div className="flex items-center gap-3 lg:justify-end mb-4">
                        <span className="font-display font-extrabold text-3xl text-ice-200">{item.step}</span>
                        <div className="w-12 h-[2px] bg-gradient-to-r from-ice-400 to-teal-400" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-frost-900 mb-2">{item.title}</h3>
                      <p className="text-body text-frost-600">{item.description}</p>
                    </div>

                    <div className="relative lg:w-2/12 flex-shrink-0">
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-ice-500 to-teal-500 flex items-center justify-center shadow-lg lg:mx-auto">
                        <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                    </div>

                    <div className={`w-full lg:w-5/12 ${item.side === 'left' ? 'lg:text-right lg:pr-8' : 'lg:pl-8'}`}>
                      <div className="aspect-square bg-gradient-to-br from-ice-50 to-ice-100 rounded-2xl flex items-center justify-center border border-ice-100">
                        <item.icon className="w-16 h-16 text-ice-300" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-frost-900">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
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
        <section id="depoimentos" className="section-padding bg-white">
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
              <p className="text-body text-lg max-w-2xl mx-auto text-frost-600">
                Mais de 500 clientes atendidos. Veja o que dizem quem já experimentou.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-body text-frost-700 mb-6 flex-1">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-400 to-teal-400 flex items-center justify-center font-display font-bold text-white text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-frost-900">{testimonial.name}</p>
                        <p className="text-sm text-frost-500">{testimonial.role} - {testimonial.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-padding bg-frost-50">
          <div className="container-custom max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="badge-ice mb-4 inline-block">Perguntas Frequentes</span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
                Dúvidas?{' '}
                <span className="text-gradient-ice">Temos as Respostas</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group card-base p-6"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-frost-900 text-lg">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 text-frost-400 transition-transform duration-300 group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-frost-100 animate-in fade-in slide-down">
                    <p className="text-body text-frost-600">{faq.answer}</p>
                  </div>
                </motion.details>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-10"
            >
              <p className="text-body text-frost-600 mb-4">Não encontrou sua dúvida?</p>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contato">Fale Conosco <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="section-padding bg-gradient-ice-dark relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-ice-500/10 blur-3xl" />
          </div>
          <div className="relative container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
                  Pronto para{' '}
                  <span className="text-ice-300">Fazer seu Pedido</span>?
                </h2>
                <p className="text-body text-lg text-ice-100/80 mb-10 max-w-xl mx-auto">
                  Escolha a melhor forma: site, WhatsApp ou telefone. Entrega rápida e garantida.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="xl" variant="default" asChild className="w-full sm:w-auto bg-white text-frost-900 hover:bg-frost-100">
                    <Link href="/pedido/novo">
                      <Snowflake className="w-5 h-5 mr-2" aria-hidden="true" />
                      Pedir Online Agora
                    </Link>
                  </Button>
                  <Button size="xl" variant="whatsapp" asChild className="w-full sm:w-auto">
                    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                      WhatsApp: (11) 99999-9999
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-ice-300" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-white">Fábrica & Escritório</p>
                  <p className="text-ice-200/80 text-sm">Rua Bras Cubas, 624 - Vila Bocaina<br />Mauá - SP, 09310-730</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border-l border-r border-white/10 md:border-l-0 md:border-r-0 md:border-t md:border-b">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Clock className="w-6 h-6 text-ice-300" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-white">Horário de Atendimento</p>
                  <p className="text-ice-200/80 text-sm">Seg a Sex: 7h às 19h<br />Sáb: 7h às 13h<br />Dom: Plantão eventos</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Phone className="w-6 h-6 text-ice-300" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-white">Telefone & WhatsApp</p>
                  <p className="text-ice-200/80 text-sm">(11) 99999-9999<br />contato@bestgelo.com.br</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-frost-50" aria-label="Localização">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h3 className="heading-section text-2xl text-center mb-6">Nos Encontre no Mapa</h3>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-glass-lg bg-frost-200">
                <iframe
                  title="Localização Best Gelo - Mauá/SP"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.123456789!1d-46.401234!2d-23.678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef123456789ab%3A0xfedcba9876543210!2sR.%20Bras%20Cubas%2C%20624%20-%20Vila%20Bocaina%2C%20Mau%C3%A1%20-%20SP%2C%2009310-730!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-frost-900 text-ice-100">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Best Gelo - Página inicial">
                <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-xl text-white">Best Gelo</span>
              </Link>
              <p className="text-ice-200/70 text-body max-w-sm mb-6">
                Fábrica própria de gelo em Mauá/SP. Qualidade, pureza e entrega rápida para seu negócio ou evento.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-800 flex items-center justify-center text-ice-300 hover:bg-ice-600/20 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-800 flex items-center justify-center text-ice-300 hover:bg-ice-600/20 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-frost-800 flex items-center justify-center text-ice-300 hover:bg-green-600/20 hover:text-green-400 transition-colors" aria-label="WhatsApp">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label="Links rápidos">
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-3">
                {[
                  { href: '/produtos', label: 'Produtos' },
                  { href: '/pedido/novo', label: 'Fazer Pedido' },
                  { href: '/sobre', label: 'Sobre Nós' },
                  { href: '/entrega', label: 'Área de Entrega' },
                  { href: '/faq', label: 'FAQ' },
                  { href: '/contato', label: 'Contato' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-ice-200/70 hover:text-white transition-colors text-body-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <address className="not-italic" aria-label="Informações de contato">
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-3 text-ice-200/70 text-body-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Rua Bras Cubas, 624 - Vila Bocaina<br />Mauá - SP, 09310-730</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+5511999999999" className="hover:text-white transition-colors">(11) 99999-9999</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:contato@bestgelo.com.br" className="hover:text-white transition-colors">contato@bestgelo.com.br</a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp Comercial</a>
                </li>
              </ul>
            </address>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-frost-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-ice-200/50 text-sm">
                © {new Date().getFullYear()} Best Gelo Comércio de Gelo LTDA. Todos os direitos reservados.
                <br />
                CNPJ: 17.812.251/0001-73 | IE: 442.172.407.110
              </p>
              <div className="flex items-center gap-6 text-sm text-ice-200/50">
                <Link href="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                <Link href="/termos-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
                <Link href="/lgpd" className="hover:text-white transition-colors">LGPD</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white dark:bg-frost-900 shadow-glass-lg flex flex-col"
        aria-label="Carrinho de compras"
      >
        <div className="flex items-center justify-between p-4 border-b border-frost-200 dark:border-frost-700">
          <h3 className="font-display font-semibold text-frost-900 dark:text-white">Carrinho ({getTotalItems()})</h3>
          <button onClick={toggleCart} className="p-2 rounded-lg text-frost-500 hover:bg-frost-100 dark:hover:bg-frost-800" aria-label="Fechar carrinho">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-frost-500">
              <Snowflake className="w-16 h-16 mb-4 text-frost-300" aria-hidden="true" />
              <p className="text-body">Seu carrinho está vazio</p>
              <Button asChild className="mt-4">
                <Link href="/produtos" onClick={closeCart}>Ver Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-2 bg-frost-50 dark:bg-frost-800/50 rounded-xl">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ice-100 to-ice-200 flex items-center justify-center flex-shrink-0">
                    <Snowflake className="w-8 h-8 text-ice-300" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-frost-900 dark:text-white truncate">{item.name}</h4>
                    <p className="text-sm text-ice-600 dark:text-ice-400">{formatCurrency(item.price)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => useCartStore.getState().updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-frost-200 dark:bg-frost-700 text-frost-600 dark:text-frost-300 hover:bg-frost-300 dark:hover:bg-frost-600" aria-label="Diminuir quantidade">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="font-semibold text-frost-900 dark:text-white w-8 text-center">{item.quantity}</span>
                    <button onClick={() => useCartStore.getState().updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-frost-200 dark:bg-frost-700 text-frost-600 dark:text-frost-300 hover:bg-frost-300 dark:hover:bg-frost-600" aria-label="Aumentar quantidade">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <button onClick={() => useCartStore.getState().removeItem(item.productId)} className="p-1 text-frost-400 hover:text-red-500" aria-label="Remover item">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-6 pt-6 border-t border-frost-200 dark:border-frost-700 space-y-3">
              <div className="flex justify-between text-body">
                <span className="text-frost-600 dark:text-frost-400">Subtotal</span>
                <span className="font-semibold text-frost-900 dark:text-white">{formatCurrency(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-body">
                <span className="text-frost-600 dark:text-frost-400">Entrega</span>
                <span className="font-semibold text-frost-900 dark:text-white">{getSubtotal() >= 100 ? 'Grátis' : formatCurrency(15)}</span>
              </div>
              <div className="flex justify-between text-heading-md font-bold text-frost-900 dark:text-white border-t border-frost-200 dark:border-frost-700 pt-3">
                <span>Total</span>
                <span>{formatCurrency(getSubtotal() + (getSubtotal() >= 100 ? 0 : 15))}</span>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-frost-200 dark:border-frost-700 space-y-3">
            <Button className="w-full" size="lg" asChild onClick={closeCart}>
              <Link href="/pedido/novo">Finalizar Pedido</Link>
            </Button>
            <Button variant="whatsapp" className="w-full" asChild>
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                Enviar pelo WhatsApp
              </Link>
            </Button>
          </div>
        )}
      </motion.aside>

      {/* Cart Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}
    </>
  );
}