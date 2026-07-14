'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn, generateWhatsAppLink } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import {
  Snowflake, Mail, Lock, Eye, EyeOff, User, MessageCircle,
  ChevronRight, AlertCircle, CheckCircle, Loader2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation
      if (!formData.email || !formData.password) {
        throw new Error('Preencha todos os campos');
      }

      if (formData.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Mock successful login
      login({
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        phone: '(11) 99999-9999',
        document: '123.456.789-00',
        isB2B: false,
        userType: 'CUSTOMER',
      });

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppLogin = () => {
    const whatsappUrl = generateWhatsAppLink('Olá! Gostaria de acessar minha conta na BEST Gelo.');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Snowflake className="w-12 h-12 text-ice-600 dark:text-ice-400" />
            <span className="font-space-grotesk font-bold text-3xl text-gray-900 dark:text-white">
              BEST<span className="text-red-600">Gelo</span>
            </span>
          </Link>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Acesse sua conta para fazer pedidos e acompanhar entregas
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-frost-200 dark:border-frost-700 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Entrar na conta</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Ou continue com WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* WhatsApp Login */}
            <Button
              variant="whatsapp"
              onClick={handleWhatsAppLogin}
              className="w-full"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Continuar com WhatsApp
            </Button>

            <div className="relative">
              <Separator className="mb-6" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-3 text-xs text-gray-500 dark:text-gray-400">
                ou use e-mail
              </span>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  E-mail
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 pr-4 py-3"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Senha
                  </Label>
                  <Link
                    href="/esqueci-senha"
                    className="text-sm text-ice-600 dark:text-ice-400 hover:underline"
                  >
                    Esqueci a senha
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-12 py-3"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                  <Checkbox
                    checked={formData.remember}
                    onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
                    className="data-[state=checked]:bg-ice-600 data-[state=checked]:border-ice-600"
                  />
                  Lembrar-me
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Não tem conta?{' '}
              <Link href="/cadastro" className="font-medium text-ice-600 dark:text-ice-400 hover:underline">
                Cadastre-se grátis
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Pedidos rápidos</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Rastreamento</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Histórico</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}