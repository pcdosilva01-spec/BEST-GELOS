import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/header-footer';
import Link from 'next/link';
import { Snowflake, Truck, Shield, Award, CheckCircle, MessageCircle, ArrowLeft, Sparkles, Factory, MapPin, Clock, Phone } from 'lucide-react';
import { cn, formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  params: Promise<{ slug: string }>;
}

const products: Record<string, {
  name: string;
  desc: string;
  details: string;
  icon: string;
  price: string;
  category: string;
  weight: number;
  features: string[];
  image?: string;
}> = {
  'gelo-cubos': {
    name: 'Gelo em Cubos',
    desc: 'Cubos perfeitos, cristalinos e de derretimento lento para seus drinks.',
    details: 'Nosso gelo em cubos é produzido com água filtrada e purificada, garantindo total transparência e ausência de impurezas. Os cubos têm tamanho padronizado (2,5cm) e derretimento lento, ideal para whisky, gin, vodka e coquetéis sofisticados.',
    icon: '🧊',
    price: 'A partir de R$ 12,90 / saco 5kg',
    category: 'CUBES',
    weight: 5,
    features: [
      'Água purificada por osmose reversa',
      'Cubos padronizados 2,5cm x 2,5cm',
      'Derretimento lento - não aguado o drink',
      'Embalagem selada a vácuo',
      'Rastreabilidade por QR Code',
      'Certificado ANVISA / Ministério da Agricultura'
    ],
    image: '/images/gelo-cubos.jpg'
  },
  'gelo-triturado': {
    name: 'Gelo Triturado',
    desc: 'Textura ideal para caipirinhas, frozen drinks e resfriamento rápido.',
    details: 'O gelo triturado é processado na hora do pedido para garantir a textura perfeita - nem muito fino, nem em pedaços grandes. Ideal para caipirinhas, frozen margaritas, smoothies e resfriamento rápido de garrafas em baldes de gelo.',
    icon: '🍹',
    price: 'A partir de R$ 14,90 / saco 5kg',
    category: 'CRUSHED',
    weight: 5,
    features: [
      'Processado no momento do pedido',
      'Textura uniforme - não vira "papa"',
      'Ideal para caipirinhas e frozen drinks',
      'Resfriamento 3x mais rápido que cubos',
      'Embalagem térmica para entrega',
      'Sem adição de conservantes'
    ],
    image: '/images/gelo-triturado.jpg'
  },
  'gelo-seco': {
    name: 'Gelo Seco',
    desc: 'Para conservação, transporte refrigerado e efeitos especiais.',
    details: 'Gelo seco (CO₂ sólido) a -78°C. Utilizado para transporte de perecíveis, conservação de alimentos, efeitos especiais em eventos (fumaça), limpeza criogênica e aplicações industriais. Vendido em blocos de 1kg, 5kg ou 10kg. Requer manuseio com luvas.',
    icon: '❄️',
    price: 'A partir de R$ 35,00 / kg',
    category: 'DRY_ICE',
    weight: 1,
    features: [
      'Temperatura de -78°C',
      'Não deixa resíduo líquido',
      'Blocos de 1kg, 5kg e 10kg',
      'Entrega em caixa térmica isolada',
      'Instruções de segurança inclusas',
      'Ideal para eventos com fumaça/efeito seco'
    ],
    image: '/images/gelo-seco.jpg'
  },
  'gelo-personalizado': {
    name: 'Gelo Personalizado',
    desc: 'Cubos com logotipo, iniciais ou formatos especiais para seu evento.',
    details: 'Surpreenda seus convidados com gelo personalizado! Produzimos cubos com logotipo da empresa, iniciais dos noivos, formatos temáticos (corações, estrelas, esferas) e cores alimentícias. Pedido mínimo: 50kg. Prazo de produção: 48h. Ideal para casamentos, eventos corporativos, lançamentos de produto e festas VIP.',
    icon: '✨',
    price: 'Sob consulta',
    category: 'SPECIAL',
    weight: 1,
    features: [
      'Logotipo em relevo nos cubos',
      'Formatos: cubos, esferas, corações, estrelas',
      'Cores alimentícias disponíveis',
      'Pedido mínimo: 50kg',
      'Produção em 48h úteis',
      'Entrega refrigerada no local do evento'
    ],
    image: '/images/gelo-personalizado.jpg'
  },
  'gelo-especial': {
    name: 'Gelo Especial',
    desc: 'Formatos exclusivos: esferas, corações, estrelas e cubos grandes premium.',
    details: 'Nossa linha de gelo especial inclui esferas perfeitas para whisky (derretimento ultra-lento), cubos grandes 5x5cm para drinks premium, corações e estrelas para eventos temáticos, e diamantes de gelo para apresentações de alto padrão. Produzidos com água triplamente filtrada e congelamento direcional para transparência absoluta. Ideais para bares premium, eventos de luxo e presentes corporativos.',
    icon: '💎',
    price: 'A partir de R$ 25,00 / unidade',
    category: 'SPECIAL',
    weight: 1,
    features: [
      'Esferas perfeitas 5cm (whisky)',
      'Cubos grandes 5x5cm (drinks premium)',
      'Formatos: corações, estrelas, diamantes',
      'Congelamento direcional - zero bolhas',
      'Água triplamente filtrada',
      'Embalagem premium presenteável'
    ],
    image: '/images/gelo-especial.jpg'
  }
};

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) {
    return { title: 'Produto não encontrado | BEST GELOS' };
  }
  return {
    title: `${product.name} | BEST GELOS`,
    description: product.desc,
    openGraph: {
      title: `${product.name} | BEST GELOS`,
      description: product.desc,
      type: 'website',
    },
  };
}

function ProductIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    '🧊': <Snowflake className="w-12 h-12" aria-hidden="true" />,
    '🍹': <span className="text-8xl" aria-hidden="true">🍹</span>,
    '❄️': <span className="text-8xl" aria-hidden="true">❄️</span>,
    '✨': <Sparkles className="w-12 h-12" aria-hidden="true" />,
    '💎': <span className="text-8xl" aria-hidden="true">💎</span>,
  };
  return <div className={cn('flex-shrink-0 text-ice-500', className)}>{icons[icon] || <Snowflake className="w-12 h-12" />}</div>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug];
  const whatsappUrl = generateWhatsAppLink('5511999999999', `Olá, gostaria de pedir ${product?.name} da BEST GELOS.`);

  if (!product) {
    return (
      <>
        <Header />
        <main id="main-content" className="pt-16 min-h-screen flex items-center justify-center bg-frost-50">
          <div className="text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-ice flex items-center justify-center mx-auto mb-6 shadow-ice">
              <Snowflake className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-frost-900 mb-4">Produto não encontrado</h1>
            <p className="text-frost-600 mb-8 max-w-md mx-auto">O produto que você procura não existe ou foi removido.</p>
            <Link href="/produtos" className="btn-primary inline-flex">
              <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
              Voltar aos Produtos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-ice-50 via-white to-white overflow-hidden">
          <div className="absolute inset-0 bg-mesh-ice" aria-hidden="true" />
          <div className="relative container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-frost-500 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-ice-600 transition-colors">Início</Link>
                <span aria-hidden="true">/</span>
                <Link href="/produtos" className="hover:text-ice-600 transition-colors">Produtos</Link>
                <span aria-hidden="true">/</span>
                <span className="text-frost-900 font-medium" aria-current="page">{product.name}</span>
              </nav>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Product Image/Visual */}
                <div className="relative">
                  <div className="relative aspect-square bg-gradient-to-br from-ice-100 via-white to-teal-50 rounded-3xl overflow-hidden shadow-2xl border border-ice-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ProductIcon icon={product.icon} className="text-ice-200" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-frost-900/20 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="badge-ice uppercase tracking-wider">{product.category === 'CUBES' ? 'Cubos' : product.category === 'CRUSHED' ? 'Triturado' : product.category === 'DRY_ICE' ? 'Seco' : 'Especial'}</span>
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        Premium
                      </span>
                    </div>
                  </div>

                  {/* Floating stats */}
                  <div className="absolute -bottom-6 -left-6 lg:-left-12 grid grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-2xl text-center">
                      <div className="font-display font-extrabold text-2xl text-frost-900">{product.weight}kg</div>
                      <div className="text-xs text-frost-500">Por saco</div>
                    </div>
                    <div className="glass-card p-4 rounded-2xl text-center">
                      <div className="font-display font-extrabold text-2xl text-ice-600">{product.price.split(' ')[1]}</div>
                      <div className="text-xs text-frost-500">Preço base</div>
                    </div>
                    <div className="glass-card p-4 rounded-2xl text-center">
                      <div className="font-display font-extrabold text-2xl text-teal-600">2h</div>
                      <div className="text-xs text-frost-500">Entrega SP</div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className="inline-flex items-center gap-2 badge-ice mb-4">
                    <span>Fabricação Própria</span>
                  </div>

                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-frost-950 tracking-tight mb-6 leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-xl text-frost-600 mb-8 leading-relaxed max-w-xl">
                    {product.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-4 mb-8">
                    <div className="font-display font-extrabold text-4xl sm:text-5xl text-ice-600">
                      {product.price.split(' / ')[0]}
                    </div>
                    <div className="text-frost-500">/ saco {product.weight}kg</div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full sm:w-auto justify-center gap-3 group"
                    >
                      <MessageCircle className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      Pedir pelo WhatsApp
                    </a>
                    <Link href="/pedido/novo" className="btn-outline w-full sm:w-auto justify-center">
                      <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
                      Fazer Pedido Online
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-frost-200">
                    <div className="flex items-center gap-2 text-frost-600">
                      <CheckCircle className="w-5 h-5 text-ice-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">Certificado ANVISA</span>
                    </div>
                    <div className="flex items-center gap-2 text-frost-600">
                      <Truck className="w-5 h-5 text-ice-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">Entrega 2h Grande SP</span>
                    </div>
                    <div className="flex items-center gap-2 text-frost-600">
                      <Shield className="w-5 h-5 text-ice-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">Garantia de Qualidade</span>
                    </div>
                    <div className="flex items-center gap-2 text-frost-600">
                      <Award className="w-5 h-5 text-ice-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">15+ Anos de Mercado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="card-base p-8 lg:p-12">
                <h2 className="font-display font-bold text-3xl text-frost-950 mb-8 flex items-center gap-3">
                  <Snowflake className="w-8 h-8 text-ice-500" aria-hidden="true" />
                  Detalhes do Produto
                </h2>

                <div className="prose prose-frost max-w-none">
                  <p className="text-frost-600 leading-relaxed text-lg mb-8">{product.details}</p>
                </div>

                {/* Features Grid */}
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-6">Características Principais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-frost-50 rounded-xl hover:bg-ice-50 transition-colors">
                      <CheckCircle className="w-5 h-5 text-ice-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-frost-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="mt-8 card-base p-8 lg:p-12 bg-gradient-ice-light rounded-2xl border border-ice-100">
                <h2 className="font-display font-bold text-3xl text-frost-950 mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-ice-500" aria-hidden="true" />
                  Por que escolher a BEST GELOS?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Snowflake, title: 'Pureza Garantida', desc: 'Água 99,9% pura via osmose reversa + UV' },
                    { icon: Factory, title: 'Fábrica Própria', desc: 'Produção em Mauá/SP - 50 ton/dia capacidade' },
                    { icon: Truck, title: 'Logística Própria', desc: 'Frota refrigerada com rastreamento GPS' },
                    { icon: Shield, title: 'Certificação Total', desc: 'ANVISA, Ministério da Agricultura, ISO' },
                    { icon: Award, title: 'Atendimento Especializado', desc: 'B2B e B2C com condições especiais' },
                    { icon: Sparkles, title: 'Sustentabilidade', desc: 'Reuso de água, energia solar, embalagens eco' },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-frost-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-frost-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="section-padding bg-frost-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-frost-950 mb-4">
                Outros <span className="text-gradient-ice">Produtos</span>
              </h2>
              <p className="text-frost-600 max-w-2xl mx-auto">Conheça nossa linha completa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(products)
                .filter(([key]) => key !== slug)
                .map(([key, p]) => (
                  <Link key={key} href={`/produtos/${key}`} className="block">
                    <Card variant="interactive" className="h-full">
                      <div className="aspect-square bg-gradient-to-br from-ice-100 to-ice-200 flex items-center justify-center relative overflow-hidden">
                        <ProductIcon icon={p.icon} className="text-ice-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-frost-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-ice-600 bg-ice-100 px-2 py-1 rounded-full uppercase tracking-wider">
                            {p.category === 'CUBES' ? 'Cubos' : p.category === 'CRUSHED' ? 'Triturado' : p.category === 'DRY_ICE' ? 'Seco' : 'Especial'}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-frost-900 mb-2 group-hover:text-ice-600 transition-colors">{p.name}</h3>
                        <p className="text-frost-500 text-sm mb-3 line-clamp-2">{p.desc}</p>
                        <div className="flex items-baseline justify-between">
                          <span className="font-display font-bold text-xl text-ice-600">{p.price.split(' / ')[0]}</span>
                          <span className="text-sm text-frost-400">/ {p.weight}kg</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/produtos" className="btn-outline inline-flex items-center gap-2">
                Ver Todos os Produtos
                <Snowflake className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-ice-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh-ice" aria-hidden="true" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-ice-500/10 blur-3xl" aria-hidden="true" />

          <div className="relative container-custom text-center">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Pronto para seu <span className="text-ice-300">Pedido</span>?
            </h2>
            <p className="text-xl text-ice-100/80 mb-10 max-w-2xl mx-auto">
              Escolha a melhor forma: site, WhatsApp ou telefone. Entrega rápida e garantida em toda Grande SP.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto gap-3 text-lg px-8 py-4"
              >
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
                WhatsApp: (11) 99999-9999
              </a>
              <Link href="/pedido/novo" className="btn-outline w-full sm:w-auto border-white/30 text-white hover:bg-white/10 gap-3 text-lg px-8 py-4">
                <Snowflake className="w-6 h-6" aria-hidden="true" />
                Pedido Online
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-3 p-6 glass rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-ice-300" aria-hidden="true" />
                </div>
                <p className="font-semibold text-white">Fábrica & Escritório</p>
                <p className="text-ice-200/80 text-sm text-center">Rua Bras Cubas, 624 - Vila Bocaina<br />Mauá - SP, 09310-730</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 glass rounded-2xl border-l border-r border-white/10 md:border-l-0 md:border-r-0 md:border-t md:border-b">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-ice-300" aria-hidden="true" />
                </div>
                <p className="font-semibold text-white">Horário de Atendimento</p>
                <p className="text-ice-200/80 text-sm text-center">Seg a Sex: 7h às 19h<br />Sáb: 7h às 13h<br />Dom: Plantão eventos</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 glass rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-ice-300" aria-hidden="true" />
                </div>
                <p className="font-semibold text-white">Telefone & WhatsApp</p>
                <p className="text-ice-200/80 text-sm text-center">(11) 99999-9999<br />contato@bestgelos.com.br</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-frost-50" aria-label="Localização">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-display font-bold text-2xl text-center text-frost-950 mb-6">Nos Encontre no Mapa</h3>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-glass-lg bg-frost-200">
                <iframe
                  title="Localização BEST GELOS - Mauá/SP"
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
      <Footer />
    </>
  );
}