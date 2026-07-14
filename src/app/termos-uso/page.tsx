'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FileText, Shield, Gavel, CreditCard, Truck, Package,
  User, Lock, AlertCircle, Info, ChevronRight, Mail,
  Phone, MapPin, CheckCircle, Clock, RefreshCw, Settings
} from 'lucide-react';

const sections = [
  {
    id: 'introducao',
    title: '1. Introdução e Aceitação',
    icon: FileText,
    content: `
      <p className="mb-4">Estes Termos de Uso regem o acesso e uso do site, aplicativo e serviços da BEST Gelo Comércio de Gelo LTDA ("BEST Gelo", "nós", "nosso"), inscrita no CNPJ 00.000.000/0000-00, com sede em Av. Industrial, 123, Distrito Industrial, Mauá - SP, CEP 09310-000.</p>
      <p className="mb-4">Ao acessar nosso site, fazer pedidos, cadastrar-se ou utilizar qualquer serviço, você ("Usuário", "Cliente", "você") concorda integralmente com estes Termos. Se não concorda, não utilize nossos serviços.</p>
      <p className="mb-4">Estes Termos complementam a <a href="/politica-privacidade" className="underline text-ice-600 dark:text-ice-400">Política de Privacidade</a> e, para clientes B2B, o Contrato Comercial específico.</p>
    `,
  },
  {
    id: 'servicos',
    title: '2. Descrição dos Serviços',
    icon: Package,
    content: `
      <p className="mb-4">A BEST Gelo oferece:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Produção e venda de gelo em cubos, triturado, seco e personalizado</li>
        <li>Entrega em domicílio/estabelecimento (frota própria refrigerada)</li>
        <li>Retirada na fábrica</li>
        <li>Plataforma digital para pedidos, rastreamento e gestão</li>
        <li>Atendimento B2B com condições especiais (sujeito a cadastro e aprovação)</li>
      </ul>
      <p className="mb-4">Nos reservamos o direito de modificar, suspender ou descontinuar serviços a qualquer momento, com aviso prévio razoável.</p>
    `,
  },
  {
    id: 'cadastro',
    title: '3. Cadastro e Conta',
    icon: User,
    content: `
      <h4 className="font-semibold mb-2">3.1 Elegibilidade</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Maiores de 18 anos (capacidade civil plena)</li>
        <li>Pessoas jurídicas regularmente constituídas</li>
        <li>Informações verídicas, completas e atualizadas</li>
      </ul>

      <h4 className="font-semibold mb-2">3.2 Responsabilidades do Usuário</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Manter credenciais seguras e não compartilhar</li>
        <li>Notificar imediatamente uso não autorizado</li>
        <li>Atualizar dados cadastrais quando houver alteração</li>
        <li>Responder por todos os pedidos feitos em sua conta</li>
      </ul>

      <h4 className="font-semibold mb-2">3.3 Suspensão/Exclusão</p>
      <p className="mb-4">Podemos suspender ou excluir contas por: fraude, inadimplência, violação destes Termos, inatividade > 2 anos, ou a pedido do titular (LGPD Art. 18).</p>
    `,
  },
  {
    id: 'pedidos',
    title: '4. Pedidos e Formação do Contrato',
    icon: FileText,
    content: `
      <h4 className="font-semibold mb-2">4.1 Processo</p>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>Cliente seleciona produtos, quantidade, entrega e pagamento</li>
        <li>Confirmação do resumo do pedido</li>
        <li>Envio do pedido (oferta)</li>
        <li>Confirmação automática por e-mail/WhatsApp (aceite)</li>
        <li>Contrato formado: obrigação de fornecer (nós) e pagar (cliente)</li>
      </ol>

      <h4 className="font-semibold mb-2">4.2 Disponibilidade e Preços</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Preços válidos no momento do pedido, sujeitos a alteração sem aviso prévio</li>
        <li>Estoque em tempo real; indisponibilidade será comunicada</li>
        <li>Erros de preço evidentes: reserva-se o direito de cancelar</li>
      </ul>

      <h4 className="font-semibold mb-2">4.3 Pedido Mínimo</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Entrega: 10 kg (2 sacos de 5 kg)</li>
        <li>Retirada: sem mínimo</li>
        <li>Gelo personalizado: 50 kg mínimo</li>
        <li>B2B: conforme contrato comercial</li>
      </ul>
    `,
  },
  {
    id: 'pagamento',
    title: '5. Pagamento e Faturamento',
    icon: CreditCard,
    content: `
      <h4 className="font-semibold mb-2">5.1 Formas de Pagamento</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>PIX:</strong> Imediato, 5% desconto (válido para varejo)</li>
        <li><strong>Cartão crédito/débito:</strong> Visa, Mastercard, Elo, Amex (via gateway PCI-DSS)</li>
        <li><strong>Dinheiro:</strong> Apenas entrega padrão, valor exato (sem troco acima de R$ 100)</li>
        <li><strong>Boleto/Faturado:</strong> Apenas B2B aprovado (15/30/45 dias)</li>
      </ul>

      <h4 className="font-semibold mb-2">5.2 Inadimplência (B2B)</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Atraso > 5 dias: juros 1% a.m. + multa 2% + correção monetária</li>
        <li>Atraso > 15 dias: suspensão de novos pedidos e entrega</li>
        <li>Atraso > 30 dias: inclusão em cadastros de proteção ao crédito</li>
        <li>Custas de cobrança (cartório, advogados) por conta do devedor</li>
      </ul>

      <h4 className="font-semibold mb-2">5.3 Nota Fiscal</p>
      <p className="mb-4">Emitida para todos os pedidos (NF-e). PF: CPF; PJ: CNPJ informado no cadastro. Responsabilidade do cliente pela veracidade dos dados.</p>
    `,
  },
  {
    id: 'entrega',
    title: '6. Entrece e Retirada',
    icon: Truck,
    content: `
      <h4 className="font-semibold mb-2">6.1 Modalidades</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Padrão: até 4h úteis (R$ 15,00 - Zona 1)</li>
        <li>Expressa: até 2h (R$ 35,00)</li>
        <li>Agendada: data/hora escolhida (R$ 20,00)</li>
        <li>Retirada: ~30 min, grátis (horário comercial)</li>
      </ul>

      <h4 className="font-semibold mb-2">6.2 Responsabilidades</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Cliente: endereço correto, alguém para receber, acesso liberado</li>
        <li>Nós: produto íntegro, temperatura adequada, prazo combinado</li>
        <li>Ausência: 15 min de espera, deixa na portaria/local combinado</li>
        <li>Impossibilidade de entrega: retorno à fábrica, nova taxa</li>
      </ul>

      <h4 className="font-semibold mb-2">6.3 Área de Cobertura</p>
      <p className="mb-4">ABC Paulista e Grande SP. Fora da área: consulte viabilidade. Entregas interestaduais: não realizadas.</p>
    `,
  },
  {
    id: 'qualidade',
    title: '7. Qualidade, Garantias e Devoluções',
    icon: Shield,
    content: `
      <h4 className="font-semibold mb-2">7.1 Padrão de Qualidade</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Água purificada (osmose reversa + UV), certificado ANVISA</li>
        <li>Produção em fábrica própria, controle de lote e rastreabilidade</li>
        <li>Embalagens alimentícias lacradas, caixas térmicas na entrega</li>
      </ul>

      <h4 className="font-semibold mb-2">7.2 Garantia de Satisfação</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Gelo com defeito (quebrado, sujo, sabor estranho): troca imediata</li>
        <li>Entrega fora do prazo (> 30 min): 50% desconto na próxima</li>
        <li>Produto errado: troca + brinde</li>
        <li>Reclamações: WhatsApp (11) 99999-9999 em até 24h do recebimento</li>
      </ul>

      <h4 className="font-semibold mb-2">7.3 Gelo Seco - Aviso Importante</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Temperatura -78°C: risco de queimadura por frio (use luvas)</li>
        <li>Sublima (vira gás): não hermético (risco explosão)</li>
        <li>Ventilação adequada: desloca oxigênio</li>
        <li>Não ingerir, não dar a crianças/animais</li>
        <li>Cliente assume responsabilidade pelo manuseio seguro</li>
      </ul>
    `,
  },
  {
    id: 'propriedade',
    title: '8. Propriedade Intelectual',
    icon: Gavel,
    content: `
      <p className="mb-4">Todo conteúdo do site/app (textos, imagens, logos, marcas, layout, código) é propriedade da BEST Gelo ou licenciado. Proibida reprodução, distribuição, modificação ou uso comercial sem autorização escrita.</p>
      <p className="mb-4">A marca "BEST Gelo", logotipo, slogans e identidade visual são marcas registradas. Uso indevido sujeito a medidas legais.</p>
      <p>Gelo personalizado com marca do cliente: propriedade intelectual da marca permanece do cliente; nós apenas produzimos sob licença para o pedido específico.</p>
    `,
  },
  {
    id: 'limitacao',
    title: '9. Limitação de Responsabilidade',
    icon: AlertCircle,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li>Serviços fornecidos "como estão" e "conforme disponibilidade"</li>
        <li>Não garantimos: ausência de erros, interrupções, vírus, compatibilidade total</li>
        <li>Responsabilidade total limitada ao valor do pedido que gerou a reclamação</li>
        <li>Não responsáveis por: danos indiretos, lucros cessantes, danos morais (exceto dolo/culpa grave)</li>
        <li>Força maior: greves, desastres, pandemias, falhas de infraestrutura pública</li>
        <li>Links para terceiros: não controlamos, não nos responsabilizamos</li>
      </ul>
    `,
  },
  {
    id: 'vigencia',
    title: '10. Vigência, Alterações e Rescisão',
    icon: RefreshCw,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li>Vigência: indeterminada, a partir do aceite</li>
        <li>Alterações: notificação prévia de 30 dias (e-mail/banner no site)</li>
        <li>Uso contínuo após alterações = aceitação</li>
        <li>Rescisão pelo cliente: a qualquer momento, exclusão da conta</li>
        <li>Rescisão por nós: violação destes Termos, fraude, inadimplência, ordem judicial</li>
        <li>Efeitos da rescisão: pedidos em andamento concluídos, dados retidos conforme lei</li>
      </ul>
    `,
  },
  {
    id: 'disposicoes',
    title: '11. Disposições Gerais',
    icon: Settings,
    content: `
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Lei aplicável:</strong> Legislação brasileira (LGPD, CDC, Código Civil)</li>
        <li><strong>Foro:</strong> Comarca de Mauá/SP (exceto consumidor: foro de seu domicílio)</li>
        <li><strong>Independência:</strong> Nulidade de cláusula não invalida as demais</li>
        <li><strong>Não renúncia:</strong> Tolerância não implica renúncia de direito</li>
        <li><strong>Cessão:</strong> Podemos ceder direitos/obrigações (aviso prévio)</li>
        <li><strong>Comunicações:</strong> E-mail cadastrado, WhatsApp, notificações no app</li>
      </ul>
    `,
  },
  {
    id: 'contato',
    title: '12. Contato',
    icon: Mail,
    content: `
      <p className="mb-4">Dúvidas, sugestões ou reclamações sobre estes Termos:</p>
      <div className="space-y-2">
        <p><strong>E-mail:</strong> <a href="mailto:juridico@bestgelo.com.br" className="underline text-ice-600 dark:text-ice-400">juridico@bestgelo.com.br</a></p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="underline text-ice-600 dark:text-ice-400">(11) 99999-9999</a></p>
        <p><strong>Telefone:</strong> <a href="tel:+551133334444" className="underline text-ice-600 dark:text-ice-400">(11) 3333-4444</a></p>
        <p><strong>Endereço:</strong> Av. Industrial, 123 - Distrito Industrial, Mauá - SP, CEP 09310-000</p>
      </div>
      <p className="mt-4">Atendimento: Seg-Sex 8h-18h | Sáb 8h-12h</p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Última atualização: <strong>Janeiro de 2025</strong> — Versão 2.0
      </p>
    `,
  },
];

export default function TermsOfUsePage() {
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
              <Gavel className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Termos de Uso
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Termos e Condições <span className="text-ice-600 dark:text-ice-400">de Uso</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Regras para uso de nossos serviços, pedidos, entregas e responsabilidades.
              Leia atentamente antes de fazer seu pedido.
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
                    <Gavel className="h-12 w-12 text-ice-600 dark:text-ice-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Precisa de ajuda?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Nossa equipe jurídica está à disposição.
                    </p>
                    <a href="mailto:juridico@bestgelo.com.br" className="inline-flex items-center gap-2 text-ice-600 dark:text-ice-400 font-medium hover:underline">
                      <Mail className="h-4 w-4" />
                      juridico@bestgelo.com.br
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
                  {sections.map((section) => (
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

                {/* Navigation buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="/politica-privacidade">
                      <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                      Política de Privacidade
                    </a>
                  </Button>
                  <Button asChild>
                    <a href="/contato">
                      <Mail className="h-4 w-4 mr-2" />
                      Contatar Jurídico
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