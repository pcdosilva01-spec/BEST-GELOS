import { Header, Footer } from '@/components/layout/header-footer';
import { Truck, MapPin, Clock, Shield, CreditCard, Package } from 'lucide-react';

export default function EntregaPage() {
  const areas = [
    { name: 'Mauá', tempo: '30-60 min', taxa: 'Grátis acima de R$ 50' },
    { name: 'Santo André', tempo: '45-90 min', taxa: 'Grátis acima de R$ 80' },
    { name: 'São Bernardo do Campo', tempo: '60-90 min', taxa: 'Grátis acima de R$ 100' },
    { name: 'São Caetano do Sul', tempo: '60-90 min', taxa: 'Grátis acima de R$ 100' },
    { name: 'Diadema', tempo: '60-120 min', taxa: 'Consultar' },
    { name: 'São Paulo (Zona Sul/Leste)', tempo: '90-120 min', taxa: 'Consultar' },
    { name: 'São Paulo (Centro/Oeste/Norte)', tempo: '90-120 min', taxa: 'Consultar' },
    { name: 'Ribeirão Pires / Rio Grande da Serra', tempo: '60-90 min', taxa: 'Consultar' },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Entrega <span className="text-ice-600">Rápida</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Frota própria refrigerada. Entregamos seu gelo no ponto certo, na hora combinada.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="card-glass p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ice-100 flex items-center justify-center">
                  <Truck className="w-7 h-7 text-ice-600" />
                </div>
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-2">Frota Própria</h3>
                <p className="text-frost-600">8 veículos refrigerados para manter a qualidade do gelo até a entrega.</p>
              </div>
              <div className="card-glass p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ice-100 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-ice-600" />
                </div>
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-2">Até 2h na Grande SP</h3>
                <p className="text-frost-600">Agende sua entrega. Cumprimos o horário combinado com pontualidade.</p>
              </div>
              <div className="card-glass p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ice-100 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-ice-600" />
                </div>
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-2">Gelo Protegido</h3>
                <p className="text-frost-600">Embalagem térmica e transporte refrigerado. Chega intacto no seu evento.</p>
              </div>
            </div>

            <div className="card-glass p-6 mb-8">
              <h2 className="font-display font-semibold text-2xl text-frost-900 mb-6">Áreas de Cobertura e Taxas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-frost-200">
                      <th className="pb-3 font-semibold text-frost-900">Região</th>
                      <th className="pb-3 font-semibold text-frost-900">Tempo Estimado</th>
                      <th className="pb-3 font-semibold text-frost-900">Taxa de Entrega</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas.map((area, i) => (
                      <tr key={i} className="border-b border-frost-100 last:border-0">
                        <td className="py-3 font-medium text-frost-900">{area.name}</td>
                        <td className="py-3 text-frost-600">{area.tempo}</td>
                        <td className="py-3 text-frost-600">{area.taxa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-glass p-6">
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-ice-600" />
                  Como Funciona
                </h3>
                <ol className="space-y-3 text-frost-600">
                  <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-ice-100 text-ice-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>Faça o pedido pelo WhatsApp ou site</li>
                  <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-ice-100 text-ice-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>Confirme endereço e horário desejado</li>
                  <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-ice-100 text-ice-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>Receba confirmação com previsão de chegada</li>
                  <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-ice-100 text-ice-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>Motorista liga 15 min antes de chegar</li>
                  <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-ice-100 text-ice-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>Entrega no local combinado, pagamento na hora</li>
                </ol>
              </div>
              <div className="card-glass p-6">
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-ice-600" />
                  Formas de Pagamento
                </h3>
                <ul className="space-y-3 text-frost-600">
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span>PIX (chave: CNPJ 46.613.186/0001-86)</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span>Dinheiro (troco disponível)</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span>Cartão Débito/Crédito (maquininha)</li>
                  <li className="flex items-center gap-3"><span className="w-5 h-5 text-ice-500">✓</span>Boleto (para empresas, faturamento 30 dias)</li>
                </ul>
                <p className="mt-4 text-sm text-frost-500">* Para atacado e eventos grandes, consulte condições especiais de faturamento.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-frost-900">
          <div className="container-custom text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
              Agende sua <span className="text-ice-400">entrega agora</span>
            </h2>
            <p className="text-frost-300 mb-8 max-w-2xl mx-auto">
              WhatsApp responde em minutos. Atendimento humano, sem robôs.
            </p>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20entrega%20de%20gelo."
               target="_blank" rel="noopener noreferrer"
               className="btn-whatsapp inline-flex text-lg px-8 py-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Pedir pelo WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}