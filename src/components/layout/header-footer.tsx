'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, IceCream, Truck, Shield, Star, MapPin, Phone, Mail, Facebook, Instagram, MessageSquare, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Início', href: '#inicio' },
  { name: 'Produtos', href: '#produtos' },
  { name: 'Diferenciais', href: '#diferenciais' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Contato', href: '#contato' },
];

const footerLinks = {
  empresa: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Entrega', href: '/entrega' },
    { name: 'FAQ', href: '/faq' },
  ],
  suporte: [
    { name: 'Fale Conosco', href: '/contato' },
    { name: 'Política de Privacidade', href: '/politica-privacidade' },
    { name: 'Termos de Uso', href: '/termos-uso' },
  ],
  contato: [
    { name: 'Rua Bras Cubas, 624', href: '#' },
    { name: 'Vila Bocaina - Mauá/SP', href: '#' },
    { name: 'CEP: 09310-730', href: '#' },
  ],
};

const socialLinks = [
  { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/5511999999999' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/bestgelos' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/bestgelos' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-glass border-b border-frost-200 shadow-glass'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-3" aria-label="BEST GELOS - Página inicial">
            <div className="relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-ice shadow-ice">
              <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-white" aria-hidden="true" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-white" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-xl lg:text-2xl text-frost-900 dark:text-frost-100 tracking-tight">
              BEST GELOS
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-body text-frost-700 dark:text-frost-300 transition-colors hover:text-ice-600 dark:hover:text-ice-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-ice after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
            <Link href="#contato" className="hidden sm:block">
              <Button variant="default" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="#contato" className="p-2 rounded-lg text-frost-600 hover:bg-frost-100 dark:hover:bg-frost-800">
              <Phone className="w-5 h-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menu"
              className="text-frost-700 dark:text-frost-300"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      <motion.div
        className={cn(
          'fixed inset-0 z-40 lg:hidden bg-frost-900/80 backdrop-blur-sm',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <motion.aside
        className="fixed top-0 right-0 z-50 w-full lg:w-80 lg:max-w-xs h-full bg-white dark:bg-frost-950 shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex flex-col h-full p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <Link href="/" className="flex items-center gap-3" aria-label="BEST GELOS - Página inicial">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-ice shadow-ice">
                <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-xl text-frost-900 dark:text-frost-100">BEST GELOS</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="text-frost-600 dark:text-frost-400"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <nav className="flex-1" aria-label="Navegação móvel">
            <ul className="space-y-1" role="list">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl font-medium text-body-lg text-frost-700 dark:text-frost-300 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-frost-200 dark:border-frost-800">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-ice-light dark:bg-gradient-ice-dark">
              <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" aria-hidden="true" />
              <div>
                <p className="font-semibold text-frost-900 dark:text-frost-100 text-sm">Entrega Rápida</p>
                <p className="text-xs text-frost-600 dark:text-frost-400">Até 2h na Grande SP</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                WhatsApp: (11) 99999-9999
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-ice-500 text-ice-600 dark:text-ice-400 font-medium hover:bg-ice-50 dark:hover:bg-ice-900/20 transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Ligar: (11) 99999-9999
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl border border-frost-200 dark:border-frost-700 text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-800 hover:border-ice-500 hover:text-ice-600 dark:hover:text-ice-400 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-frost-950 text-frost-100 overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-ice-dark/50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" aria-hidden="true" />

      <div className="relative container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="BEST GELOS - Página inicial">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-ice shadow-ice">
                <Sparkles className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">BEST GELOS</span>
            </Link>
            <p className="text-frost-400 text-body leading-relaxed mb-6">
              Fábrica de gelo própria em Mauá/SP. Qualidade superior, entrega rápida e atendimento personalizado para eventos, bares, restaurantes e você.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-frost-800 text-frost-400 hover:border-ice-500 hover:text-ice-400 hover:bg-frost-800/50 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Links da empresa">
            <h3 className="font-display font-semibold text-lg text-white mb-4">Empresa</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-frost-400 hover:text-ice-400 transition-colors text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links de suporte">
            <h3 className="font-display font-semibold text-lg text-white mb-4">Suporte</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-frost-400 hover:text-ice-400 transition-colors text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">Contato</h3>
            <address className="not-italic text-frost-400 text-body leading-relaxed space-y-3">
              {footerLinks.contato.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-ice-400 mt-0.5" aria-hidden="true" />
                  <span>{item.name}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-frost-800">
                <Phone className="w-5 h-5 flex-shrink-0 text-ice-400 mt-0.5" aria-hidden="true" />
                <a href="tel:+5511999999999" className="hover:text-ice-400 transition-colors">(11) 99999-9999</a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-ice-400 mt-0.5" aria-hidden="true" />
                <a href="mailto:contato@bestgelos.com.br" className="hover:text-ice-400 transition-colors">contato@bestgelos.com.br</a>
              </div>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-frost-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-frost-500 text-body-sm text-center md:text-left">
              © {new Date().getFullYear()} BEST GELOS. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-body-sm text-frost-500">
              <Link href="/politica-privacidade" className="hover:text-ice-400 transition-colors">Política de Privacidade</Link>
              <Link href="/termos-uso" className="hover:text-ice-400 transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}