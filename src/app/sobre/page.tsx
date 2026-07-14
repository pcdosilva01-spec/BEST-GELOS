'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Factory, Award, Truck, Shield, Leaf, Users,
  Clock, CheckCircle, Zap, Droplet, Snowflake,
  Building2, Heart, Target, Globe, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '15+', label: 'Anos de Experiência', icon: Award, bgColor: 'bg-ice-100 dark:bg-ice-900/30' },
  { value: '50k+', label: 'Clientes Atendidos', icon: Users, bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { value: '100t+', label: 'Gelo Produzido/Mês', icon: Snowflake, bgColor: 'bg-red-100 dark:bg-red-900/30' },
  { value: '99.9%', label: 'Satisfação', icon: Heart, bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
];

const values = [
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    desc: 'Água purificada por osmose reversa, certificada pela ANVISA. Cada lote passa por rigoroso controle de qualidade.',
    color: 'text-ice-600 dark:text-ice-400',
    bgColor: 'bg-ice-100 dark:bg-ice-900/30',
  },
  {
    icon: Factory,
    title: 'Fábrica Própria',
    desc: 'Produção 100% própria com equipamentos de última geração. Controle total do processo, da água ao produto final.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    icon: Truck,
    title: 'Logística Própria',
    desc: 'Frota própria refrigerada para garantir que o gelo chegue perfeito. Entrega em até 2h na Grande SP.',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: Leaf,
    title: 'Sustentabilidade',
    desc: 'Embalagens recicláveis, reaproveitamento de água e energia solar na fábrica. Compromisso com o meio ambiente.',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
];

const milestones = [
  { year: '2009', title: 'Fundação', desc: 'Início das atividades em Mauá/SP com produção artesanal de gelo em cubos.' },
  { year: '2012', title: 'Expansão', desc: 'Aquisição de primeira máquina industrial. Início de entregas para bares e restaurantes.' },
  { year: '2015', title: 'Certificação ANVISA', desc: 'Conquista da certificação sanitária. Lançamento do gelo triturado.' },
  { year: '2018', title: 'Nova Fábrica', desc: 'Mudança para instalação de 2.000m². Capacidade de 100 toneladas/mês.' },
  { year: '2020', title: 'Gelo Seco', desc: 'Lançamento da linha de gelo seco (CO₂ sólido) para eventos e indústria.' },
  { year: '2022', title: 'Digitalização', desc: 'Lançamento do e-commerce e app. Entrega agendada e rastreamento em tempo real.' },
  { year: '2024', title: 'Líder Regional', desc: 'Referência no ABC e Grande SP. 50.000+ clientes. Expansão para gelo personalizado.' },
];

const team = [
  { name: 'Roberto Silva', role: 'Fundador & CEO', desc: '20+ anos no setor de refrigeração', icon: Building2 },
  { name: 'Mariana Costa', role: 'Diretora Operacional', desc: 'Engenheira de Alimentos, qualidade total', icon: Award },
  { name: 'Carlos Mendes', role: 'Gerente de Logística', desc: 'Especialista em cadeia fria e distribuição', icon: Truck },
  { name: 'Ana Paula', role: 'Atendimento & Vendas', desc: 'Relacionamento com clientes B2B e B2C', icon: Users },
];

const certifications = [
  { name: 'ANVISA', desc: 'Certificação de Boas Práticas de Fabricação', icon: Shield },
  { name: 'ISO 9001', desc: 'Sistema de Gestão da Qualidade (em processo)', icon: Award },
  { name: 'CRQ-SP', desc: 'Registro no Conselho Regional de Química', icon: CheckCircle },
  { name: 'CETESB', desc: 'Licença Ambiental de Operação', icon: Leaf },
];

export default function AboutPage() {
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
              <Snowflake className="mr-2 h-4 w-4 text-ice-600 dark:text-ice-400" />
              Conheça Nossa História
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
              Mais de 15 Anos <br />
              <span className="text-ice-600 dark:text-ice-400">Produzindo Qualidade</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Somos a maior fábrica de gelo do ABC Paulista. Água purificada, tecnologia de ponta
              e compromisso com a excelência em cada cubo que produzimos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  stat.bgColor || 'bg-ice-100 dark:bg-ice-900/30'
                )}>
                  <stat.icon className="h-8 w-8 text-ice-600 dark:text-ice-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-space-grotesk">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Nossos <span className="text-ice-600 dark:text-ice-400">Pilares</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              O que nos move e garante a melhor experiência para você
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                  <CardContent className="p-6">
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4', value.bgColor)}>
                      <value.icon className={cn('h-7 w-7', value.color)} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Nossa <span className="text-ice-600 dark:text-ice-400">História</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              De uma pequena produção artesanal à líder regional
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ice-200 to-ice-400 dark:from-ice-800 dark:to-ice-600" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 top-2">
                    <div className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 z-10',
                      i % 2 === 0 ? 'bg-ice-600' : 'bg-red-600'
                    )}>
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <Card className="border-ice-200 dark:border-ice-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Nossa <span className="text-ice-600 dark:text-ice-400">Equipe</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Pessoas apaixonadas pelo que fazem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-ice-200 dark:border-ice-800 text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-2xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-4">
                      <member.icon className="h-10 w-10 text-ice-600 dark:text-ice-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-ice-600 dark:text-ice-400 text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Certificações & <span className="text-ice-600 dark:text-ice-400">Qualidade</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Compromisso com os mais altos padrões do mercado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-ice-200 dark:border-ice-800 hover:border-ice-300 dark:hover:border-ice-700 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mx-auto mb-4">
                      <cert.icon className="h-7 w-7 text-ice-600 dark:text-ice-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-space-grotesk">
              Processo de <span className="text-ice-600 dark:text-ice-400">Produção</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Cada etapa pensada para garantir pureza e qualidade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: Droplet, title: 'Captação e Tratamento', desc: 'Água de poço artesiano passa por osmose reversa, filtração por carvão ativado e tratamento UV.', color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
              { step: 2, icon: Snowflake, title: 'Congelamento Controlado', desc: 'Máquinas de placa com controle digital de temperatura. Cubos cristalinos formados em ciclos de 20-30 min.', color: 'bg-ice-100 dark:bg-ice-900/30', iconColor: 'text-ice-600 dark:text-ice-400' },
              { step: 3, icon: Zap, title: 'Corte e Classificação', desc: 'Separadores automáticos removem impurezas. Cubos perfeitos são selecionados por tamanho e pureza.', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
              { step: 4, icon: Shield, title: 'Embalagem Higiênica', desc: 'Selagem automática em sacos plásticos alimentícios. Rastreabilidade por lote com data e hora.', color: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400' },
              { step: 5, icon: Factory, title: 'Armazenamento Refrigerado', desc: 'Câmaras frias a -18°C. Controle de temperatura 24h com monitoramento remoto.', color: 'bg-frost-100 dark:bg-frost-900/30', iconColor: 'text-frost-600 dark:text-frost-400' },
              { step: 6, icon: Truck, title: 'Distribuição Própria', desc: 'Frota refrigerada própria. Entrega com termômetro de verificação. Rastreamento GPS em tempo real.', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
            ].map((process, i) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-4 flex items-center justify-center z-10">
                    <span className="text-ice-600 dark:text-ice-400 font-bold text-lg">{process.step}</span>
                  </div>
                  <div className={cn('pt-14 text-center', process.color, 'rounded-2xl p-6 min-h-[280px] flex flex-col')}>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-white/50 dark:bg-gray-800/50">
                      <process.icon className={cn('h-8 w-8', process.iconColor)} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{process.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">{process.desc}</p>
                  </div>
                </div>
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
              Quer conhecer nossa fábrica?
            </h2>
            <p className="text-ice-100 text-lg mb-8 max-w-2xl mx-auto">
              Agende uma visita técnica e veja de perto nosso processo de produção.
              Ideal para parceiros B2B, arquitetos e responsáveis por compras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-ice-600 hover:bg-ice-50 text-lg px-8 py-3">
                  <Factory className="h-5 w-5 mr-2" />
                  Agendar Visita
                </Button>
              </Link>
              <Link href="/b2b">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                  <Building2 className="h-5 w-5 mr-2" />
                  Parceria B2B
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}