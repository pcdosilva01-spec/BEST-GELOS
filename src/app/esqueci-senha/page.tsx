'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn, generateWhatsAppLink } from '@/lib/utils';
import {
  Snowflake, Mail, Lock, AlertCircle, CheckCircle, Loader2,
  MessageCircle, RotateCcw, ArrowLeft, Eye, EyeOff
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'sent' | 'reset'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!formData.email.trim()) {
      setError('E-mail é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('E-mail inválido');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real app, this would call an API to send reset email
      setStep('sent');
      setSuccess('Enviamos um código de recuperação para seu e-mail. Verifique sua caixa de entrada (e spam).');
    } catch {
      setError('Erro ao enviar e-mail. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.code.trim() || formData.code.length !== 6) {
      setError('Digite o código de 6 dígitos');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, verify code with API
      if (formData.code === '123456') { // Mock valid code
        setStep('reset');
      } else {
        setError('Código inválido ou expirado. Solicite um novo.');
      }
    } catch {
      setError('Erro ao verificar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.password) {
      setError('Nova senha é obrigatória');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Senha deve ter pelo menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError('Senha deve ter pelo menos uma letra maiúscula');
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError('Senha deve ter pelo menos uma letra minúscula');
      setIsLoading(false);
      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError('Senha deve ter pelo menos um número');
      setIsLoading(false);
      return;
    }

    if (!/[!@#$%^&*]/.test(formData.password)) {
      setError('Senha deve ter pelo menos um caractere especial (!@#$%^&*)');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real app, call API to reset password
      router.push('/login?reset=success');
    } catch {
      setError('Erro ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Novo código enviado! Verifique seu e-mail.');
    } catch {
      setError('Erro ao reenviar código.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppHelp = () => {
    const whatsappUrl = generateWhatsAppLink('Olá! Esqueci minha senha e preciso de ajuda para recuperar o acesso.');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const stepConfig = {
    request: { title: 'Recuperar Senha', desc: 'Digite seu e-mail para receber um código de recuperação', icon: Mail },
    sent: { title: 'Código Enviado', desc: 'Verifique seu e-mail e digite o código de 6 dígitos', icon: Lock },
    reset: { title: 'Nova Senha', desc: 'Defina sua nova senha de acesso', icon: Lock },
  };

  const currentStep = stepConfig[step];

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
        </div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                ['request', 'sent', 'reset'].indexOf(step) >= 0 ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                1
              </div>
              <div className={cn(
                'w-20 h-1 mx-2 transition-all',
                ['sent', 'reset'].indexOf(step) >= 0 ? 'bg-ice-600' : 'bg-frost-200 dark:bg-frost-700'
              )} />
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                ['sent', 'reset'].indexOf(step) >= 0 ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                2
              </div>
              <div className={cn(
                'w-20 h-1 mx-2 transition-all',
                step === 'reset' ? 'bg-ice-600' : 'bg-frost-200 dark:bg-frost-700'
              )} />
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                step === 'reset' ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-10 text-center">E-mail</span>
            <span className="w-20 text-center">Código</span>
            <span className="w-10 text-center">Senha</span>
          </div>
        </motion.div>

        {/* Card */}
        <Card className="border-frost-200 dark:border-frost-700 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ice-100 dark:bg-ice-900/30 mb-4">
              <currentStep.icon className="w-7 h-7 text-ice-600 dark:text-ice-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentStep.title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {currentStep.desc}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step: Request Reset */}
            <AnimatePresence mode="wait">
              {step === 'request' && (
                <motion.form
                  key="request"
                  onSubmit={handleRequestReset}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      E-mail cadastrado *
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
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

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
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Código de Recuperação'
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Step: Verify Code */}
            <AnimatePresence mode="wait">
              {step === 'sent' && (
                <motion.form
                  key="sent"
                  onSubmit={handleVerifyCode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl border border-frost-200 dark:border-frost-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Enviamos um código de 6 dígitos para <strong className="text-gray-900 dark:text-white">{formData.email}</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                      Verifique também a pasta de spam/lixo eletrônico
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Código de recuperação *
                    </Label>
                    <Input
                      id="code"
                      type="text"
                      autoComplete="one-time-code"
                      placeholder="1 2 3 4 5 6"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      className="mt-1 text-center text-2xl tracking-widest font-mono"
                      maxLength={6}
                      required
                      disabled={isLoading}
                    />
                  </div>

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
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        'Verificar Código'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reenviar
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setStep('request');
                      setFormData({ ...formData, code: '' });
                    }}
                    className="w-full mt-3 text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para digitar e-mail
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Step: Reset Password */}
            <AnimatePresence mode="wait">
              {step === 'reset' && (
                <motion.form
                  key="reset"
                  onSubmit={handleResetPassword}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nova Senha *
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-12"
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
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Mínimo 8 caracteres, com maiúscula, minúscula, número e caractere especial
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirmar Nova Senha *
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 pr-12"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

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

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Redefinindo...
                      </>
                    ) : (
                      'Redefinir Senha'
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setStep('sent');
                      setFormData({ ...formData, password: '', confirmPassword: '' });
                    }}
                    className="w-full mt-3 text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para código
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Help Section */}
            <div className="pt-4 border-t border-frost-200 dark:border-frost-700">
              <Separator className="mb-4" />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                Não recebeu o e-mail ou precisa de ajuda?
              </p>
              <Button
                variant="whatsapp"
                onClick={handleWhatsAppHelp}
                className="w-full"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar com Suporte no WhatsApp
              </Button>
            </div>

            {/* Back to Login */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Lembrou a senha?{' '}
              <Link href="/login" className="font-medium text-ice-600 dark:text-ice-400 hover:underline">
                Voltar para login
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-blue-800 dark:text-blue-200">
            <AlertCircle className="w-4 h-4" />
            <span>
              A BEST Gelo nunca solicita sua senha por e-mail, telefone ou WhatsApp.
              O código de recuperação é válido por 30 minutos e uso único.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}