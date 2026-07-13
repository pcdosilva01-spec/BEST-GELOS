import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout/header-footer';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Conheça nossos produtos: gelo em cubos, triturado, seco e personalizado. Qualidade superior direto da fábrica em Mauá/SP.',
};

export default function ProdutosPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Nossos <span className="text-ice-600">Produtos</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Gelo de qualidade superior para todas as necessidades. Da festa em casa ao grande evento corporativo.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Gelo em Cubos', desc: 'Cubos perfeitos para drinks e bebidas', slug: 'gelo-cubos', icon: '🧊' },
                { name: 'Gelo Triturado', desc: 'Ideal para caipirinhas e coquetéis', slug: 'gelo-triturado', icon: '🍹' },
                { name: 'Gelo Seco', desc: 'Para conservação e efeitos especiais', slug: 'gelo-seco', icon: '❄️' },
                { name: 'Gelo Personalizado', desc: 'Com logotipo ou formato especial', slug: 'gelo-personalizado', icon: '✨' },
              ].map((product) => (
                <article key={product.slug} className="card-glass p-6 hover:shadow-ice-hover transition-shadow">
                  <div className="text-5xl mb-4">{product.icon}</div>
                  <h3 className="font-display font-semibold text-xl text-frost-900 mb-2">{product.name}</h3>
                  <p className="text-frost-600 mb-4">{product.desc}</p>
                  <a href={`/produtos/${product.slug}`} className="text-ice-600 font-medium hover:text-ice-700 inline-flex items-center gap-1">
                    Ver detalhes →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-frost-900">
          <div className="container-custom text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
              Precisa de <span className="text-ice-400">quantidade grande</span>?
            </h2>
            <p className="text-frost-300 mb-8 max-w-2xl mx-auto">
              Atendemos bares, restaurantes, eventos e distribuidores com condições especiais.
            </p>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo%20no%20atacado."
               target="_blank" rel="noopener noreferrer"
               className="btn-whatsapp inline-flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15z"/></svg>
              Pedir no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}