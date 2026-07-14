'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn, formatPhoneNumber } from '@/lib/utils';
import {
  MapPin, Phone, Mail, MessageCircle, Clock, Send,
  CheckCircle, AlertCircle, Loader2, MapPin as MapPinIcon,
  Building2, Factory, Truck, Coffee, UserCheck
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const contactReasons = [
  { value: 'orcamento', label: 'Solicitar Orçamento' },
  { value: 'pedido', label: 'Fazer Pedido' },
  { value: 'b2b', label: 'Parceria B2B / Atacado' },
  { value: 'personalizado', label: 'Gelo Personalizado' },
  { value: 'entrega', label: 'Dúvidas sobre Entrega' },
  { value: 'qualidade', label: 'Qualidade do Produto' },
  { value: 'outro', label: 'Outro Assunto' },
];

const faqs = [
  {
    q: 'Qual o horário de funcionamento?',
    a: 'Nossa fábrica funciona de segunda a sexta das 7h às 19h e aos sábados das 7h às 13h. Entregas podem ser agendadas fora desse horário.',
  },
  {
    q: 'Qual a área de entrega?',
    a: 'Atendemos toda a Grande São Paulo e região do ABC (Santo André, São Bernardo, São Caetano, Diadema, Mauá, Ribeirão Pires, Rio Grande da Serra). Consulte disponibilidade para outras regiões.',
  },
  {
    q: 'Qual o pedido mínimo?',
    a: 'Para entrega: 10kg (2 sacos de 5kg). Para retirada na fábrica: não há mínimo. Para gelo personalizado: consulte condições.',
  },
  {
    q: 'Como é feita a higienização do gelo?',
    a: 'Utilizamos água purificada por osmose reversa, filtrada e tratada com UV. Nossa fábrica segue normas da ANVISA e possui certificação de qualidade.',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    company: string;
    reason: string;
    message: string;
    newsletter: boolean;
    whatsapp: boolean;
  }>();

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        setFormError('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch {
      setFormError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = `Olá! Gostaria de entrar em contato:\n\nNome: ${''}\nE-mail: ${''}\nTelefone: ${''}\nEmpresa: ${''}\nAssunto: ${''}\n\nMensagem:\n${''}`;

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
            Mensagem Enviada!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Obrigado por entrar em contato. Nossa equipe responderá em breve.
            Enviamos uma cópia para seu e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Enviar Nova Mensagem
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
      {/* Hero Section */}
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ice-100 dark:bg-ice-900/30 text-ice-700 dark:text-ice-300 text-sm font-medium mb-6">
              <MessageCircle className="h-4 w-4" />
              Fale Conosco
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Como podemos <span className="text-ice-600 dark:text-ice-400">ajudar você</span> hoje?
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tire dúvidas, faça pedidos, solicite orçamentos ou torne-se parceiro.
              Nossa equipe está pronta para atender você.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Atendimento rápido e direto. Resposta em poucos minutos no horário comercial.
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    (11) 99999-9999
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-8 w-8 text-ice-600 dark:text-ice-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ligamos para você ou atenda nossa central. Seg-Sex 7h-19h | Sáb 7h-13h
                  </p>
                  <a
                    href="tel:+551133334444"
                    className="inline-flex items-center gap-2 text-ice-600 dark:text-ice-400 font-medium hover:text-ice-700 dark:hover:text-ice-300"
                  >
                    <Phone className="h-4 w-4" />
                    (11) 3333-4444
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">E-mail</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Para orçamentos formais, documentos e assuntos que precisam de registro.
                  </p>
                  <a
                    href="mailto:contato@bestgelo.com.br"
                    className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Mail className="h-4 w-4" />
                    contato@bestgelo.com.br
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-ice-200 dark:border-ice-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Envie sua Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          {...register('name', { required: 'Nome é obrigatório' })}
                          placeholder="João da Silva"
                          error={!!errors.name}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: 'E-mail é obrigatório',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'E-mail inválido',
                            },
                          })}
                          placeholder="joao@email.com"
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
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            e.target.value = formatted;
                          }}
                          error={!!errors.phone}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="company">Empresa (opcional)</Label>
                        <Input
                          id="company"
                          {...register('company')}
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Assunto *</Label>
                      <Select
                        {...register('reason', { required: 'Selecione um assunto' })}
                        onValueChange={(value) => {}}
                      >
                        <SelectTrigger error={!!errors.reason}>
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        {...register('message', {
                          required: 'Mensagem é obrigatória',
                          minLength: { value: 10, message: 'Mensagem muito curta (mín. 10 caracteres)' },
                        })}
                        placeholder="Descreva sua necessidade, quantidade desejada, prazo de entrega, etc."
                        rows={5}
                      />
                      {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        id="whatsapp"
                        {...register('whatsapp')}
                        label="Enviar cópia pelo WhatsApp"
                        description="Receba a confirmação no seu WhatsApp também"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        id="newsletter"
                        {...register('newsletter')}
                        label="Receber novidades e promoções"
                        description="Ocasionalmente enviamos ofertas especiais"
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
                          <Send className="h-5 w-5 mr-2" />
                          Enviar Mensagem
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

            {/* Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-ice-200 dark:border-ice-800 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Nossa Localização
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-ice-50 dark:bg-ice-900/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-800 flex items-center justify-center flex-shrink-0">
                        <Factory className="h-5 w-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Fábrica e Escritório</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Av. Industrial, 123 - Distrito Industrial<br />
                          Mauá - SP | CEP 09310-000
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem icon={Clock} title="Funcionamento" desc="Seg-Sex: 7h-19h<br />Sáb: 7h-13h" />
                    <InfoItem icon={Truck} title="Entregas" desc="Seg-Sex: 8h-18h<br />Sáb: 8h-12h" />
                    <InfoItem icon={Coffee} title="Retirada" desc="Seg-Sex: 7h-19h<br />Sáb: 7h-13h" />
                    <InfoItem icon={UserCheck} title="Atendimento" desc="WhatsApp: 24h<br />Telefone: Comercial" />
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Dúvidas Frequentes</h4>
                    <div className="space-y-3">
                      {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} />
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <a href="/faq">Ver todas as perguntas frequentes</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-space-grotesk">
              Prefere falar direto no WhatsApp?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Resposta rápida, atendimento humanizado e você já fica com o contato salvo.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              Abrir WhatsApp Agora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function InfoItem({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <Icon className="h-5 w-5 text-ice-600 dark:text-ice-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-sm text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 text-left flex items-center justify-between"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{question}</span>
        <span className={cn('transition-transform', open && 'rotate-180')}>
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="px-3 pb-3 text-sm text-gray-600 dark:text-gray-400">{answer}</div>
      </div>
    </div>
  );
}