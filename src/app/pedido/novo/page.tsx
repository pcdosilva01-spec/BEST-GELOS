import { Header, Footer } from '@/components/layout/header-footer';
import Link from 'next/link';

export default function NovoPedidoPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20 min-h-screen">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Novo <span className="text-ice-600">Pedido</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed mb-10">
                Faça seu pedido de forma rápida e segura. Entregamos em até 2h na Grande SP.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="card-glass p-8 space-y-6">
                <div>
                  <label htmlFor="produto" className="block text-sm font-medium text-frost-700 mb-2">Produto</label>
                  <select id="produto" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent">
                    <option value="">Selecione o produto</option>
                    <option value="gelo-cubos">Gelo em Cubos - R$ 8,00 / saco 5kg</option>
                    <option value="gelo-triturado">Gelo Triturado - R$ 10,00 / saco 5kg</option>
                    <option value="gelo-seco">Gelo Seco - R$ 15,00 / kg</option>
                    <option value="gelo-personalizado">Gelo Personalizado - Sob consulta</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantidade" className="block text-sm font-medium text-frost-700 mb-2">Quantidade</label>
                  <input type="number" id="quantidade" min="1" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="Ex: 10" />
                </div>

                <div>
                  <label htmlFor="endereco" className="block text-sm font-medium text-frost-700 mb-2">Endereço de Entrega</label>
                  <textarea id="endereco" rows={3} className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="Rua, número, bairro, cidade, CEP"></textarea>
                </div>

                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-frost-700 mb-2">Data e Horário Desejados</label>
                  <input type="datetime-local" id="data" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="observacoes" className="block text-sm font-medium text-frost-700 mb-2">Observações (opcional)</label>
                  <textarea id="observacoes" rows={3} className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="Ex: Entregar na portaria, chamar no interfone 101..."></textarea>
                </div>

                <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
                   target="_blank" rel="noopener noreferrer"
                   className="btn-whatsapp w-full justify-center text-lg py-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  Finalizar Pedido no WhatsApp
                </a>
              </div>

              <div className="mt-8 card-glass p-6">
                <h3 className="font-display font-semibold text-lg text-frost-900 mb-4">Ou peça direto pelo WhatsApp</h3>
                <p className="text-frost-600 mb-4">Envie sua lista de produtos e endereço que montamos seu orçamento na hora.</p>
                <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
                   target="_blank" rel="noopener noreferrer"
                   className="btn-whatsapp inline-flex">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  Abrir WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}