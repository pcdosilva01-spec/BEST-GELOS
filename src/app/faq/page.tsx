'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Snowflake, Truck, Clock, MapPin, CreditCard, Package,
  CheckCircle, AlertCircle, HelpCircle, Search, ChevronDown,
  ChevronUp, MessageCircle, Phone, Mail, Factory, Shield, X
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    category: 'Geral',
    items: [
      {
        q: 'O que é a BEST Gelo?',
        a: 'Somos a maior fábrica de gelo do ABC Paulista, com mais de 15 anos de experiência. Produzimos gelo em cubos, triturado, seco e personalizado com água purificada por osmose reversa, seguindo todas as normas da ANVISA.',
      },
      {
        q: 'Qual a diferença entre gelo em cubos e triturado?',
        a: 'Gelo em cubos derrete mais devagar, ideal para drinks e resfriamento prolongado. Gelo triturado resfria mais rápido, perfeito para caipirinhas, smoothies e resfriamento de alimentos.',
      },
      {
        q: 'O gelo é próprio para consumo?',
        a: 'Sim! Nossa água passa por osmose reversa, filtração por carvão ativado e tratamento UV. Temos certificação ANVISA e cada lote tem rastreabilidade completa.',
      },
      {
        q: 'Vocês fazem gelo com formato personalizado?',
        a: 'Sim! Produzimos gelo com logotipo da empresa, formatos especiais (esferas, corações, cubos grandes) e cores personalizadas. Ideal para eventos corporativos, casamentos e ações de marketing. Consulte condições.',
      },
    ],
  },
  {
    category: 'Pedidos e Pagamento',
    items: [
      {
        q: 'Qual o pedido mínimo para entrega?',
        a: 'Para entrega: 10kg (2 sacos de 5kg). Para retirada na fábrica: não há mínimo. Para gelo personalizado: mínimo de 50kg.',
      },
      {
        q: 'Quais formas de pagamento aceitam?',
        a: 'PIX (com 5% de desconto), cartão de crédito/débito (Visa, Mastercard, Elo, Amex), dinheiro na entrega (apenas entrega padrão) e boleto para clientes B2B cadastrados.',
      },
      {
        q: 'Como faço um pedido?',
        a: 'Pelo site (carrinho), WhatsApp (11) 99999-9999, telefone (11) 3333-4444 ou e-mail contato@bestgelo.com.br. Pedidos online têm rastreamento em tempo real.',
      },
      {
        q: 'Posso cancelar ou alterar meu pedido?',
        a: 'Sim, até 30 minutos antes da saída para entrega. Para gelo personalizado, até 24h antes da produção. Entre em contato pelo WhatsApp ou telefone.',
      },
      {
        q: 'Emitem nota fiscal?',
        a: 'Sim, emitimos NF-e para todos os pedidos. Para PJ, informe o CNPJ no cadastro. Para PF, emitimos com CPF.',
      },
    ],
  },
  {
    category: 'Entrega e Retirada',
    items: [
      {
        q: 'Qual a área de entrega?',
        a: 'Atendemos toda a Grande São Paulo e ABC (Santo André, São Bernardo, São Caetano, Diadema, Mauá, Ribeirão Pires, Rio Grande da Serra). Outras regiões consulte disponibilidade.',
      },
      {
        q: 'Quanto tempo demora a entrega?',
        a: 'Padrão: até 4h úteis. Expressa: até 2h. Agendada: no horário escolhido. Retirada na fábrica: disponível em ~30 min após confirmação.',
      },
      {
        q: 'Como funciona a entrega agendada?',
        a: 'No checkout, escolha "Entrega Agendada", selecione data e horário (intervalos de 1h). Confirmamos por WhatsApp. Taxa: R$ 20,00.',
      },
      {
        q: 'Vocês entregam em apartamentos/condomínios?',
        a: 'Sim, deixamos na portaria ou recepção. Para entrega na unidade, combinamos com o cliente. Em prédios sem portaria, combinamos ponto de encontro.',
      },
      {
        q: 'O que acontece se ninguém estiver no local?',
        a: 'Tentamos contato por telefone/WhatsApp. Após 15 min, deixamos na portaria ou local combinado. Se não for possível, retornamos à fábrica e cobramos nova taxa de entrega.',
      },
    ],
  },
  {
    category: 'Gelo Seco',
    items: [
      {
        q: 'O que é gelo seco?',
        a: 'É CO₂ sólido (dióxido de carbono) a -78°C. Não derrete, sublima (vira gás). Ideal para efeitos especiais, transporte de perecíveis, limpeza criogênica.',
      },
      {
        q: 'Como manusear gelo seco com segurança?',
        a: 'SEMPRE use luvas térmicas (queimadura por frio). Não coloque em recipientes herméticos (risco de explosão). Use em local ventilado (desloca oxigênio). Mantenha longe de crianças e pets.',
      },
      {
        q: 'Quanto tempo dura o gelo seco?',
        a: 'Em isopor bom: 24-48h (sublima ~10-15%/dia). Em freezer comum: dura mais. Não guarde em geladeira/frigorífico comum (danifica o equipamento).',
      },
      {
        q: 'Qual a quantidade mínima de gelo seco?',
        a: 'Vendemos a partir de 1kg. Para eventos/indústria, embalagens de 5kg, 10kg e 20kg. Consulte preços para volumes maiores.',
      },
    ],
  },
  {
    category: 'B2B / Atacado',
    items: [
      {
        q: 'Como virar cliente atacadista?',
        a: 'Cadastre-se em /b2b ou fale com nossa equipe comercial. Oferecemos preços especiais, crédito faturado (após análise), entrega programada e gerente de conta dedicado.',
      },
      {
        q: 'Quais os benefícios B2B?',
        a: 'Preços com até 30% desconto, faturamento 15/30/45 dias, entrega programada semanal/quinzenal, prioridade em alta demanda, relatórios de consumo, gelo personalizado com sua marca.',
      },
      {
        q: 'Atendem eventos grandes?',
        a: 'Sim! Casamentos, formaturas, shows, feiras, eventos corporativos. Temos estrutura para grandes volumes com entrega fracionada e equipe de apoio. Solicite orçamento.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  const allItems = faqs.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.category }))
  );

  const filteredItems = allItems.filter(item =>
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['all', ...faqs.map(c => c.category)];

  const toggleItem = (question: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  };

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
              <HelpCircle className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Central de Ajuda
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Dúvidas <span className="text-ice-600 dark:text-ice-400">Frequentes</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Encontre respostas rápidas para as perguntas mais comuns.
              Não achou o que procura? Fale conosco!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-8 lg:py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-24 space-y-6"
              >
                {/* Search */}
                <Card className="border-ice-200 dark:border-ice-800">
                  <CardContent className="p-4">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Buscar Perguntas
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Digite sua dúvida..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card className="border-ice-200 dark:border-ice-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Categorias</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                            activeCategory === cat
                              ? 'bg-ice-100 dark:bg-ice-900/30 text-ice-700 dark:text-ice-300'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          {cat === 'all' ? 'Todas' : cat}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="border-ice-200 dark:border-ice-800 bg-gradient-to-br from-ice-50 to-white dark:from-ice-900/20 dark:to-gray-900">
                  <CardContent className="p-6 text-center">
                    <HelpCircle className="h-12 w-12 text-ice-600 dark:text-ice-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Não encontrou sua resposta?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Nossa equipe está pronta para ajudar.
                    </p>
                    <div className="space-y-2">
                      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium hover:underline">
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp: (11) 99999-9999
                      </a>
                      <a href="tel:+551133334444" className="flex items-center justify-center gap-2 text-ice-600 dark:text-ice-400 font-medium hover:underline">
                        <Phone className="h-5 w-5" />
                        (11) 3333-4444
                      </a>
                      <a href="mailto:contato@bestgelo.com.br" className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-medium hover:underline">
                        <Mail className="h-5 w-5" />
                        contato@bestgelo.com.br
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {searchQuery && (
                  <div className="mb-6 p-4 bg-ice-50 dark:bg-ice-900/20 border border-ice-200 dark:border-ice-800 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-ice-700 dark:text-ice-300">
                      {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''} para "<strong>{searchQuery}</strong>"
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-ice-600 dark:text-ice-400 hover:underline text-sm flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Limpar busca
                    </button>
                  </div>
                )}

                {activeCategory !== 'all' && !searchQuery && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Badge variant="outline" className="bg-ice-100 dark:bg-ice-900/30 text-ice-700 dark:text-ice-300">
                        {activeCategory}
                      </Badge>
                    </h2>
                    <div className="space-y-3">
                      {faqs.find(c => c.category === activeCategory)?.items.map((item, i) => (
                        <FAQItem
                          key={item.q}
                          question={item.q}
                          answer={item.a}
                          index={i}
                          isOpen={openItems.has(item.q)}
                          onToggle={() => toggleItem(item.q)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {!searchQuery && activeCategory === 'all' && (
                  <>
                    {faqs.map((cat, catIndex) => (
                      <motion.div
                        key={cat.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: catIndex * 0.1 }}
                      >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                          <Badge variant="outline" className="bg-ice-100 dark:bg-ice-900/30 text-ice-700 dark:text-ice-300">
                            {cat.category}
                          </Badge>
                        </h2>
                        <div className="space-y-3">
                          {cat.items.map((item, i) => (
                            <FAQItem
                              key={item.q}
                              question={item.q}
                              answer={item.a}
                              index={i}
                              isOpen={openItems.has(item.q)}
                              onToggle={() => toggleItem(item.q)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {filteredItems.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Tente buscar com outras palavras ou</p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      <X className="h-4 w-4 mr-2" />
                      Limpar busca
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-ice-600 to-ice-700 dark:from-ice-700 dark:to-ice-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-space-grotesk">
              Ainda tem dúvidas?
            </h2>
            <p className="text-ice-100 text-lg mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para atender você.
              Resposta rápida no WhatsApp ou ligue para nossa central.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-ice-600 hover:bg-ice-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                <MessageCircle className="h-6 w-6" />
                Falar no WhatsApp
              </a>
              <a href="/contato" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                <Mail className="h-6 w-6" />
                Enviar E-mail
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer, index, isOpen, onToggle }: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-ice-500 focus:ring-offset-2 rounded-lg"
        >
          <span className="font-medium text-gray-900 dark:text-white pr-4">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-ice-600 dark:text-ice-400"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <CardContent className="pb-5 px-5 text-gray-600 dark:text-gray-400">
            <p>{answer}</p>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}