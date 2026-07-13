import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/header-footer';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

const products: Record<string, { name: string; desc: string; details: string; icon: string; price: string }> = {
  'gelo-cubos': {
    name: 'Gelo em Cubos',
    desc: 'Cubos perfeitos, cristalinos e de derretimento lento para seus drinks.',
    details: 'Nosso gelo em cubos é produzido com água filtrada e purificada, garantindo total transparência e ausência de impurezas. Os cubos têm tamanho padronizado (3x3cm) e derretimento lento, ideal para whisky, gin, vodka e coquetéis sofisticados.',
    icon: '🧊',
    price: 'A partir de R$ 8,00 / saco 5kg'
  },
  'gelo-triturado': {
    name: 'Gelo Triturado',
    desc: 'Textura ideal para caipirinhas, frozen drinks e resfriamento rápido.',
    details: 'O gelo triturado é processado na hora do pedido para garantir a textura perfeita - nem muito fino, nem em pedaços grandes. Ideal para caipirinhas, frozen margaritas, smoothies e resfriamento rápido de garrafas em baldes de gelo.',
    icon: '🍹',
    price: 'A partir de R$ 10,00 / saco 5kg'
  },
  'gelo-seco': {
    name: 'Gelo Seco',
    desc: 'Para conservação, transporte refrigerado e efeitos especiais.',
    details: 'Gelo seco (CO₂ sólido) a -78°C. Utilizado para transporte de perecíveis, conservação de alimentos, efeitos especiais em eventos (fumaça), limpeza criogênica e aplicações industriais. Vendido em blocos de 1kg, 5kg ou 10kg. Requer manuseio com luvas.',
    icon: '❄️',
    price: 'A partir de R$ 15,00 / kg'
  },
  'gelo-personalizado': {
    name: 'Gelo Personalizado',
    desc: 'Cubos com logotipo, iniciais ou formatos especiais para seu evento.',
    details: 'Surpreenda seus convidados com gelo personalizado! Produzimos cubos com logotipo da empresa, iniciais dos noivos, formatos temáticos (corações, estrelas, esferas) e cores alimentícias. Pedido mínimo: 50kg. Prazo de produção: 48h. Ideal para casamentos, eventos corporativos, lançamentos de produto e festas VIP.',
    icon: '✨',
    price: 'Sob consulta'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) {
    return { title: 'Produto não encontrado' };
  }
  return {
    title: product.name,
    description: product.desc,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-frost-900 mb-4">Produto não encontrado</h1>
            <Link href="/produtos" className="text-ice-600 hover:underline">Voltar aos produtos</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-6">{product.icon}</div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-frost-900 tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 mb-8">{product.desc}</p>
              <div className="text-2xl font-bold text-ice-600">{product.price}</div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="card-glass p-8">
                <h2 className="font-display font-semibold text-2xl text-frost-900 mb-4">Detalhes do Produto</h2>
                <p className="text-frost-600 leading-relaxed">{product.details}</p>
              </div>

              <div className="mt-8 card-glass p-8">
                <h2 className="font-display font-semibold text-2xl text-frost-900 mb-4">Por que escolher Best Gelo?</h2>
                <ul className="space-y-3 text-frost-600">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span> Água purificada e filtrada</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span> Fábrica própria em Mauá/SP</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span> Entrega em até 2h na Grande SP</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span> Atendimento para eventos e atacado</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span> Certificado pela vigilância sanitária</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-frost-900">
          <div className="container-custom text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
              Faça seu <span className="text-ice-400">pedido agora</span>
            </h2>
            <p className="text-frost-300 mb-8 max-w-2xl mx-auto">
              Entrega rápida, pagamento na entrega ou PIX. Atendemos pelo WhatsApp.
            </p>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20${encodeURIComponent(product.name)}%20da%20Best%20Gelo."
               target="_blank" rel="noopener noreferrer"
               className="btn-whatsapp inline-flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Pedir no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}