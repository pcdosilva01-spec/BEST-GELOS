import { Header, Footer } from '@/components/layout/header-footer';
import { Truck, Shield, Star, Clock, MapPin, IceCream } from 'lucide-react';

export default function SobrePage() {
  const diferenciais = [
    { icon: IceCream, title: 'Fábrica Própria', desc: 'Produção própria em Mauá/SP com controle total de qualidade.' },
    { icon: Shield, title: 'Água Purificada', desc: 'Processo de filtração e purificação em múltiplas etapas.' },
    { icon: Truck, title: 'Entrega Rápida', desc: 'Até 2 horas na Grande São Paulo. Frota própria refrigerada.' },
    { icon: Clock, title: 'Atendimento Estendido', desc: 'Segunda a sábado 7h-20h, domingos 8h-14h. WhatsApp 24h.' },
    { icon: Star, title: 'Atacado e Varejo', desc: 'Atendemos consumidor final, bares, restaurantes e eventos.' },
    { icon: MapPin, title: 'Região ABC e SP', desc: 'Cobertura completa: Mauá, Santo André, São Bernardo, SP Capital.' },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Sobre a <span className="text-ice-600">Best Gelo</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Fábrica de gelo em Mauá/SP com mais de 10 anos de mercado. Qualidade, agilidade e confiança.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-frost-900 mb-6">
                  Nossa <span className="text-ice-600">História</span>
                </h2>
                <div className="space-y-4 text-frost-600 leading-relaxed">
                  <p>A Best Gelo nasceu em 2014 com um propósito simples: levar gelo de qualidade superior para a região do ABC paulista e Grande São Paulo. Começamos como uma pequena fábrica familiar em Mauá e, com dedicação e foco no cliente, crescemos tornando-nos referência no setor.</p>
                  <p>Hoje, contamos com fábrica própria de 2.000m², equipamentos de última geração e uma frota de 8 veículos refrigerados para garantir que seu gelo chegue sempre no ponto certo - seja para um churrasco de domingo, um grande evento corporativo ou o dia a dia do seu bar ou restaurante.</p>
                  <p>Nosso compromisso vai além de vender gelo: entregamos tranquilidade. Água purificada, processos certificados, pontualidade na entrega e atendimento humanizado.</p>
                </div>
              </div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-frost-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ice-100 to-ice-200">
                  <div className="text-center p-8">
                    <IceCream className="w-16 h-16 mx-auto text-ice-400 mb-4" />
                    <p className="text-frost-500">Imagem da fábrica</p>
                    <p className="text-sm text-frost-400 mt-2">2.000m² em Mauá/SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-frost-900">
          <div className="container-custom">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white text-center mb-12">
              Nossos <span className="text-ice-400">Diferenciais</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diferenciais.map((item, index) => (
                <div key={index} className="card-glass p-6 text-center hover:shadow-ice-hover transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ice-100 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-ice-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-frost-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-frost-900 mb-6">
                  Compromisso com a <span className="text-ice-600">Qualidade</span>
                </h2>
                <div className="space-y-4 text-frost-600 leading-relaxed">
                  <p>Todo nosso gelo passa por rigoroso controle de qualidade. A água utilizada é captada de poço artesiano próprio e passa por sistema de osmose reversa, garantindo pureza absoluta.</p>
                  <p>Somos certificados pela Vigilância Sanitária e seguimos todas as normas da ANVISA para produção de gelo alimentício. Realizamos análises microbiológicas mensais em laboratório credenciado.</p>
                  <p>Nosso processo de congelamento lento garante cubos mais densos, transparentes e com derretimento até 40% mais lento que o gelo comum.</p>
                </div>
              </div>
              <div className="card-glass p-6">
                <h3 className="font-display font-semibold text-xl text-frost-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-ice-600" />
                  Certificações
                </h3>
                <ul className="space-y-3 text-frost-600">
                  <li className="flex items-center gap-2"><span className="w-5 h-5 text-ice-500">✓</span> ANVISA - Alimento Seguro</li>
                  <li className="flex items-center gap-2"><span className="w-5 h-5 text-ice-500">✓</span> Vigilância Sanitária Municipal</li>
                  <li className="flex items-center gap-2"><span className="w-5 h-5 text-ice-500">✓</span> Análise Microbiológica Mensal</li>
                  <li className="flex items-center gap-2"><span className="w-5 h-5 text-ice-500">✓</span> Osmose Reversa Certificada</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}