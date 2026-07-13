import { Header, Footer } from '@/components/layout/header-footer';
import { Shield, Mail, Lock, Clock, User, Trash2, Eye, Database, Globe } from 'lucide-react';

export default function PoliticaPrivacidadePage() {
  const sections = [
    {
      id: 'controlador',
      title: '1. Controlador dos Dados',
      icon: Shield,
      content: `A Best Gelo Comércio de Gelo LTDA, inscrita no CNPJ 46.613.186/0001-86, com sede na Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP - CEP 09310-730, é a controladora dos seus dados pessoais.`
    },
    {
      id: 'dados-coletados',
      title: '2. Dados Coletados',
      icon: Database,
      content: `Coletamos apenas dados necessários para prestação de serviços:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Identificação:</strong> nome, CPF/CNPJ, telefone, e-mail, endereço</li>
          <li><strong>Pedidos:</strong> histórico de compras, preferências, observações de entrega</li>
          <li><strong>Comunicação:</strong> mensagens trocadas via WhatsApp, e-mail, formulários</li>
          <li><strong>Técnicos:</strong> IP, navegador, dispositivo, logs de acesso (LGPD Art. 7º, IX)</li>
        </ul>
        <strong>Não coletamos:</strong> dados sensíveis (origem racial, opinião política, religião, saúde, vida sexual, biométricos, genéticos).`
    },
    {
      id: 'finalidade',
      title: '3. Finalidade e Base Legal',
      icon: Lock,
      content: `<table className="w-full text-sm mt-2">
        <thead><tr className="border-b border-frost-200"><th className="pb-2 text-left font-semibold">Finalidade</th><th className="pb-2 text-left font-semibold">Base Legal (LGPD)</th></tr></thead>
        <tbody className="divide-y divide-frost-100">
          <tr><td className="py-2">Processar e entregar pedidos</td><td className="py-2">Execução de contrato (Art. 7º, V)</td></tr>
          <tr><td className="py-2">Emissão de nota fiscal</td><td className="py-2">Obrigação legal (Art. 7º, II)</td></tr>
          <tr><td className="py-2">Comunicação sobre pedidos (WhatsApp/SMS)</td><td className="py-2">Legítimo interesse / Contrato (Art. 7º, V/IX)</td></tr>
          <tr><td className="py-2">Atendimento ao cliente</td><td className="py-2">Legítimo interesse (Art. 7º, IX)</td></tr>
          <tr><td className="py-2">Marketing (com consentimento)</td><td className="py-2">Consentimento (Art. 7º, I)</td></tr>
          <tr><td className="py-2">Prevenção à fraude e segurança</td><td className="py-2">Legítimo interesse (Art. 7º, IX)</td></tr>
          <tr><td className="py-2">Análise de uso do site (analytics)</td><td className="py-2">Consentimento (cookies não essenciais)</td></tr>
        </tbody>
      </table>`
    },
    {
      id: 'compartilhamento',
      title: '4. Compartilhamento de Dados',
      icon: Globe,
      content: `Compartilhamos dados apenas quando estritamente necessário:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Transportadores:</strong> nome, endereço, telefone (apenas para entrega)</li>
          <li><strong>Contabilidade/Fisco:</strong> dados de notas fiscais (obrigação legal)</li>
          <li><strong>Gateway de pagamento:</strong> dados necessários para processar PIX/cartão (nunca armazenamos dados de cartão)</li>
          <li><strong>Autoridades:</strong> mediante ordem judicial ou requisição legal</li>
        </ul>
        <strong>Não vendemos, alugamos ou compartilhamos dados para marketing de terceiros.</strong>`
    },
    {
      id: 'retencao',
      title: '5. Retenção e Exclusão',
      icon: Clock,
      content: `Mantemos dados pelo tempo necessário:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Dados de cadastro/pedidos:</strong> 5 anos após última interação (prazo prescricional CC/CDC)</li>
          <li><strong>Notas fiscais:</strong> 10 anos (obrigação fiscal)</li>
          <li><strong>Logs de acesso:</strong> 6 meses (Marco Civil da Internet)</li>
          <li><strong>Marketing:</strong> até revogação do consentimento</li>
        </ul>
        Você pode solicitar exclusão antecipada (ver "Seus Direitos"). Avaliaremos se há impedimento legal.`
    },
    {
      id: 'direitos',
      title: '6. Seus Direitos (LGPD Art. 18)',
      icon: User,
      content: `Você pode, a qualquer momento, requerer:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Confirmação e acesso</strong> aos seus dados</li>
          <li><strong>Correção</strong> de dados incompletos, inexatos ou desatualizados</li>
          <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários, excessivos ou tratados em desconformidade</li>
          <li><strong>Portabilidade</strong> dos dados a outro fornecedor</li>
          <li><strong>Eliminação</strong> dos dados tratados com consentimento (exceto se houver base legal para retenção)</li>
          <li><strong>Informação</strong> sobre compartilhamento com terceiros</li>
          <li><strong>Revogação do consentimento</strong> (quando aplicável)</li>
          <li><strong>Oposição</strong> a tratamento baseado em legítimo interesse</li>
        </ul>
        <strong>Como exercer:</strong> envie e-mail para <a href="mailto:privacidade@bestgelo.com.br" className="text-ice-600 underline">privacidade@bestgelo.com.br</a> ou WhatsApp (11) 99999-9999. Responderemos em até 15 dias.`
    },
    {
      id: 'seguranca',
      title: '7. Segurança da Informação',
      icon: Shield,
      content: `Adotamos medidas técnicas e administrativas:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>HTTPS/TLS 1.3 em todo o site</li>
          <li>Banco de dados criptografado em repouso (AES-256)</li>
          <li>Autenticação com JWT + refresh tokens (expiração curta)</li>
          <li>Rate limiting e proteção contra brute force</li>
          <li>Logs de auditoria imutáveis (ações sensíveis)</li>
          <li>Acesso restrito por princípio do menor privilégio</li>
          <li>Treinamento contínuo da equipe em LGPD e segurança</li>
        </ul>
        Embora nenhum sistema seja 100% seguro, nos comprometemos a notificar autoridades e titulares em caso de incidente de segurança (LGPD Art. 48).`
    },
    {
      id: 'cookies',
      title: '8. Cookies e Tecnologias Similares',
      icon: Eye,
      content: `Utilizamos cookies:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Essenciais (sempre ativos):</strong> sessão, autenticação, carrinho, segurança (LGPD Art. 7º, IX)</li>
          <li><strong>Analytics (opcionais):</strong> Google Analytics GA4 (IP anonimizado) - apenas com consentimento</li>
          <li><strong>Marketing (opcionais):</strong> Pixel Meta/WhatsApp Business - apenas com consentimento</li>
        </ul>
        Gerencie preferências no banner de cookies ou nas configurações do navegador. A desativação de essenciais pode impedir o funcionamento do site.`
    },
    {
      id: 'menores',
      title: '9. Dados de Menores de Idade',
      icon: User,
      content: `Não coletamos intencionalmente dados de menores de 18 anos. Pedidos de menores devem ser feitos por responsável legal. Se identificarmos coleta inadvertida, excluiremos os dados imediatamente.`
    },
    {
      id: 'alteracoes',
      title: '10. Alterações nesta Política',
      icon: Clock,
      content: `Podemos atualizar esta política. Alterações materiais serão comunicadas por e-mail/WhatsApp e publicadas aqui com destaque. Versão anterior arquivada. Última atualização: <strong>13 de julho de 2026</strong>.`
    },
    {
      id: 'contato',
      title: '11. Contato do Encarregado (DPO)',
      icon: Mail,
      content: `Encarregado de Proteção de Dados: <strong>Departamento Jurídico - Best Gelo</strong><br />
        E-mail: <a href="mailto:privacidade@bestgelo.com.br" className="text-ice-600 underline">privacidade@bestgelo.com.br</a><br />
        Telefone/WhatsApp: (11) 99999-9999<br />
        Endereço: Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP - CEP 09310-730`
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
                Política de <span className="text-ice-600">Privacidade</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Conforme LGPD (Lei 13.709/2018). Última atualização: 13 de julho de 2026.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <nav className="mb-8 sticky top-20 hidden lg:block">
                <ul className="card-glass p-4 space-y-1">
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