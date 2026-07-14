'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn, formatPhoneNumber } from '@/lib/utils';
import {
  Building2, Users, Truck, CreditCard, FileText, Clock,
  Snowflake, Tag, Shield, CheckCircle, ArrowRight,
  MessageCircle, Phone, Mail, Target, BarChart, Package,
  Sparkles, Crown, Zap, Leaf, Warehouse, AlertCircle, Loader2
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const b2bBenefits = [
  {
    icon: Tag,
    title: 'Preços Exclusivos',
    desc: 'Até 30% de desconto sobre varejo. Tabelas progressivas por volume mensal.',
    highlight: 'Economia real',
  },
  {
    icon: CreditCard,
    title: 'Faturamento Flexível',
    desc: 'Pagamento a prazo: 15, 30 ou 45 dias. Análise de crédito rápida e sem burocracia.',
    highlight: 'Fluxo de caixa',
  },
  {
    icon: Truck,
    title: 'Entrega Programada',
    desc: 'Rota fixa semanal, quinzenal ou mensal. Prioridade em feriados e alta temporada.',
    highlight: 'Sem rupturas',
  },
  {
    icon: Building2,
    title: 'Gerente de Conta',
    desc: 'Atendimento dedicado via WhatsApp, telefone e e-mail. Acompanhamento de consumo.',
    highlight: 'Suporte VIP',
  },
  {
    icon: Snowflake,
    title: 'Gelo Personalizado',
    desc: 'Sua marca no gelo: logotipo, cores e formatos exclusivos. Diferencial para seu negócio.',
    highlight: 'Branding',
  },
  {
    icon: BarChart,
    title: 'Relatórios Mensais',
    desc: 'Consumo por produto, sazonalidade, previsão de demanda. Dados para sua gestão.',
    highlight: 'Inteligência',
  },
];

const targetSegments = [
  { icon: Users, title: 'Bares e Restaurantes', desc: 'Gelo para drinks, resfriamento de bebidas e alimentos. Entrega diária.', volume: 'Alto' },
  { icon: Building2, title: 'Hotéis e Pousadas', desc: 'Suprimento contínuo para quartos, bares, eventos e cozinha.', volume: 'Médio/Alto' },
  { icon: Sparkles, title: 'Eventos e Buffets', desc: 'Grandes volumes para casamentos, formaturas, feiras, shows. Logística dedicada.', volume: 'Sazonal/Alto' },
  { icon: Warehouse, title: 'Indústrias', desc: 'Gelo seco para transporte, resfriamento de processos, limpeza criogênica.', volume: 'Médio' },
  { icon: Leaf, title: 'Supermercados', desc: 'Gelo em cubos e triturado para revenda. Reposição automática.', volume: 'Alto' },
  { icon: Crown, title: 'Clubes e Academias', desc: 'Gelo para bebidas, recuperação muscular, bares internos.', volume: 'Médio' },
];

const processSteps = [
  { step: 1, title: 'Cadastro', desc: 'Preencha o formulário com dados da empresa. Análise em até 2h úteis.', icon: FileText },
  { step: 2, title: 'Análise de Crédito', desc: 'Verificação cadastral e definição de limite. Aprovação na maioria dos casos.', icon: Shield },
  { step: 3, title: 'Ativação', desc: 'Acesso ao portal B2B, tabela de preços e agendamento da primeira entrega.', icon: CheckCircle },
  { step: 4, title: 'Parceria Ativa', desc: 'Entregas programadas, suporte dedicado e revisão trimestral de condições.', icon: Users },
];

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{
    companyName: string;
    cnpj: string;
    contactName: string;
    email: string;
    phone: string;
    segment: string;
    monthlyVolume: string;
    currentSupplier: string;
    interest: string[];
    message: string;
    newsletter: boolean;
  }>();

  const interestOptions = [
    { value: 'cubos', label: 'Gelo em Cubos' },
    { value: 'crushed', label: 'Gelo Triturado' },
    { value: 'dry_ice', label: 'Gelo Seco' },
    { value: 'custom', label: 'Gelo Personalizado (Marca)' },
    { value: 'all', label: 'Linha Completa' },
  ];

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        setFormError('Erro ao enviar cadastro. Tente novamente.');
      }
    } catch {
      setFormError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Cadastro Recebido!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Obrigado pelo interesse em ser parceiro BEST Gelo.
            Nossa equipe comercial entrará em contato em até 2 horas úteis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Novo Cadastro
            </Button>
            <Button onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-ice-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 lg:py-32">
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
              <Building2 className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Programa de Parcerias B2B
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Gelo de Qualidade <br />
              <span className="text-ice-600 dark:text-ice-400">para seu Negócio</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Condições especiais para atacado: preços progressivos, faturamento flexível,
              entrega programada e suporte dedicado. Junte-se a 500+ empresas parceiras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-red-600 hover:bg-red-700 text-lg px-8 py-3" asChild>
                <a href="#cadastro">
                  <ArrowRight className="h-5 w-5" />
                  Quero Ser Parceiro
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-3" asChild>
                <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20parceria%20B2B." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatItem value="500+" label="Empresas Parceiras" icon={Building2} />
            <StatItem value="30%" label="Desconto Máximo" icon={Tag} />
            <StatItem value="45 dias" label="Prazo de Pagamento" icon={CreditCard} />
            <StatItem value="99.9%" label="Entrega no Prazo" icon={Truck} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Vantagens de ser <span className="text-ice-600 dark:text-ice-400">Parceiro BEST</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Mais que um fornecedor, um parceiro para o crescimento do seu negócio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {b2bBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    </div>
                    <Badge variant="secondary" className="mb-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                      {benefit.highlight}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Atendemos <span className="text-ice-600 dark:text-ice-400">Diversos Segmentos</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Soluções sob medida para cada tipo de negócio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetSegments.map((segment, i) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                        <segment.icon className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        Volume: {segment.volume}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{segment.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{segment.desc}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#cadastro">Solicitar Orçamento</a>
                    </Button>
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
              Como <span className="text-ice-600 dark:text-ice-400">Funciona</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Processo simples e rápido. Em 24h você já pode estar recebendo.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ice-200 to-ice-400 dark:from-ice-800 dark:to-ice-600 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8 md:space-y-12">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex md:flex-row"
                >
                  <div className="absolute left-1/2 top-4 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-4 flex items-center justify-center z-10 -translate-x-1/2 md:order-1">
                    <span className="text-ice-600 dark:text-ice-400 font-bold text-xl">{step.step}</span>
                  </div>
                  <Card className="w-full md:w-1/2 md:pr-8 md:pl-0 md:order-2 border-ice-200 dark:border-ice-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-5 w-5 text-ice-600 dark:text-ice-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="cadastro" className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
                Faça seu <span className="text-ice-600 dark:text-ice-400">Cadastro</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Preencha o formulário e nossa equipe comercial entrará em contato
                em até 2 horas úteis para apresentar as melhores condições.
              </p>

              <div className="space-y-4">
                <ContactItem icon={Clock} title="Resposta Rápida" desc="Contato em até 2h úteis" />
                <ContactItem icon={Shield} title="Sem Compromisso" desc="Apenas análise cadastral" />
                <ContactItem icon={Zap} title="Ativação Imediata" desc="Primeira entrega em 48h" />
                <ContactItem icon={Leaf} title="Sustentável" desc="Embalagens recicláveis" />
              </div>

              <div className="mt-8 p-4 bg-ice-50 dark:bg-ice-900/20 border border-ice-200 dark:border-ice-800 rounded-xl">
                <h4 className="font-semibold text-ice-900 dark:text-ice-100 mb-2 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Prefere WhatsApp?
                </h4>
                <p className="text-ice-700 dark:text-ice-300 text-sm">
                  Mande uma mensagem para <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="underline">(11) 99999-9999</a> com "B2B" e seus dados.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-ice-200 dark:border-ice-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Cadastro de Pessoa Jurídica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="companyName">Razão Social *</Label>
                        <Input
                          id="companyName"
                          {...register('companyName', { required: 'Razão social é obrigatória' })}
                          placeholder="Empresa LTDA"
                          error={!!errors.companyName}
                        />
                        {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cnpj">CNPJ *</Label>
                        <Input
                          id="cnpj"
                          {...register('cnpj', { required: 'CNPJ é obrigatório' })}
                          placeholder="00.000.000/0000-00"
                          error={!!errors.cnpj}
                          maxLength={18}
                        />
                        {errors.cnpj && <p className="text-sm text-red-500 mt-1">{errors.cnpj.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Nome do Contato *</Label>
                        <Input
                          id="contactName"
                          {...register('contactName', { required: 'Nome do contato é obrigatório' })}
                          placeholder="João da Silva"
                          error={!!errors.contactName}
                        />
                        {errors.contactName && <p className="text-sm text-red-500 mt-1">{errors.contactName.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail Corporativo *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: 'E-mail é obrigatório',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'E-mail inválido' },
                          })}
                          placeholder="joao@empresa.com.br"
                          error={!!errors.email}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone', { required: 'Telefone é obrigatório' })}
                          placeholder="(11) 99999-9999"
                          onChange={(e) => { e.target.value = formatPhoneNumber(e.target.value); }}
                          error={!!errors.phone}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="segment">Segmento *</Label>
                        <Select {...register('segment', { required: 'Selecione o segmento' })} onValueChange={() => {}}>
                          <SelectTrigger error={!!errors.segment}>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bares">Bares e Restaurantes</SelectItem>
                            <SelectItem value="hoteis">Hotéis e Pousadas</SelectItem>
                            <SelectItem value="eventos">Eventos e Buffets</SelectItem>
                            <SelectItem value="industrias">Indústrias</SelectItem>
                            <SelectItem value="supermercados">Supermercados e Varejo</SelectItem>
                            <SelectItem value="clubes">Clubes e Academias</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.segment && <p className="text-sm text-red-500 mt-1">{errors.segment.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthlyVolume">Volume Mensal Estimado (kg) *</Label>
                        <Select {...register('monthlyVolume', { required: 'Selecione o volume' })} onValueChange={() => {}}>
                          <SelectTrigger error={!!errors.monthlyVolume}>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ate-500">Até 500 kg</SelectItem>
                            <SelectItem value="500-1000">500 a 1.000 kg</SelectItem>
                            <SelectItem value="1000-3000">1.000 a 3.000 kg</SelectItem>
                            <SelectItem value="3000-5000">3.000 a 5.000 kg</SelectItem>
                            <SelectItem value="5000-10000">5.000 a 10.000 kg</SelectItem>
                            <SelectItem value="acima-10000">Acima de 10.000 kg</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.monthlyVolume && <p className="text-sm text-red-500 mt-1">{errors.monthlyVolume.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="currentSupplier">Fornecedor Atual</Label>
                        <Input
                          id="currentSupplier"
                          {...register('currentSupplier')}
                          placeholder="Nome do fornecedor atual (opcional)"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Produtos de Interesse *
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {interestOptions.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              value={opt.value}
                              {...register('interest')}
                              className="h-4 w-4 rounded border-gray-300 text-ice-600 focus:ring-ice-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.interest && <p className="text-sm text-red-500 mt-1">{errors.interest.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message">Observações</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Necessidades especiais, horários de entrega, local de entrega, etc."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        id="newsletter"
                        {...register('newsletter')}
                        label="Receber novidades e condições especiais"
                      />
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {formError}
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-5 w-5 mr-2" />
                          Enviar Cadastro
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Ao enviar, você concorda com nossa{' '}
                      <a href="/politica-privacidade" className="underline hover:text-ice-600 dark:hover:text-ice-400">
                        Política de Privacidade
                      </a>
                      {' '}e{' '}
                      <a href="/termos-uso" className="underline hover:text-ice-600 dark:hover:text-ice-400">
                        Termos de Uso
                      </a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
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
              Pronto para reduzir custos com gelo?
            </h2>
            <p className="text-ice-100 text-lg mb-8 max-w-2xl mx-auto">
              Mais de 500 empresas já confiam na BEST Gelo.
              Faça seu cadastro e descubra quanto pode economizar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-ice-600 hover:bg-ice-50 text-lg px-8 py-3" asChild>
                <a href="#cadastro">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Cadastrar Minha Empresa
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-3" asChild>
                <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20parceria%20B2B." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="p-4">
      <div className="w-12 h-12 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-3">
        <Icon className="h-6 w-6 text-ice-600 dark:text-ice-400" />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white font-space-grotesk">{value}</div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
    </div>
  );
}

function ContactItem({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <Icon className="h-5 w-5 text-ice-600 dark:text-ice-400 flex-shrink-0" />
      <div>
        <p className="font-medium text-sm text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}