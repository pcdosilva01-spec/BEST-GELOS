import { Header, Footer } from '@/components/layout/header-footer';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20 min-h-screen">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-frost-50 to-white">
          <div className="container-custom">
            <div className="max-w-md mx-auto">
              <div className="card-glass p-8">
                <div className="text-center mb-8">
                  <h1 className="font-display font-bold text-3xl text-frost-900">Entrar na conta</h1>
                  <p className="text-frost-600 mt-2">Acesse seu painel de pedidos</p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-frost-700 mb-2">E-mail</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="seu@email.com" required />
                  </div>

                  <div>
                    <label htmlFor="senha" className="block text-sm font-medium text-frost-700 mb-2">Senha</label>
                    <input type="password" id="senha" className="w-full px-4 py-3 rounded-xl border border-frost-200 bg-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent" placeholder="••••••••" required />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-frost-600 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-frost-300 text-ice-600 focus:ring-ice-500" />
                      Lembrar-me
                    </label>
                    <Link href="/recuperar-senha" className="text-sm text-ice-600 hover:text-ice-700 font-medium">Esqueci a senha</Link>
                  </div>

                  <button type="submit" className="w-full btn-primary py-3 text-lg font-semibold">
                    Entrar
                  </button>
                </form>

                <div className="mt-6 text-center text-frost-600">
                  <p>Não tem conta? <Link href="/cadastro" className="text-ice-600 font-medium hover:underline">Cadastre-se</Link></p>
                </div>

                <div className="mt-6 pt-6 border-t border-frost-200">
                  <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20sem%20criar%20conta."
                     target="_blank" rel="noopener noreferrer"
                     className="btn-whatsapp w-full justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    Pedir sem cadastro (WhatsApp)
                  </a>
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