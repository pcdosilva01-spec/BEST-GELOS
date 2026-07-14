'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn, generateWhatsAppLink } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import {
  Snowflake, Mail, Lock, Eye, EyeOff, User, MessageCircle,
  ChevronRight, AlertCircle, CheckCircle, Loader2, Building2, UserCheck
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<'pf' | 'pj'>('pf');
  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    // PF fields
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
    // PJ fields
    companyName: '',
    tradeName: '',
    cnpj: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyPassword: '',
    companyConfirmPassword: '',
    // Common
    terms: false,
    marketing: false,
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d{0,4})$/, '$1-$2');
      }
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{0,4})$/, '$1-$2');
    }
    return value;
  };

  const validateStep1 = () => {
    if (accountType === 'pf') {
      if (!formData.name.trim()) return 'Nome completo é obrigatório';
      if (!formData.email.trim()) return 'E-mail é obrigatório';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'E-mail inválido';
      if (!formData.phone.trim()) return 'Telefone é obrigatório';
      if (!formData.cpf.trim()) return 'CPF é obrigatório';
      if (formData.cpf.replace(/\D/g, '').length !== 11) return 'CPF inválido';
    } else {
      if (!formData.companyName.trim()) return 'Razão social é obrigatória';
      if (!formData.tradeName.trim()) return 'Nome fantasia é obrigatório';
      if (!formData.cnpj.trim()) return 'CNPJ é obrigatório';
      if (formData.cnpj.replace(/\D/g, '').length !== 14) return 'CNPJ inválido';
      if (!formData.contactName.trim()) return 'Nome do contato é obrigatório';
      if (!formData.contactEmail.trim()) return 'E-mail do contato é obrigatório';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) return 'E-mail inválido';
      if (!formData.contactPhone.trim()) return 'Telefone do contato é obrigatório';
    }
    return null;
  };

  const validateStep2 = () => {
    const password = accountType === 'pf' ? formData.password : formData.companyPassword;
    const confirmPassword = accountType === 'pf' ? formData.confirmPassword : formData.companyConfirmPassword;

    if (!password) return 'Senha é obrigatória';
    if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
    if (!/[A-Z]/.test(password)) return 'Senha deve ter pelo menos uma letra maiúscula';
    if (!/[a-z]/.test(password)) return 'Senha deve ter pelo menos uma letra minúscula';
    if (!/[0-9]/.test(password)) return 'Senha deve ter pelo menos um número';
    if (!/[!@#$%^&*]/.test(password)) return 'Senha deve ter pelo menos um caractere especial';
    if (password !== confirmPassword) return 'As senhas não conferem';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const step1Error = validateStep1();
    if (step1Error) {
      setError(step1Error);
      setActiveStep(1);
      return;
    }

    const step2Error = validateStep2();
    if (step2Error) {
      setError(step2Error);
      setActiveStep(2);
      return;
    }

    if (!formData.terms) {
      setError('Você deve aceitar os Termos de Uso e a Política de Privacidade');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      login({
        id: Date.now().toString(),
        name: accountType === 'pf' ? formData.name : formData.contactName,
        email: accountType === 'pf' ? formData.email : formData.contactEmail,
        phone: accountType === 'pf' ? formData.phone : formData.contactPhone,
        document: accountType === 'pf' ? formData.cpf : formData.cnpj,
        isB2B: accountType === 'pj',
        userType: 'CUSTOMER',
      });

      router.push('/');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRegister = () => {
    const whatsappUrl = generateWhatsAppLink('Olá! Gostaria de me cadastrar como cliente da BEST Gelo.');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
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
            Crie sua conta e comece a pedir gelo com facilidade
          </p>
        </div>

        {/* Account Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <RadioGroup
            value={accountType}
            onValueChange={(value: string) => setAccountType(value as 'pf' | 'pj')}
            className="grid grid-cols-2 gap-4"
          >
            <RadioGroupItem value="pf" className={cn(
              'relative flex items-center justify-center p-4 rounded-xl border-2 transition-all',
              accountType === 'pf'
                ? 'border-ice-500 bg-ice-50 dark:bg-ice-900/30'
                : 'border-frost-200 dark:border-frost-700 hover:border-ice-300 dark:hover:border-ice-600'
            )}>
              <div className="flex flex-col items-center gap-2">
                <User className={cn('w-6 h-6', accountType === 'pf' ? 'text-ice-600 dark:text-ice-400' : 'text-gray-400')} />
                <span className={cn('font-medium text-sm', accountType === 'pf' ? 'text-ice-700 dark:text-ice-300' : 'text-gray-600 dark:text-gray-400')}>
                  Pessoa Física
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">CPF</span>
              </div>
            </RadioGroupItem>

            <RadioGroupItem value="pj" className={cn(
              'relative flex items-center justify-center p-4 rounded-xl border-2 transition-all',
              accountType === 'pj'
                ? 'border-ice-500 bg-ice-50 dark:bg-ice-900/30'
                : 'border-frost-200 dark:border-frost-700 hover:border-ice-300 dark:hover:border-ice-600'
            )}>
              <div className="flex flex-col items-center gap-2">
                <Building2 className={cn('w-6 h-6', accountType === 'pj' ? 'text-ice-600 dark:text-ice-400' : 'text-gray-400')} />
                <span className={cn('font-medium text-sm', accountType === 'pj' ? 'text-ice-700 dark:text-ice-300' : 'text-gray-600 dark:text-gray-400')}>
                  Pessoa Jurídica
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">CNPJ</span>
              </div>
            </RadioGroupItem>
          </RadioGroup>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                activeStep >= 1 ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                1
              </div>
              <div className={cn(
                'w-24 h-1 mx-2 transition-all',
                activeStep > 1 ? 'bg-ice-600' : 'bg-frost-200 dark:bg-frost-700'
              )} />
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                activeStep >= 2 ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                2
              </div>
              <div className={cn(
                'w-24 h-1 mx-2 transition-all',
                activeStep > 2 ? 'bg-ice-600' : 'bg-frost-200 dark:bg-frost-700'
              )} />
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                activeStep >= 3 ? 'bg-ice-600 text-white' : 'bg-frost-200 dark:bg-frost-700 text-frost-500'
              )}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-10 text-center">Dados</span>
            <span className="w-24 text-center">Senha</span>
            <span className="w-10 text-center">Confirma</span>
          </div>
        </motion.div>

        {/* Register Card */}
        <Card className="border-frost-200 dark:border-frost-700 shadow-xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              {activeStep === 1 && 'Dados Cadastrais'}
              {activeStep === 2 && 'Criar Senha'}
              {activeStep === 3 && 'Confirmação'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              {activeStep === 1 && 'Preencha suas informações pessoais ou da empresa'}
              {activeStep === 2 && 'Defina uma senha segura para sua conta'}
              {activeStep === 3 && 'Revise os termos e finalize seu cadastro'}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Step 1: Personal/Company Data */}
              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {accountType === 'pf' ? (
                      <>
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Completo *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="João da Silva"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-mail *
                          </Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              autoComplete="email"
                              placeholder="joao@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone/WhatsApp *
                          </Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="(11) 99999-9999"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                              className="pl-10"
                              required
                              maxLength={15}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cpf" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            CPF *
                          </Label>
                          <Input
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                            className="mt-1"
                            required
                            maxLength={14}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Razão Social *
                          </Label>
                          <Input
                            id="companyName"
                            type="text"
                            placeholder="Empresa LTDA"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="tradeName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Fantasia *
                          </Label>
                          <Input
                            id="tradeName"
                            type="text"
                            placeholder="Nome da Loja"
                            value={formData.tradeName}
                            onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            CNPJ *
                          </Label>
                          <Input
                            id="cnpj"
                            type="text"
                            placeholder="00.000.000/0000-00"
                            value={formData.cnpj}
                            onChange={(e) => setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })}
                            className="mt-1"
                            required
                            maxLength={18}
                          />
                        </div>

                        <div>
                          <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome do Contato *
                          </Label>
                          <Input
                            id="contactName"
                            type="text"
                            placeholder="João da Silva"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-mail do Contato *
                          </Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="contactEmail"
                              type="email"
                              autoComplete="email"
                              placeholder="contato@empresa.com"
                              value={formData.contactEmail}
                              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telefone do Contato *
                          </Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="contactPhone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="(11) 99999-9999"
                              value={formData.contactPhone}
                              onChange={(e) => setFormData({ ...formData, contactPhone: formatPhone(e.target.value) })}
                              className="pl-10"
                              required
                              maxLength={15}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex justify-end pt-4">
                      <Button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px]"
                      >
                        Continuar <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: Password */}
              <AnimatePresence mode="wait">
                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Senha *
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          value={accountType === 'pf' ? formData.password : formData.companyPassword}
                          onChange={(e) => setFormData({
                            ...formData,
                            [accountType === 'pf' ? 'password' : 'companyPassword']: e.target.value
                          })}
                          className="pl-10 pr-12"
                          required
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
                        Confirmar Senha *
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          value={accountType === 'pf' ? formData.confirmPassword : formData.companyConfirmPassword}
                          onChange={(e) => setFormData({
                            ...formData,
                            [accountType === 'pf' ? 'confirmPassword' : 'companyConfirmPassword']: e.target.value
                          })}
                          className="pl-10 pr-12"
                          required
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

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(1)}
                        size="lg"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        size="lg"
                        className="min-w-[200px]"
                      >
                        Continuar <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Terms & Submit */}
              <AnimatePresence mode="wait">
                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl border border-frost-200 dark:border-frost-700">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                        Resumo do Cadastro
                      </h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-500 dark:text-gray-400">Tipo de conta</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">
                            {accountType === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500 dark:text-gray-400">
                            {accountType === 'pf' ? 'Nome' : 'Empresa'}
                          </dt>
                          <dd className="font-medium text-gray-900 dark:text-white">
                            {accountType === 'pf' ? formData.name : formData.tradeName}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500 dark:text-gray-400">E-mail</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">
                            {accountType === 'pf' ? formData.email : formData.contactEmail}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500 dark:text-gray-400">Documento</dt>
                          <dd className="font-medium text-gray-900 dark:text-white font-mono text-xs">
                            {accountType === 'pf' ? formData.cpf : formData.cnpj}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-4">
                      <Label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={formData.terms}
                          onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                          required
                          className="data-[state=checked]:bg-ice-600 data-[state=checked]:border-ice-600 mt-0.5"
                        />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Eu li e concordo com os
                          <Link href="/termos-uso" className="text-ice-600 dark:text-ice-400 hover:underline ml-1">Termos de Uso</Link>
                          {' '}e a
                          <Link href="/politica-privacidade" className="text-ice-600 dark:text-ice-400 hover:underline ml-1">Política de Privacidade</Link>
                          <span className="text-red-500">*</span>
                        </div>
                      </Label>

                      <Label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={formData.marketing}
                          onCheckedChange={(checked) => setFormData({ ...formData, marketing: checked as boolean })}
                          className="data-[state=checked]:bg-ice-600 data-[state=checked]:border-ice-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Quero receber promoções e novidades por e-mail e WhatsApp
                        </span>
                      </Label>
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

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(2)}
                        size="lg"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="min-w-[200px]"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Criando conta...
                          </>
                        ) : (
                          'Criar Minha Conta'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </form>

          {/* WhatsApp Alternative */}
          <CardContent className="pt-6">
            <Separator className="mb-6" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              Prefere se cadastrar pelo WhatsApp?
            </p>
            <Button
              variant="whatsapp"
              onClick={handleWhatsAppRegister}
              className="w-full"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Cadastrar via WhatsApp
            </Button>
          </CardContent>

          {/* Login Link */}
          <CardContent className="pt-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Já tem conta?{' '}
              <Link href="/login" className="font-medium text-ice-600 dark:text-ice-400 hover:underline">
                Faça login
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Pedidos em 1 clique</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Rastreamento em tempo real</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-frost-200 dark:border-frost-700">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Histórico completo</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}