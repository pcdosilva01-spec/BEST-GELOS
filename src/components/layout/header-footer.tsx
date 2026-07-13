'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Ice, Truck, Shield, Star, MapPin, Phone, Mail, Facebook, Instagram, Whatsapp } from 'lucide-react';
import { useState } from 'react';
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
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
  ],
  contato: [
    { name: 'Rua Bras Cubas, 624', href: '#' },
    { name: 'Vila Bocaina - Mauá/SP', href: '#' },
    { name: 'CEP: 09310-730', href: '#' },
  ],
};

const socialLinks = [
  { name: 'WhatsApp', icon: Whatsapp, href: 'https://wa.me/5511999999999' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/bestgelo' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/bestgelo' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-glass border-b border-frost-200 shadow-glass'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Best Gelo - Página inicial">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-ice-500 to-ice-700 flex items-center justify-center shadow-ice">
                <Ice className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-frost-900 hidden sm:block">
              Best Gelo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-frost-600 hover:text-ice-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-ice-500 after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
            <div className="hidden md:flex items-center gap-2 ml-4 border-l border-frost-200 pl-4">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm px-4 py-2"
              >
                <Whatsapp className="w-4 h-4" aria-hidden="true" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-frost-600 hover:bg-frost-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-menu"
          className="md:hidden overflow-hidden border-t border-frost-200 bg-white/95 backdrop-blur-glass"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="py-4 px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-frost-600 font-medium hover:bg-ice-50 hover:text-ice-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-frost-200">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                <Whatsapp className="w-5 h-5" aria-hidden="true" />
                <span>Pedir pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-frost-900 text-frost-300">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="Best Gelo - Página inicial">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-500 to-ice-700 flex items-center justify-center">
                <Ice className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-2xl text-white">Best Gelo</span>
            </Link>
            <p className="text-frost-400 text-base leading-relaxed max-w-xs">
              Fábrica de gelo em Mauá/SP. Gelo de qualidade para eventos, bares, restaurantes e consumidor final.
              Entrega rápida e atendimento profissional.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-frost-800 flex items-center justify-center text-frost-400 hover:bg-ice-600 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-frost-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-frost-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Contato</h3>
            <address className="not-italic space-y-3 text-frost-400 text-sm">
              {footerLinks.contato.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-ice-400" aria-hidden="true" />
                  <span>{item.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-ice-400" aria-hidden="true" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">(11) 99999-9999</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-ice-400" aria-hidden="true" />
                <a href="mailto:contato@bestgelo.com.br" className="hover:text-white transition-colors">contato@bestgelo.com.br</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-frost-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-frost-500 text-sm">
              © {new Date().getFullYear()} Best Gelo Comércio de Gelo LTDA. Todos os direitos reservados.
              <br />
              CNPJ: 46.613.186/0001-86
            </p>
            <div className="flex items-center gap-4 text-sm text-frost-500">
              <span>Desenvolvido com</span>
              <span className="text-rose-500">❤️</span>
              <span>para o setor de gelo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}