'use client';

import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/header-footer';
import Link from 'next/link';
import { Snowflake, Truck, Shield, Award, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Gelo em Cubos',
    desc: 'Cubos perfeitos, cristalinos e de derretimento lento para seus drinks.',
    slug: 'gelo-cubos',
    icon: '🧊',
    category: 'CUBES',
    weight: 5,
    price: '12.90',
    featured: true,
    image: '/images/gelo-cubos.jpg'
  },
  {
    name: 'Gelo Triturado',
    desc: 'Textura ideal para caipirinhas, frozen drinks e resfriamento rápido.',
    slug: 'gelo-triturado',
    icon: '🍹',
    category: 'CRUSHED',
    weight: 5,
    price: '14.90',
    featured: true,
    image: '/images/gelo-triturado.jpg'
  },
  {
    name: 'Gelo Seco',
    desc: 'Dióxido de carbono sólido (-78°C) para transporte, efeitos e indústria.',
    slug: 'gelo-seco',
    icon: '❄️',
    category: 'DRY_ICE',
    weight: 1,
    price: '35.00',
    featured: false,
    image: '/images/gelo-seco.jpg'
  },
  {
    name: 'Gelo Personalizado',
    desc: 'Cubos com logotipo, iniciais ou formatos especiais para seu evento.',
    slug: 'gelo-personalizado',
    icon: '✨',
    category: 'SPECIAL',
    weight: 1,
    price: 'Sob consulta',
    featured: true,
    image: '/images/gelo-personalizado.jpg'
  },
  {
    name: 'Gelo Especial',
    desc: 'Formatos exclusivos: esferas, corações, estrelas e cubos grandes premium.',
    slug: 'gelo-especial',
    icon: '💎',
    category: 'SPECIAL',
    weight: 1,
    price: '25.00',
    featured: false,
    image: '/images/gelo-especial.jpg'
  },
];

function ProductIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    '🧊': <Snowflake className="w-12 h-12" aria-hidden="true" />,
    '🍹': <span className="text-6xl" aria-hidden="true">🍹</span>,
    '❄️': <span className="text-6xl" aria-hidden="true">❄️</span>,
    '✨': <Sparkles className="w-12 h-12" aria-hidden="true" />,
    '💎': <span className="text-6xl" aria-hidden="true">💎</span>,
  };
  return <div className={cn('flex-shrink-0 text-ice-500', className)}>{icons[icon] || <Snowflake className="w-12 h-12" />}</div>;
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.article
      key={product.slug}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/produtos/${product.slug}`} className="block">
        <div className="group bg-white dark:bg-frost-900 border border-frost-200 dark:border-frost-700 shadow-sm transition-all duration-500 ease-out-expo hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden h-full">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-ice-100 to-ice-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <ProductIcon icon={product.icon} className="text-ice-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-frost-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {product.featured && (
              <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ice-600 text-white z-10">Mais Vendido</span>
            )}

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white/90 text-frost-900 p-2 rounded-xl shadow-lg">
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-ice-600 bg-ice-100 px-2 py-1 rounded-full uppercase tracking-wider">
                {product.category === 'CUBES' ? 'Cubos' :
                  product.category === 'CRUSHED' ? 'Triturado' :
                    product.category === 'DRY_ICE' ? 'Seco' : 'Especial'}
              </span>
              <span className="text-xs text-frost-400">{product.weight}kg</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-frost-900 mb-2 group-hover:text-ice-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-frost-500 text-sm mb-4 line-clamp-2">{product.desc}</p>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-bold text-xl text-ice-600">
                {product.price === 'Sob consulta' ? product.price : `R$ ${Number(product.price).toFixed(2).replace('.', ',')}`}
              </span>
              {product.price !== 'Sob consulta' && (
                <span className="text-sm text-frost-400">/ saco {product.weight}kg</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProdutosPage() {
  const whatsappUrl = 'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo%20no%20atacado.';

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-ice-50 via-white to-white overflow-hidden">
          <div className="absolute inset-0 bg-mesh-ice" aria-hidden="true" />
          <div className="relative container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <span className="badge-ice mb-6 inline-block">Nossa Linha Completa</span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-frost-950 tracking-tight mb-6">
                Produtos para Todas as{' '}
                <span className="text-gradient-ice">Ocasiões</span>
              </h1>
              <p className="text-xl text-frost-600 max-w-2xl mx-auto leading-relaxed">
                Produzimos com água purificada por osmose reversa e rigoroso controle de qualidade.
                Escolha o tipo ideal para sua necessidade — do consumo próprio ao grande evento corporativo.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard product={product} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/pedido/novo" className="btn-primary inline-flex items-center gap-2">
                <Snowflake className="w-5 h-5" aria-hidden="true" />
                Fazer Pedido Online
              </Link>
            </div>
          </div>
        </section>

        {/* B2B CTA Section */}
        <section className="section-padding bg-gradient-ice-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-ice" aria-hidden="true" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-ice-500/10 blur-3xl" aria-hidden="true" />

          <div className="relative container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <span className="badge-ice mb-6 inline-block border-white/20 text-ice-200 bg-white/10">Atendimento Corporativo</span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6">
                Precisa de <span className="text-ice-300">Volume</span>?
              </h2>
              <p className="text-xl text-ice-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Atendemos bares, restaurantes, eventos, mercados e distribuidores com condições especiais:
                faturamento para 15/30 dias, desconto progressivo por volume e prioridade na entrega.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Falar com Consultor no WhatsApp
                </a>
                <Link href="/contato" className="btn-outline w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 py-4">
                  Orçamento por E-mail
                </Link>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: Truck, title: 'Frota Própria', desc: 'Entrega refrigerada' },
                  { icon: Shield, title: 'Certificado', desc: 'ANVISA e MAPA' },
                  { icon: Award, title: 'Condições B2B', desc: 'Faturamento 15/30d' },
                  { icon: Sparkles, title: 'Suporte Dedicado', desc: 'Consultor exclusivo' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-3 p-4 glass rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-ice-300" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    <p className="text-ice-200/70 text-xs text-center">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Preview */}
        <section className="section-padding bg-frost-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="badge-ice mb-4 inline-block">Nosso Diferencial</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-frost-950 mb-4">
                Da Fonte ao Seu <span className="text-gradient-ice">Copo</span>
              </h2>
              <p className="text-frost-600 max-w-2xl mx-auto">Controle total de qualidade em cada etapa do processo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: '01', icon: Snowflake, title: 'Água Purificada', desc: 'Osmose reversa + UV + carvão ativo' },
                { step: '02', icon: Snowflake, title: 'Congelamento', desc: 'Direcional a -25°C, zero bolhas' },
                { step: '03', icon: Truck, title: 'Corte Automatizado', desc: 'Cubos 2,5cm padronizados' },
                { step: '04', icon: Shield, title: 'Embalagem Selada', desc: 'PEAD atóxico + vácuo + QR Code' },
                { step: '05', icon: Award, title: 'Câmara -18°C', desc: 'Estoque rotativo FIFO' },
                { step: '06', icon: Sparkles, title: 'Entrega Refrigerada', desc: 'Baú isotérmico + GPS' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="card-base p-6 h-full relative">
                    <div className="absolute top-4 right-4 font-display font-extrabold text-3xl text-ice-100">{item.step}</div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                      <item.icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-frost-900 mb-2">{item.title}</h3>
                    <p className="text-frost-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/sobre" className="btn-outline inline-flex items-center gap-2">
                Conheça Nossa Fábrica
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}