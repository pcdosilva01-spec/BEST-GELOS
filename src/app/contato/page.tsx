import { Header, Footer } from '@/components/layout/header-footer';
import { MapPin, Phone, Mail, Clock, Truck, Shield, Star, MapPin as MapPinIcon } from 'lucide-react';

export default function ContatoPage() {
  const contactInfo = [
    { icon: MapPinIcon, title: 'Endereço', details: 'Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP - CEP: 09310-730' },
    { icon: Phone, title: 'Telefone', details: '(11) 99999-9999', href: 'tel:+5511999999999' },
    { icon: Mail, title: 'E-mail', details: 'contato@bestgelo.com.br', href: 'mailto:contato@bestgelo.com.br' },
    { icon: Clock, title: 'Horário de Atendimento', details: 'Segunda a Sábado: 7h às 20h | Domingos: 8h às 14h' },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-frost-900 tracking-tight mb-6">
                Fale <span className="text-ice-600">Conosco</span>
              </h1>
              <p className="text-lg sm:text-xl text-frost-600 leading-relaxed">
                Estamos prontos para atender seu pedido. Escolha a melhor forma de contato.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((item, index) => (
                <div key={index} className="card-glass p-6 text-center hover:shadow-ice-hover transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-ice-100 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-ice-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-frost-900 mb-2">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-frost-600 hover:text-ice-600 transition-colors">{item.details}</a>
                  ) : (
                    <p className="text-frost-600">{item.details}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="card-glass p-8">
                <h2 className="font-display font-semibold text-2xl text-frost-900 mb-6">Envie uma Mensagem</h2>
                <form className="space-y-6" action="https://formspree.io/f/xaybqwqz" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-frost-700 mb-2">Nome Completo</label>
                      <input type="text" id="nome" name="nome" required className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-frost-700 mb-2">E-mail</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-frost-700 mb-2">Telefone/WhatsApp</label>
                    <input type="tel" id="telefone" name="telefone" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="assunto" className="block text-sm font-medium text-frost-700 mb-2">Assunto</label>
                    <select id="assunto" name="assunto" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent">
                      <option value="">Selecione um assunto</option>
                      <option value="pedido">Fazer um Pedido</option>
                      <option value="orcamento">Solicitar Orçamento</option>
                      <option value="entrega">Dúvidas sobre Entrega</option>
                      <option value="atacado">Parceria/Atacado</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-frost-700 mb-2">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" rows={5} required className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="Descreva sua necessidade..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
                    Enviar Mensagem
                  </button>
                </form>
              </div>

              <div className="card-glass p-8">
                <h2 className="font-display font-semibold text-2xl text-frost-900 mb-6">Atendimento Rápido</h2>
                <div className="space-y-4">
                  <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20gelo."
                     target="_blank" rel="noopener noreferrer"
                     className="btn-whatsapp w-full justify-center text-lg py-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    WhatsApp: (11) 99999-9999
                  </a>
                  <div className="p-4 bg-frost-50 rounded-xl">
                    <h3 className="font-semibold text-frost-900 mb-2 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-ice-600" />
                      Entrega Rápida
                    </h3>
                    <p className="text-frost-600">Até 2h na Grande SP. Consulte taxa para sua região.</p>
                  </div>
                  <div className="p-4 bg-frost-50 rounded-xl">
                    <h3 className="font-semibold text-frost-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-ice-600" />
                      Qualidade Garantida
                    </h3>
                    <p className="text-frost-600">Água purificada, fábrica certificada, gelo cristalino.</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-display font-semibold text-xl text-frost-900 mb-4">Nossa Localização</h3>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-frost-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.447123456789!1d-46.461234!2d-23.681234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a1b2c3d4e5f%3A0x123456789abcdef!2sRua%20Bras%20Cubas%2C%20624%20-%20Vila%20Bocaina%2C%20Mau%C3%A1%20-%20SP%2C%2009310-730!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                      width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}