'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Truck, MapPin, Clock, Shield, CheckCircle, MapPin as MapPinIcon,
  Navigation, Smartphone, Package, Snowflake, UserCheck,
  AlertCircle, Info, Loader2, ChevronRight, Zap, MessageCircle
} from 'lucide-react';
import { useState } from 'react';

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Entrega Padrão',
    description: 'Entrega em até 4 horas úteis após confirmação do pedido.',
    price: 15.00,
    features: ['Rastreamento em tempo real', 'Confirmação por WhatsApp', 'Comprovante digital'],
    icon: Truck,
    color: 'text-ice-600 dark:text-ice-400',
    bgColor: 'bg-ice-100 dark:bg-ice-900/30',
  },
  {
    id: 'express',
    name: 'Entrega Expressa',
    description: 'Entrega em até 2 horas. Prioridade na fila de expedição.',
    price: 35.00,
    badge: 'Mais Rápida',
    features: ['Prioridade máxima', 'Rastreamento em tempo real', 'Confirmação por WhatsApp', 'Motorista dedicado'],
    icon: Zap,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    id: 'scheduled',
    name: 'Entrega Agendada',
    description: 'Escolha data e horário (intervalos de 1h). Ideal para planejamento.',
    price: 20.00,
    features: ['Agendamento flexível', 'Confirmação 24h antes', 'Lembrete no dia', 'Janela de 1 hora'],
    icon: Clock,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    id: 'pickup',
    name: 'Retirada na Fábrica',
    description: 'Pedido disponível em ~30 minutos. Sem custo de entrega.',
    price: 0,
    badge: 'Grátis',
    features: ['Disponível em 30 min', 'Horário estendido', 'Ajuda para carregar', 'Sem taxa'],
    icon: Package,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
];

const coverageAreas = [
  { city: 'Mauá', time: '30 min', zone: 'Base' },
  { city: 'Santo André', time: '45 min', zone: 'Zona 1' },
  { city: 'São Bernardo', time: '50 min', zone: 'Zona 1' },
  { city: 'São Caetano', time: '55 min', zone: 'Zona 1' },
  { city: 'Diadema', time: '1h', zone: 'Zona 2' },
  { city: 'Ribeirão Pires', time: '1h 15min', zone: 'Zona 2' },
  { city: 'Rio Grande da Serra', time: '1h 20min', zone: 'Zona 2' },
  { city: 'São Paulo (Zona Sul)', time: '1h 30min', zone: 'Zona 3' },
  { city: 'São Paulo (Zona Leste)', time: '1h 30min', zone: 'Zona 3' },
  { city: 'São Paulo (Centro)', time: '1h 45min', zone: 'Zona 3' },
  { city: 'Guarulhos', time: '1h 30min', zone: 'Zona 3' },
  { city: 'Outras regiões', time: 'Consulte', zone: 'Sob consulta' },
];

const processSteps = [
  { step: 1, title: 'Pedido Confirmado', desc: 'Recebemos seu pedido e separamos os produtos na câmara fria.', icon: CheckCircle },
  { step: 2, title: 'Preparação', desc: 'Produtos são conferidos, pesados e acondicionados em caixas térmicas.', icon: Package },
  { step: 3, title: 'Saída para Entrega', desc: 'Motorista recebe a rota otimizada por GPS. Saída imediata.', icon: Truck },
  { step: 4, title: 'Em Trânsito', desc: 'Rastreamento em tempo real. Você recebe link para acompanhar.', icon: Navigation },
  { step: 5, title: 'Chegada', desc: 'Entrega no local combinado. Conferência e assinatura digital.', icon: MapPinIcon },
  { step: 6, title: 'Finalizado', desc: 'Comprovante enviado por WhatsApp/e-mail. Avaliação do serviço.', icon: UserCheck },
];

const faqs = [
  {
    q: 'Qual o horário de entregas?',
    a: 'Segunda a sexta: 8h às 18h. Sábados: 8h às 12h. Entregas agendadas podem ser fora desse horário (consulte).',
  },
  {
    q: 'Como funciona o rastreamento?',
    a: 'Após a saída do motorista, você recebe um link por WhatsApp/SMS com mapa em tempo real. Vê a posição do veículo e previsão de chegada.',
  },
  {
    q: 'E se ninguém estiver no local?',
    a: 'Tentamos contato por 15 min. Deixamos na portaria/recepção ou local combinado. Se impossível, retornamos à fábrica e cobramos nova taxa.',
  },
  {
    q: 'Vocês entregam em apartamento?',
    a: 'Deixamos na portaria. Para entrega na unidade, combinamos previamente. Em prédios sem portaria, definimos ponto de encontro seguro.',
  },
  {
    q: 'Como saber se minha região é atendida?',
    a: 'Consulte a tabela abaixo. Regiões não listadas: entre em contato pelo WhatsApp para verificarmos viabilidade.',
  },
  {
    q: 'O gelo vem em caixas térmicas?',
    a: 'Sim! Todos os pedidos vão em caixas térmicas lacradas. Para gelo seco, usamos caixas de isopor certificadas.',
  },
];

export default function DeliveryPage() {
  const [cep, setCep] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ available: boolean; time: string; zone: string; message: string } | null>(null);

  const checkCep = async () => {
    if (!cep || cep.length < 8) return;
    setChecking(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 1500));

    const coverage = coverageAreas.find(c => c.city.toLowerCase().includes('mauá') || c.city.toLowerCase().includes('santo andré'));
    setResult({
      available: true,
      time: coverage?.time || 'Até 2h',
      zone: coverage?.zone || 'Zona 1',
      message: 'Sua região é atendida! Tempo estimado baseado no endereço da fábrica.',
    });
    setChecking(false);
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
              <Truck className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Logística Própria
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Entrega Rápida e <span className="text-ice-600 dark:text-ice-400">Segura</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Frota refrigerada própria, rastreamento GPS em tempo real e cobertura
              em todo ABC e Grande São Paulo. Seu gelo chega perfeito.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEP Checker */}
      <section className="py-8 lg:py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <Card className="border-ice-200 dark:border-ice-800">
              <CardContent className="p-6 sm:p-8 text-center">
                <MapPinIcon className="h-12 w-12 text-ice-600 dark:text-ice-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verifique sua Entrega</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Digite seu CEP e veja tempo e custo</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2'))}
                    maxLength={9}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ice-500"
                  />
                  <Button onClick={checkCep} disabled={checking || cep.length < 9} className="whitespace-nowrap">
                    {checking ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Consultar'}
                  </Button>
                </div>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-lg text-left"
                    style={{ backgroundColor: result.available ? 'rgb(34 197 94 / 0.1)' : 'rgb(239 68 68 / 0.1)', borderColor: result.available ? 'rgb(34 197 94 / 0.3)' : 'rgb(239 68 68 / 0.3)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.available ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                      <span className="font-semibold" style={{ color: result.available ? 'rgb(22 163 74)' : 'rgb(220 38 38)' }}>
                        {result.available ? 'Região Atendida' : 'Fora de Cobertura'}
                      </span>
                    </div>
                    {result.available && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Tempo estimado:</span>
                          <p className="font-medium">{result.time}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Zona:</span>
                          <p className="font-medium">{result.zone}</p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm mt-2" style={{ color: result.available ? 'rgb(22 163 74)' : 'rgb(220 38 38)' }}>{result.message}</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Escolha sua <span className="text-ice-600 dark:text-ice-400">Modalidade</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Quatro opções para atender sua necessidade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryOptions.map((option, i) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-all relative overflow-hidden">
                  {option.badge && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white z-10">{option.badge}</Badge>
                  )}
                  <CardContent className="p-6">
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4', option.bgColor)}>
                      <option.icon className={cn('h-7 w-7', option.color)} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{option.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
                      {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2).replace('.', ',')}`}
                    </div>
                    <ul className="space-y-2">
                      {option.features.map((feature, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Como Funciona a <span className="text-ice-600 dark:text-ice-400">Entrega</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Processo transparente do pedido à porta da sua casa/empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-7 w-7 text-ice-600 dark:text-ice-400" />
                    </div>
                    <div className="text-3xl font-bold text-ice-600 dark:text-ice-400 mb-2">{step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Área de <span className="text-ice-600 dark:text-ice-400">Cobertura</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Atendemos todo o ABC Paulista e Grande São Paulo
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-semibold text-gray-900 dark:text-white">Cidade/Região</th>
                  <th className="pb-3 font-semibold text-gray-900 dark:text-white">Tempo Estimado</th>
                  <th className="pb-3 font-semibold text-gray-900 dark:text-white">Zona</th>
                  <th className="pb-3 font-semibold text-gray-900 dark:text-white">Taxa Padrão</th>
                </tr>
              </thead>
              <tbody>
                {coverageAreas.map((area, i) => (
                  <tr key={area.city} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 font-medium text-gray-900 dark:text-white">{area.city}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{area.time}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={cn(
                        area.zone === 'Base' && 'bg-ice-100 text-ice-700',
                        area.zone === 'Zona 1' && 'bg-emerald-100 text-emerald-700',
                        area.zone === 'Zona 2' && 'bg-amber-100 text-amber-700',
                        area.zone === 'Zona 3' && 'bg-red-100 text-red-700',
                        area.zone === 'Sob consulta' && 'bg-gray-100 text-gray-700'
                      )}>
                        {area.zone}
                      </Badge>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      {area.zone === 'Base' ? 'Grátis' : area.zone === 'Zona 1' ? 'R$ 15,00' : area.zone === 'Zona 2' ? 'R$ 20,00' : area.zone === 'Zona 3' ? 'R$ 30,00' : 'Consulte'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            * Tempos estimados para entrega padrão. Expressa reduz em ~50%. Valores sujeitos a alteração.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Dúvidas sobre <span className="text-ice-600 dark:text-ice-400">Entrega</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Nossa <span className="text-ice-600 dark:text-ice-400">Garantia</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Gelo Perfeito', desc: 'Chega íntegro, na temperatura ideal. Se não, trocamos na hora.' },
              { icon: Clock, title: 'Prazo Garantido', desc: '99,9% das entregas no prazo. Atraso? Desconto na próxima.' },
              { icon: Smartphone, title: 'Suporte Real', desc: 'WhatsApp direto com a central. Resposta em minutos.' },
            ].map((guar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-2xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-4">
                      <guar.icon className="h-8 w-8 text-ice-600 dark:text-ice-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{guar.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{guar.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Pronto para pedir?
            </h2>
            <p className="text-ice-100 text-lg mb-8 max-w-2xl mx-auto">
              Escolha seus produtos, defina a entrega e receba gelo de qualidade
              na porta do seu negócio ou casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/pedido/novo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-ice-600 hover:bg-ice-50 text-lg px-8 py-3">
                  <Truck className="h-5 w-5 mr-2" />
                  Fazer Pedido
                </Button>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                <MessageCircle className="h-6 w-6" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left flex items-center justify-between gap-4"
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">{question}</span>
        <span className={cn('transition-transform', open && 'rotate-180')}>
          <ChevronRight className="h-5 w-5 text-ice-600 dark:text-ice-400" />
        </span>
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0')}>
        <CardContent className="pb-4 px-4 text-gray-600 dark:text-gray-400">{answer}</CardContent>
      </div>
    </Card>
  );
}