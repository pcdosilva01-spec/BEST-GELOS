'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Shield, FileText, User, Lock, Database, Eye,
  Trash2, Clock, Mail, Phone, MapPin, Settings,
  CheckCircle, AlertCircle, Info, ChevronRight, Target as TargetIcon, Users
} from 'lucide-react';

const sections = [
  {
    id: 'introducao',
    title: '1. Introdução',
    icon: FileText,
    content: `
      <p className="mb-4">Esta Política de Privacidade descreve como a BEST Gelo ("nós", "nosso", "empresa") coleta, usa, compartilha e protege suas informações pessoais quando você acessa nosso site, faz pedidos, entra em contato ou utiliza nossos serviços.</p>
      <p className="mb-4">Ao utilizar nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política. Se não concorda, por favor, não utilize nossos serviços.</p>
      <p className="mb-4">Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e demais legislações aplicáveis.</p>
    `,
  },
  {
    id: 'dados-coletados',
    title: '2. Dados Coletados',
    icon: Database,
    content: `
      <h4 className="font-semibold mb-2">2.1 Dados de Identificação</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Nome completo</li>
        <li>CPF/CNPJ</li>
        <li>E-mail</li>
        <li>Telefone/WhatsApp</li>
        <li>Endereço completo (para entrega)</li>
      </ul>

      <h4 className="font-semibold mb-2">2.2 Dados de Navegação</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Endereço IP</li>
        <li>Tipo de navegador e dispositivo</li>
        <li>Páginas visitadas e tempo de permanência</li>
        <li>Cookies e tecnologias similares</li>
      </ul>

      <h4 className="font-semibold mb-2">2.3 Dados de Pedidos</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Histórico de compras</li>
        <li>Produtos preferidos</li>
        <li>Frequência de pedidos</li>
        <li>Formas de pagamento utilizadas</li>
      </ul>
    `,
  },
  {
    id: 'finalidade',
    title: '3. Finalidade do Tratamento',
    icon: TargetIcon,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Execução de contratos:</strong> Processar, faturar e entregar seus pedidos</li>
        <li><strong>Atendimento ao cliente:</strong> Responder dúvidas, reclamações e solicitações</li>
        <li><strong>Comunicação:</strong> Enviar confirmações, rastreamento, promoções (com consentimento)</li>
        <li><strong>Melhoria dos serviços:</strong> Análise de preferências, otimização de rotas, desenvolvimento de produtos</li>
        <li><strong>Obrigações legais:</strong> Emissão de notas fiscais, cumprimento de ordens judiciais</li>
        <li><strong>Prevenção de fraudes:</strong> Verificação de identidade, segurança das transações</li>
        <li><strong>Marketing:</strong> Newsletter e ofertas (apenas com opt-in explícito)</li>
      </ul>
    `,
  },
  {
    id: 'compartilhamento',
    title: '4. Compartilhamento de Dados',
    icon: Users,
    content: `
      <p className="mb-4">Não vendemos seus dados pessoais. Compartilhamos apenas nas seguintes situações:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Transportadoras parceiras:</strong> Nome, endereço e telefone para entrega (apenas dados necessários)</li>
        <li><strong>Meios de pagamento:</strong> Dados necessários para processar PIX, cartão ou boleto (via gateways certificados PCI-DSS)</li>
        <li><strong>Órgãos públicos:</strong> Quando exigido por lei, ordem judicial ou regulatório (ANVISA, Receita Federal, etc.)</li>
        <li><strong>Prestadores de serviço:</strong> Hospedagem, e-mail, CRM, analytics (sob contratos de confidencialidade e DPAs)</li>
        <li><strong>Transferência de negócio:</strong> Em caso de fusão, aquisição ou venda de ativos, dados são transferidos como parte do negócio</li>
      </ul>
    `,
  },
  {
    id: 'direitos',
    title: '5. Seus Direitos (LGPD - Art. 18)',
    icon: Shield,
    content: `
      <p className="mb-4">Você tem direito a solicitar, a qualquer momento:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e quais</li>
        <li><strong>Correção:</strong> Atualizar dados incompletos, inexatos ou desatualizados</li>
        <li><strong>Anonimização, bloqueio ou eliminação:</strong> De dados desnecessários, excessivos ou tratados em desacordo com a LGPD</li>
        <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado para outro fornecedor</li>
        <li><strong>Eliminação:</strong> Exclusão dos dados tratados com consentimento (exceto quando houver base legal para retenção)</li>
        <li><strong>Informação sobre compartilhamento:</strong> Com quais entidades públicas/privadas compartilhamos</li>
        <li><strong>Revogação do consentimento:</strong> Quando o tratamento basear-se em consentimento</li>
        <li><strong>Oposição:</strong> Ao tratamento baseado em legítimo interesse</li>
      </ul>
      <p className="mt-4">Para exercer seus direitos, entre em contato: <a href="mailto:privacidade@bestgelo.com.br" className="underline text-ice-600 dark:text-ice-400">privacidade@bestgelo.com.br</a> ou pelo WhatsApp (11) 99999-9999.</p>
    `,
  },
  {
    id: 'retencao',
    title: '6. Retenção de Dados',
    icon: Clock,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Dados cadastrais:</strong> Mantidos enquanto a conta estiver ativa ou por 5 anos após último pedido (obrigação fiscal)</li>
        <li><strong>Dados de pedidos/notas fiscais:</strong> 5 anos (Art. 202 do CTN / legislação tributária)</li>
        <li><strong>Logs de acesso/navegação:</strong> 6 meses (Art. 15 do Marco Civil da Internet)</li>
        <li><strong>Dados de marketing:</strong> Até revogação do consentimento</li>
        <li><strong>Dados de pagamento:</strong> Não armazenamos dados sensíveis de cartão (tokenização via gateway)</li>
      </ul>
      <p className="mt-4">Após os prazos, dados são anonimizados ou excluídos de forma segura.</p>
    `,
  },
  {
    id: 'seguranca',
    title: '7. Segurança da Informação',
    icon: Lock,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li>Criptografia SSL/TLS 1.3 em todas as comunicações</li>
        <li>Banco de dados criptografado em repouso (AES-256)</li>
        <li>Autenticação de dois fatores (2FA) para área administrativa</li>
        <li>Controle de acesso baseado em menor privilégio (RBAC)</li>
        <li>Monitoramento de logs e detecção de intrusão (IDS/IPS)</li>
        <li>Backups diários criptografados em localidade geográfica distinta</li>
        <li>Treinamento contínuo da equipe em LGPD e segurança</li>
        <li>Plano de resposta a incidentes de segurança</li>
      </ul>
      <p className="mt-4">Apesar dos esforços, nenhum sistema é 100% seguro. Em caso de incidente, notificaremos a ANPD e os titulares afetados conforme Art. 48 da LGPD.</p>
    `,
  },
  {
    id: 'cookies',
    title: '8. Cookies e Tecnologias Similares',
    icon: Eye,
    content: `
      <h4 className="font-semibold mb-2">8.1 Tipos de Cookies</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Essenciais:</strong> Necessários para funcionamento do site (carrinho, login, segurança)</li>
        <li><strong>Analytics:</strong> Google Analytics, GA4 - entendem uso do site (anonimizados)</li>
        <li><strong>Marketing:</strong> Pixel Facebook/Google Ads - para anúncios personalizados (com consentimento)</li>
        <li><strong>Preferências:</strong> Lembram escolhas (idioma, região, tema)</li>
      </ul>
      <h4 className="font-semibold mb-2">8.2 Gestão de Cookies</p>
      <p className="mb-4">Você pode gerenciar preferências no banner de cookies ou nas configurações do navegador. A desativação de cookies essenciais pode impedir o funcionamento do site.</p>
    `,
  },
  {
    id: 'menores',
    title: '9. Dados de Menores de Idade',
    icon: User,
    content: `
      <p className="mb-4">Não coletamos intencionalmente dados de menores de 18 anos. Se você é pai/mãe/responsável e acredita que seu filho nos forneceu dados, entre em contato para exclusão imediata.</p>
      <p>Para compras, exigimos maioridade civil (18 anos) ou autorização de responsável legal.</p>
    `,
  },
  {
    id: 'alteracoes',
    title: '10. Alterações nesta Política',
    icon: FileText,
    content: `
      <p className="mb-4">Podemos atualizar esta política periodicamente. A versão mais recente sempre estará disponível nesta página com a data de atualização.</p>
      <p className="mb-4">Alterações significativas serão comunicadas por e-mail (se tivermos seu consentimento) ou por aviso destacado no site/app.</p>
      <p>Última atualização: <strong>Janeiro de 2025</strong></p>
    `,
  },
  {
    id: 'contato',
    title: '11. Contato do Encarregado (DPO)',
    icon: Mail,
    content: `
      <p className="mb-4">Nosso Encarregado pelo Tratamento de Dados Pessoais (DPO) está à disposição:</p>
      <div className="space-y-2">
        <p><strong>Nome:</strong> Mariana Costa</p>
        <p><strong>E-mail:</strong> <a href="mailto:privacidade@bestgelo.com.br" className="underline text-ice-600 dark:text-ice-400">privacidade@bestgelo.com.br</a></p>
        <p><strong>Telefone/WhatsApp:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="underline text-ice-600 dark:text-ice-400">(11) 99999-9999</a></p>
        <p><strong>Endereço:</strong> Av. Industrial, 123 - Distrito Industrial, Mauá - SP, CEP 09310-000</p>
      </div>
      <p className="mt-4">Também pode acionar a ANPD: <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer" className="underline text-ice-600 dark:text-ice-400">www.gov.br/anpd</a></p>
    `,
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introducao');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-ice-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ice-200/30 dark:bg-ice-800/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 dark:bg-red-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 text-sm lg:text-base px-4 py-2" style={{ borderColor: 'hsl(var(--ice-border))' }}>
              <Shield className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Política de Privacidade
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Sua Privacidade <span className="text-ice-600 dark:text-ice-400">é Prioridade</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Conheça como coletamos, usamos e protegemos seus dados pessoais
              em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar TOC */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card className="border-ice-200 dark:border-ice-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Sumário</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <nav className="space-y-1 max-h-[70vh] overflow-y-auto">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            setActiveSection(section.id);
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                            activeSection === section.id
                              ? 'bg-ice-100 dark:bg-ice-900/30 text-ice-700 dark:text-ice-300 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          {section.title}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <Card className="mt-6 border-ice-200 dark:border-ice-800 bg-gradient-to-br from-ice-50 to-white dark:from-ice-900/20 dark:to-gray-900">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-ice-600 dark:text-ice-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dúvidas sobre privacidade?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Nosso Encarregado (DPO) está à disposição.
                    </p>
                    <a href="mailto:privacidade@bestgelo.com.br" className="inline-flex items-center gap-2 text-ice-600 dark:text-ice-400 font-medium hover:underline">
                      <Mail className="h-4 w-4" />
                      privacidade@bestgelo.com.br
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-12">
                  {sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="py-6 border-t border-gray-200 dark:border-gray-700 first:border-0"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                          <section.icon className="h-5 w-5 text-ice-600 dark:text-ice-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                      </div>
                      <div
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </section>
                  ))}
                </div>

                {/* Last updated */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Última atualização: <strong>Janeiro de 2025</strong>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Versão 2.1 — Em conformidade com LGPD (Lei nº 13.709/2018)
                  </p>
                </div>

                {/* Navigation buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="/termos-uso">
                      <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                      Termos de Uso
                    </a>
                  </Button>
                  <Button asChild>
                    <a href="/contato">
                      <Mail className="h-4 w-4 mr-2" />
                      Contatar DPO
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}