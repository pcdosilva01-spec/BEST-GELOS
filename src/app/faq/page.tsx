'use client';

import { Header, Footer } from '@/components/layout/header-footer';
import { ChevronDown, ChevronUp, HelpCircle, Truck, IceCream, Shield, CreditCard, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    category: 'Pedidos',
    icon: IceCream,
    questions: [
      {
        q: 'Qual a quantidade mínima para pedido?',
        a: 'Para varejo: 1 saco de 5kg. Para atacado/eventos: 50kg. Gelo personalizado: 50kg mínimo.'
      },
      {
        q: 'Como faço para pedir gelo personalizado?',
        a: 'Entre em contato pelo WhatsApp com 48h de antecedência. Envie o logotipo/arte em vetor (AI, SVG, EPS) ou alta resolução. Fazemos prova digital para aprovação antes da produção.'
      },
      {
        q: 'Posso agendar a entrega para data/horário específico?',
        a: 'Sim! Agendamos com antecedência. Recomendamos pedir com pelo menos 2h de antecedência para entrega normal, ou agendar para eventos com 24h de antecedência.'
      },
      {
        q: 'Vocês atendem eventos grandes (casamentos, formaturas, corporativos)?',
        a: 'Sim! Atendemos eventos de todos os tamanhos. Temos estrutura para até 5.000kg/dia. Oferecemos gelo personalizado, carrinhos térmicos e equipe de apoio para eventos grandes. Consulte condições especiais.'
      }
    ]
  },
  {
    category: 'Entrega',
    icon: Truck,
    questions: [
      {
        q: 'Qual o tempo de entrega?',
        a: 'Até 2 horas na Grande SP (ABC, São Paulo). Para Mauá: 30-60 min. Consulte prazos para outras regiões no WhatsApp.'
      },
      {
        q: 'Vocês entregam em condomínios/prédios?',
        a: 'Sim. O motorista entra em contato 15 min antes da chegada. Para condomínios com portaria, autorize a entrada. Entregamos no local combinado (garagem, salão de festas, etc).'
      },
      {
        q: 'O gelo vem embalado? Como é o transporte?',
        a: 'Sim! Sacos plásticos reforçados (5kg, 10kg, 20kg). Transporte em veículos refrigerados (0°C a -5°C) com caixas térmicas. O gelo chega intacto e no ponto certo.'
      },
      {
        q: 'E se eu não estiver no local na hora da entrega?',
        a: 'O motorista aguarda até 15 min e tenta contato. Se não conseguir entregar, retorna à fábrica e reagendamos (pode haver taxa de reentrega). Combine com porteiro/zelo se não puder receber.'
      }
    ]
  },
  {
    category: 'Qualidade e Produtos',
    icon: Shield,
    questions: [
      {
        q: 'O gelo é próprio para consumo? Tem certificado?',
        a: 'Sim! Água de poço artesiano próprio, osmose reversa, certificação ANVISA e Vigilância Sanitária. Análises microbiológicas mensais em laboratório credenciado. Gelo alimentício 100% seguro.'
      },
      {
        q: 'Qual a diferença do gelo Best Gelo para o de mercado?',
        a: 'Nosso gelo: congelamento lento (cubos mais densos), água purificada (sem gosto/cheiro), derretimento 40% mais lento, cubos transparentes e padronizados. Gelo de mercado costuma ser turvo, derrete rápido e pode ter gosto de cloro.'
      },
      {
        q: 'Vocês vendem gelo seco? Quais os cuidados?',
        a: 'Sim, vendemos gelo seco (CO₂ sólido a -78°C). Cuidados: use luvas (queimadura por frio), não feche em recipientes herméticos (risco de explosão), mantenha ventilado. Vendemos em blocos de 1kg, 5kg, 10kg.'
      },
      {
        q: 'O gelo triturado vem pronto ou trituram na hora?',
        a: 'Trituramos na hora do pedido para garantir textura ideal (não vira "pó" nem pedaços grandes). Ideal para caipirinhas, frozen drinks e resfriamento rápido.'
      }
    ]
  },
  {
    category: 'Pagamento e Preços',
    icon: CreditCard,
    questions: [
      {
        q: 'Quais formas de pagamento aceitam?',
        a: 'PIX (chave CNPJ), dinheiro, cartão débito/crédito (maquininha na entrega), boleto para empresas (faturamento 30 dias). Para atacado: condições especiais.'
      },
      {
        q: 'Tem nota fiscal?',
        a: 'Sim, emitimos NF-e para todos os pedidos. Para consumidor final: NFC-e. Para empresas: NF-e com CFOP correto. Enviamos por e-mail/WhatsApp na hora da entrega.'
      },
      {
        q: 'Como funciona o preço para atacado/bares/restaurantes?',
        a: 'Tabela progressiva: quanto mais volume, menor o preço/kg. Bares/restaurantes: faturamento quinzenal/mensal, entrega programada, suporte prioritário. Entre em contato para tabela comercial.'
      },
      {
        q: 'Vocês dão desconto para pagamento à vista/PIX?',
        a: 'Sim! 5% de desconto no PIX para pedidos acima de R$ 200. Para atacado recorrente, negociamos condições personalizadas.'
      }
    ]
  },
  {
    category: 'Outras Dúvidas',
    icon: HelpCircle,
    questions: [
      {
        q: 'Qual o horário de funcionamento?',
        a: 'Fábrica: Segunda a sábado 6h-22h | Domingo 7h-15h. Entregas: Segunda a sábado 7h-20h | Domingo 8h-14h. WhatsApp: 24h (resposta em horário comercial).'
      },
      {
        q: 'Onde fica a fábrica? Posso retirar direto?',
        a: 'Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP (próximo ao Rodoanel). Sim, pode retirar na fábrica (desconto de 5% no varejo). Avise com 30 min de antecedência pelo WhatsApp.'
      },
      {
        q: 'Vocês alugam freezers/caixas térmicas para eventos?',
        a: 'Sim! Temos freezers horizontais (300L, 500L) e caixas térmicas profissionais para locação. Inclui entrega, instalação e retirada. Consulte valores e disponibilidade.'
      },
      {
        q: 'Como faço reclamação ou elogio?',
        a: 'WhatsApp (11) 99999-9999, e-mail contato@bestgelo.com.br ou formulário no site. Respondemos em até 4h úteis. Sua opinião nos ajuda a melhorar!'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Perguntas <span className="text-ice-600">Frequentes</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Não encontrou sua dúvida? <a href="/contato" className="text-ice-600 font-medium hover:underline">Fale conosco</a>
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {faqs.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                  <h2 className="font-display font-semibold text-2xl text-frost-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-ice-100 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-ice-600" />
                    </div>
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((faq, qIndex) => (
                      <details key={qIndex} className="group card-glass">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none focus:outline-none focus:ring-2 focus:ring-ice-500 focus:ring-offset-2">
                          <p className="font-medium text-frost-900 pr-10">{faq.q}</p>
                          <span className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180">
                            <ChevronDown className="w-5 h-5 text-frost-400" />
                          </span>
                        </summary>
                        <div className="px-5 pb-5 text-frost-600 leading-relaxed border-t border-frost-100 animate-accordion-down">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}

              <div className="card-glass p-8 text-center mt-8">
                <h3 className="font-display font-semibold text-2xl text-frost-900 mb-3">Não encontrou sua resposta?</h3>
                <p className="text-frost-600 mb-6">Nossa equipe está pronta para ajudar.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20..."
                     target="_blank" rel="noopener noreferrer"
                     className="btn-whatsapp">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    WhatsApp
                  </a>
                  <a href="/contato" className="btn-primary">
                    Formulário de Contato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}