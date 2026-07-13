import { Header, Footer } from '@/components/layout/header-footer';
import { Shield, FileText, Clock, Gavel, Handshake, AlertCircle } from 'lucide-react';

export default function TermosUsoPage() {
  const sections = [
    {
      id: 'aceitacao',
      title: '1. Aceitação dos Termos',
      icon: FileText,
      content: `Ao acessar e utilizar o site <strong>bestgelo.com.br</strong> e/ou realizar pedidos por WhatsApp, telefone ou presencialmente, você declara ter lido, compreendido e concordado com estes Termos de Uso e com nossa <a href="/politica-privacidade" className="text-ice-600 underline">Política de Privacidade</a>. Se não concordar, não utilize nossos serviços.`
    },
    {
      id: 'servicos',
      title: '2. Descrição dos Serviços',
      icon: Shield,
      content: `A Best Gelo Comércio de Gelo LTDA ("Best Gelo", "nós", "nosso") atua na fabricação e comercialização de gelo alimentício (cubos, triturado, seco, personalizado) com entrega na Grande São Paulo. Serviços incluem: venda direta ao consumidor, atacado para bares/restaurantes, fornecimento para eventos, locação de freezers/caixas térmicas e gelo personalizado com logotipo.`
    },
    {
      id: 'cadastro',
      title: '3. Cadastro e Conta',
      icon: Handshake,
      content: `<ul className="list-disc list-inside space-y-2">
        <li>Para compras recorrentes, você pode criar conta fornecendo dados verídicos e atualizados.</li>
        <li>Você é responsável pela confidencialidade da senha e por todas as atividades na sua conta.</li>
        <li>Não nos responsabilizamos por acessos não autorizados decorrentes de negligência do usuário.</li>
        <li>Podemos suspender/excluir contas com uso fraudulento, abusivo ou em desacordo com estes termos.</li>
        <li>Menores de 18 anos só podem cadastrar-se com assistência de responsável legal.</li>
      </ul>`
    },
    {
      id: 'pedidos',
      title: '4. Pedidos, Preços e Pagamento',
      icon: FileText,
      content: `<ul className="list-disc list-inside space-y-2">
        <li><strong>Preços:</strong> exibidos em reais (BRL), podem variam em caráter informativo. Preço final confirmado no pedido (pode variar por região, volume, urgência).</li>
        <li><strong>Pedidos:</strong> via site, WhatsApp, telefone ou presencial. Confirmação = aceite da proposta.</li>
        <li><strong>Cancelamento:</strong> até 30 min antes da entrega agendada (sem custo). Após: taxa de 50% do valor.</li>
        <li><strong>Pagamento:</strong> PIX, dinheiro, cartão (débito/crédito na entrega), boleto (empresas, 30 dias).</li>
        <li><strong>Faturamento:</strong> para empresas ativas, mediante análise de crédito e cadastro.</li>
        <li><strong>Nota fiscal:</strong> emitida para todos os pedidos (NFC-e ou NF-e).</li>
      </ul>`
    },
    {
      id: 'entrega',
      title: '5. Entrega e Recebimento',
      icon: Shield,
      content: `<ul className="list-disc list-inside space-y-2">
        <li><strong>Prazo:</strong> até 2h na Grande SP (ABC: 30-90 min). Horários agendados têm prioridade.</li>
        <li><strong>Responsabilidade do cliente:</strong> estar no local, autorizar portaria, conferir quantidade/qualidade no ato.</li>
        <li><strong>Ausência:</strong> motorista aguarda 15 min, tenta contato. Nova tentativa = taxa de reentrega.</li>
        <li><strong>Avarias:</strong> reclame na hora ao motorista ou em até 1h via WhatsApp. Foto obrigatória.</li>
        <li><strong>Risco:</strong> passa para o cliente no momento da entrega conferida.</li>
      </ul>`
    },
    {
      id: 'qualidade',
      title: '6. Qualidade e Garantia',
      icon: Gavel,
      content: `<ul className="list-disc list-inside space-y-2">
        <li>Gelo produzido com água de poço artesiano + osmose reversa, certificado ANVISA/Vigilância Sanitária.</li>
        <li>Análises microbiológicas mensais em laboratório credenciado.</li>
        <li>Garantia: gelo próprio para consumo, cristalino, sem odor/sabor, derretimento lento.</li>
        <li>Não garantimos: tempo de duração do gelo no local (depende de temperatura ambiente, recipiente, manipulação).</li>
        <li>Gelo seco: vendemos apenas para maiores de 18 anos. Instruções de segurança fornecidas na entrega.</li>
      </ul>`
    },
    {
      id: 'personalizado',
      title: '7. Gelo Personalizado',
      icon: FileText,
      content: `<ul className="list-disc list-inside space-y-2">
        <li>Pedido mínimo: 50kg. Prazo: 48h úteis após aprovação da arte.</li>
        <li>Arte: vetor (AI, SVG, EPS) ou alta resolução (300 DPI). Fazemos prova digital para aprovação.</li>
        <li>Não nos responsabilizamos por: logotipos de terceiros sem autorização, cores fora do gamut alimentício, arte de baixa qualidade.</li>
        <li>Cancelamento: após aprovação da arte, não há devolução (produção iniciada).</li>
      </ul>`
    },
    {
      id: 'propriedade',
      title: '8. Propriedade Intelectual',
      icon: Shield,
      content: `Todo o conteúdo do site (textos, imagens, logos, layout, código) é de propriedade da Best Gelo ou licenciado. Proibida reprodução não autorizada. A marca "Best Gelo" e logotipo são registrados no INPI.`
    },
    {
      id: 'responsabilidade',
      title: '9. Limitação de Responsabilidade',
      icon: AlertCircle,
      content: `<ul className="list-disc list-inside space-y-2">
        <li>Não nos responsabilizamos por: danos indiretos, lucros cessantes, perdas por eventos de força maior.</li>
        <li>Responsabilidade máxima limitada ao valor do pedido contestado.</li>
        <li>Site fornecido "como está" - sem garantia de disponibilidade ininterrupta ou livre de erros.</li>
        <li>Links para terceiros (WhatsApp, Google Maps, redes sociais) não implicam endosso ou responsabilidade.</li>
      </ul>`
    },
    {
      id: 'vigencia',
      title: '10. Vigência e Alterações',
      icon: Clock,
      content: `Estes termos vigoram por tempo indeterminado. Podemos alterá-los a qualquer momento. Versão atualizada publicada neste link com data. Alterações materiais: aviso por e-mail/WhatsApp 30 dias antes. Uso contínuo = aceite da nova versão.`
    },
    {
      id: 'direito',
      title: '11. Lei Aplicável e Foro',
      icon: Gavel,
      content: `Regidos pelas leis da República Federativa do Brasil (especialmente CDC, LGPD, Código Civil, Marco Civil da Internet). Foro da Comarca de Mauá/SP para dirimir controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.`
    },
    {
      id: 'contato',
      title: '12. Contato',
      icon: FileText,
      content: `Dúvidas sobre estes termos: <br />
        <strong>Best Gelo Comércio de Gelo LTDA</strong><br />
        CNPJ: 46.613.186/0001-86<br />
        Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP - CEP 09310-730<br />
        E-mail: <a href="mailto:contato@bestgelo.com.br" className="text-ice-600 underline">contato@bestgelo.com.br</a><br />
        WhatsApp: (11) 99999-9999<br />
        <br />
        <strong>Última atualização: 13 de julho de 2026</strong>`
    }
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Termos de <span className="text-ice-600">Uso</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Regras para uso do site e serviços da Best Gelo. Última atualização: 13 de julho de 2026.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <nav className="mb-8 sticky top-20 hidden lg:block">
                <ul className="card-glass p-4 space-y-1 max-h-[calc(100vh-10rem)] overflow-y-auto">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="block px-3 py-2 text-sm text-frost-600 hover:text-ice-600 hover:bg-frost-50 rounded-lg transition-colors">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="lg:pl-12 space-y-12">
                {sections.map((section) => (
                  <article key={section.id} id={section.id} className="card-glass p-8">
                    <h2 className="font-display font-semibold text-2xl text-frost-900 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-ice-100 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-ice-600" />
                      </div>
                      {section.title}
                    </h2>
                    <div className="prose prose-frost max-w-none text-frost-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}