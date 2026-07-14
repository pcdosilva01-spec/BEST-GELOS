'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Truck,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Save,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface SettingsData {
  general: {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    companyCity: string;
    companyState: string;
    companyZipCode: string;
    cnpj: string;
    timezone: string;
    currency: string;
  };
  notifications: {
    emailNewOrder: boolean;
    emailOrderStatus: boolean;
    emailLowStock: boolean;
    emailDailyReport: boolean;
    smsNewOrder: boolean;
    smsDelivery: boolean;
    pushNewOrder: boolean;
    pushDelivery: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
  delivery: {
    defaultDeliveryFee: number;
    freeDeliveryThreshold: number;
    deliveryRadius: number;
    preparationTime: number;
    businessHours: {
      monday: { open: string; close: string; closed: boolean };
      tuesday: { open: string; close: string; closed: boolean };
      wednesday: { open: string; close: string; closed: boolean };
      thursday: { open: string; close: string; closed: boolean };
      friday: { open: string; close: string; closed: boolean };
      saturday: { open: string; close: string; closed: boolean };
      sunday: { open: string; close: string; closed: boolean };
    };
  };
  payment: {
    pixKey: string;
    pixKeyType: string;
    acceptCreditCard: boolean;
    acceptDebitCard: boolean;
    acceptCash: boolean;
    acceptBankTransfer: boolean;
    installmentMax: number;
    installmentInterestFree: number;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    passwordMinLength: number;
    requireSpecialChar: boolean;
    loginAttemptsLimit: number;
    lockoutDuration: number;
  };
}

const defaultSettings: SettingsData = {
  general: {
    companyName: 'Best Gelo',
    companyEmail: 'contato@bestgelo.com.br',
    companyPhone: '(11) 99999-9999',
    companyAddress: 'Rua Bras Cubas, 624',
    companyCity: 'Mauá',
    companyState: 'SP',
    companyZipCode: '09310-730',
    cnpj: '17.812.251/0001-73',
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
  },
  notifications: {
    emailNewOrder: true,
    emailOrderStatus: true,
    emailLowStock: true,
    emailDailyReport: false,
    smsNewOrder: false,
    smsDelivery: true,
    pushNewOrder: true,
    pushDelivery: true,
  },
  appearance: {
    theme: 'system',
    primaryColor: '#0ea5e9',
    secondaryColor: '#ef4444',
    logoUrl: '',
    faviconUrl: '',
  },
  delivery: {
    defaultDeliveryFee: 15.00,
    freeDeliveryThreshold: 200.00,
    deliveryRadius: 30,
    preparationTime: 60,
    businessHours: {
      monday: { open: '07:00', close: '19:00', closed: false },
      tuesday: { open: '07:00', close: '19:00', closed: false },
      wednesday: { open: '07:00', close: '19:00', closed: false },
      thursday: { open: '07:00', close: '19:00', closed: false },
      friday: { open: '07:00', close: '19:00', closed: false },
      saturday: { open: '07:00', close: '13:00', closed: false },
      sunday: { open: '08:00', close: '12:00', closed: true },
    },
  },
  payment: {
    pixKey: 'contato@bestgelo.com.br',
    pixKeyType: 'email',
    acceptCreditCard: true,
    acceptDebitCard: true,
    acceptCash: true,
    acceptBankTransfer: true,
    installmentMax: 12,
    installmentInterestFree: 3,
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 60,
    passwordMinLength: 8,
    requireSpecialChar: true,
    loginAttemptsLimit: 5,
    lockoutDuration: 30,
  },
};

const daysOfWeek = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

export default function AdminSettingsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadSettings();
    }
  }, [isAuthenticated, authLoading]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from API
      // const data = await api.adminGetSettings();
      // setSettings(data);
    } catch (err) {
      console.error('Load settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: keyof SettingsData) => {
    try {
      setSaving(true);
      setSaveStatus('saving');
      // await api.adminUpdateSettings({ [section]: settings[section] });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Save settings error:', err);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = <K extends keyof SettingsData, F extends keyof SettingsData[K]>(
    section: K,
    field: F,
    value: SettingsData[K][F]
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBusinessHoursChange = (day: string, field: 'open' | 'close' | 'closed', value: any) => {
    setSettings(prev => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        businessHours: {
          ...prev.delivery.businessHours,
          [day]: {
            ...prev.delivery.businessHours[day as keyof typeof prev.delivery.businessHours],
            [field]: value,
          },
        },
      },
    }));
  };

  if (!isAuthenticated || authLoading) {
    return (
      <AdminLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-ice-500" aria-hidden="true" />
        </div>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-ice-500" aria-hidden="true" />
        </div>
      </AdminLayout>
    );
  }

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'delivery', label: 'Entrega', icon: Truck },
    { id: 'payment', label: 'Pagamentos', icon: CreditCard },
    { id: 'security', label: 'Segurança', icon: Shield },
  ];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="heading-page font-bold text-frost-900 dark:text-white">Configurações</h1>
            <p className="text-frost-500 dark:text-frost-400 mt-1">
              Gerencie as configurações do sistema
            </p>
          </div>
          <Button onClick={() => handleSave(activeTab as keyof SettingsData)} disabled={saving}>
            <Save className="w-4 h-4 mr-2" aria-hidden="true" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>

        {/* Save Status Toast */}
        {saveStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
            <span className="text-green-800 dark:text-green-200 font-medium">Configurações salvas com sucesso!</span>
          </motion.div>
        )}

        {saveStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <span className="text-red-800 dark:text-red-200 font-medium">Erro ao salvar configurações</span>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1 p-1 bg-frost-100 dark:bg-frost-800 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 text-sm py-2.5">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" aria-hidden="true" />
                  Informações Gerais
                </CardTitle>
                <CardDescription>
                  Configurações básicas da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <Input
                      id="companyName"
                      value={settings.general.companyName}
                      onChange={(e) => updateSetting('general', 'companyName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={settings.general.cnpj}
                      onChange={(e) => updateSetting('general', 'cnpj', e.target.value)}
                      className="mt-1"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email *</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.general.companyEmail}
                      onChange={(e) => updateSetting('general', 'companyEmail', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Telefone *</Label>
                    <Input
                      id="companyPhone"
                      value={settings.general.companyPhone}
                      onChange={(e) => updateSetting('general', 'companyPhone', e.target.value)}
                      className="mt-1"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="companyAddress">Endereço *</Label>
                    <Input
                      id="companyAddress"
                      value={settings.general.companyAddress}
                      onChange={(e) => updateSetting('general', 'companyAddress', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyCity">Cidade *</Label>
                    <Input
                      id="companyCity"
                      value={settings.general.companyCity}
                      onChange={(e) => updateSetting('general', 'companyCity', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyState">Estado *</Label>
                    <Input
                      id="companyState"
                      value={settings.general.companyState}
                      onChange={(e) => updateSetting('general', 'companyState', e.target.value)}
                      className="mt-1"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyZipCode">CEP *</Label>
                    <Input
                      id="companyZipCode"
                      value={settings.general.companyZipCode}
                      onChange={(e) => updateSetting('general', 'companyZipCode', e.target.value)}
                      className="mt-1"
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select
                      id="timezone"
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent"
                    >
                      <option value="America/Sao_Paulo">Brasil (Brasília)</option>
                      <option value="America/New_York">Nova York (EST)</option>
                      <option value="Europe/London">Londres (GMT)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" aria-hidden="true" />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>
                  Configure como e quando receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">Email</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNewOrder', label: 'Novo pedido recebido', description: 'Notificar quando um novo pedido for feito' },
                      { key: 'emailOrderStatus', label: 'Mudança de status do pedido', description: 'Notificar cliente sobre atualizações de status' },
                      { key: 'emailLowStock', label: 'Estoque baixo', description: 'Alertar quando produtos atingirem estoque mínimo' },
                      { key: 'emailDailyReport', label: 'Relatório diário', description: 'Enviar resumo diário de vendas e pedidos' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-frost-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-frost-500 dark:text-frost-400">{item.description}</p>
                        </div>
                        <Switch
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onCheckedChange={(checked) => updateSetting('notifications', item.key as keyof typeof settings.notifications, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">SMS</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'smsNewOrder', label: 'Novo pedido (admin)', description: 'Notificar administrador via SMS' },
                      { key: 'smsDelivery', label: 'Saiu para entrega', description: 'Notificar cliente que pedido saiu para entrega' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-frost-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-frost-500 dark:text-frost-400">{item.description}</p>
                        </div>
                        <Switch
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onCheckedChange={(checked) => updateSetting('notifications', item.key as keyof typeof settings.notifications, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">Push</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'pushNewOrder', label: 'Novo pedido', description: 'Notificação push para novos pedidos' },
                      { key: 'pushDelivery', label: 'Atualização de entrega', description: 'Notificar sobre status de entrega' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-frost-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-frost-500 dark:text-frost-400">{item.description}</p>
                        </div>
                        <Switch
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onCheckedChange={(checked) => updateSetting('notifications', item.key as keyof typeof settings.notifications, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" aria-hidden="true" />
                  Aparência e Branding
                </CardTitle>
                <CardDescription>
                  Personalize a identidade visual do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Tema</Label>
                  <div className="flex gap-4 mt-2">
                    {['light', 'dark', 'system'].map((theme) => (
                      <label key={theme} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value={theme}
                          checked={settings.appearance.theme === theme}
                          onChange={(e) => updateSetting('appearance', 'theme', e.target.value as 'light' | 'dark' | 'system')}
                          className="w-4 h-4 text-ice-500 border-frost-300 focus:ring-ice-500"
                        />
                        <span className="capitalize text-frost-700 dark:text-frost-300">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <input
                        id="primaryColor"
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-frost-300 cursor-pointer"
                      />
                      <Input
                        value={settings.appearance.primaryColor}
                        onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <input
                        id="secondaryColor"
                        type="color"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => updateSetting('appearance', 'secondaryColor', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-frost-300 cursor-pointer"
                      />
                      <Input
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => updateSetting('appearance', 'secondaryColor', e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="logoUrl">URL do Logo</Label>
                    <Input
                      id="logoUrl"
                      value={settings.appearance.logoUrl}
                      onChange={(e) => updateSetting('appearance', 'logoUrl', e.target.value)}
                      className="mt-1"
                      placeholder="https://exemplo.com/logo.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="faviconUrl">URL do Favicon</Label>
                    <Input
                      id="faviconUrl"
                      value={settings.appearance.faviconUrl}
                      onChange={(e) => updateSetting('appearance', 'faviconUrl', e.target.value)}
                      className="mt-1"
                      placeholder="https://exemplo.com/favicon.ico"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" aria-hidden="true" />
                  Configurações de Entrega
                </CardTitle>
                <CardDescription>
                  Gerencie taxas, raio de entrega e horários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="defaultDeliveryFee">Taxa de Entrega Padrão</Label>
                    <Input
                      id="defaultDeliveryFee"
                      type="number"
                      step="0.01"
                      value={settings.delivery.defaultDeliveryFee}
                      onChange={(e) => updateSetting('delivery', 'defaultDeliveryFee', parseFloat(e.target.value))}
                      className="mt-1"
                      placeholder="15.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="freeDeliveryThreshold">Frete Grátis Acima de</Label>
                    <Input
                      id="freeDeliveryThreshold"
                      type="number"
                      step="0.01"
                      value={settings.delivery.freeDeliveryThreshold}
                      onChange={(e) => updateSetting('delivery', 'freeDeliveryThreshold', parseFloat(e.target.value))}
                      className="mt-1"
                      placeholder="200.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryRadius">Raio de Entrega (km)</Label>
                    <Input
                      id="deliveryRadius"
                      type="number"
                      value={settings.delivery.deliveryRadius}
                      onChange={(e) => updateSetting('delivery', 'deliveryRadius', parseInt(e.target.value))}
                      className="mt-1"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preparationTime">Tempo de Preparo (min)</Label>
                    <Input
                      id="preparationTime"
                      type="number"
                      value={settings.delivery.preparationTime}
                      onChange={(e) => updateSetting('delivery', 'preparationTime', parseInt(e.target.value))}
                      className="mt-1"
                      placeholder="60"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">Horário de Funcionamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {daysOfWeek.map((day) => (
                      <div key={day.key} className="flex items-center gap-3 p-3 bg-frost-50 dark:bg-frost-800/50 rounded-xl">
                        <input
                          type="checkbox"
                          checked={settings.delivery.businessHours[day.key as keyof typeof settings.delivery.businessHours].closed}
                          onChange={(e) => handleBusinessHoursChange(day.key, 'closed', e.target.checked)}
                          className="w-4 h-4 text-ice-500 border-frost-300 rounded focus:ring-ice-500"
                          id={`closed-${day.key}`}
                        />
                        <label htmlFor={`closed-${day.key}`} className="font-medium text-frost-900 dark:text-white flex-1">
                          {day.label}
                        </label>
                        {!settings.delivery.businessHours[day.key as keyof typeof settings.delivery.businessHours].closed && (
                          <>
                            <Input
                              type="time"
                              value={settings.delivery.businessHours[day.key as keyof typeof settings.delivery.businessHours].open}
                              onChange={(e) => handleBusinessHoursChange(day.key, 'open', e.target.value)}
                              className="w-24"
                            />
                            <span className="text-frost-400">até</span>
                            <Input
                              type="time"
                              value={settings.delivery.businessHours[day.key as keyof typeof settings.delivery.businessHours].close}
                              onChange={(e) => handleBusinessHoursChange(day.key, 'close', e.target.value)}
                              className="w-24"
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" aria-hidden="true" />
                  Métodos de Pagamento
                </CardTitle>
                <CardDescription>
                  Configure as opções de pagamento disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">PIX</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="pixKey">Chave PIX</Label>
                      <Input
                        id="pixKey"
                        value={settings.payment.pixKey}
                        onChange={(e) => updateSetting('payment', 'pixKey', e.target.value)}
                        className="mt-1"
                        placeholder="contato@bestgelo.com.br"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pixKeyType">Tipo da Chave</Label>
                      <select
                        id="pixKeyType"
                        value={settings.payment.pixKeyType}
                        onChange={(e) => updateSetting('payment', 'pixKeyType', e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-frost-300 dark:border-frost-600 rounded-xl bg-white dark:bg-frost-800 text-frost-900 dark:text-white focus:ring-2 focus:ring-ice-500 focus:border-transparent"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Telefone</option>
                        <option value="cpf">CPF</option>
                        <option value="cnpj">CNPJ</option>
                        <option value="random">Aleatória</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">Métodos Aceitos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'acceptCreditCard', label: 'Cartão de Crédito' },
                      { key: 'acceptDebitCard', label: 'Cartão de Débito' },
                      { key: 'acceptCash', label: 'Dinheiro' },
                      { key: 'acceptBankTransfer', label: 'Transferência Bancária' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-3 cursor-pointer p-3 bg-frost-50 dark:bg-frost-800/50 rounded-xl">
                        <input
                          type="checkbox"
                          checked={settings.payment[item.key as keyof typeof settings.payment] as boolean}
                          onChange={(e) => updateSetting('payment', item.key as keyof typeof settings.payment, e.target.checked)}
                          className="w-4 h-4 text-ice-500 border-frost-300 rounded focus:ring-ice-500"
                        />
                        <span className="font-medium text-frost-900 dark:text-white">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="installmentMax">Máximo de Parcelas</Label>
                    <Input
                      id="installmentMax"
                      type="number"
                      value={settings.payment.installmentMax}
                      onChange={(e) => updateSetting('payment', 'installmentMax', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="installmentInterestFree">Parcelas Sem Juros</Label>
                    <Input
                      id="installmentInterestFree"
                      type="number"
                      value={settings.payment.installmentInterestFree}
                      onChange={(e) => updateSetting('payment', 'installmentInterestFree', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6 animate-in fade-in-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" aria-hidden="true" />
                  Segurança e Acesso
                </CardTitle>
                <CardDescription>
                  Configure políticas de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-frost-900 dark:text-white mb-4">Autenticação de Dois Fatores</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-frost-900 dark:text-white">Ativar 2FA</p>
                      <p className="text-sm text-frost-500 dark:text-frost-400">Exigir autenticação de dois fatores para todos os administradores</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) => updateSetting('security', 'twoFactorEnabled', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sessionTimeout">Tempo de Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="loginAttemptsLimit">Tentativas de Login Permitidas</Label>
                    <Input
                      id="loginAttemptsLimit"
                      type="number"
                      value={settings.security.loginAttemptsLimit}
                      onChange={(e) => updateSetting('security', 'loginAttemptsLimit', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutDuration">Tempo de Bloqueio (minutos)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={settings.security.lockoutDuration}
                      onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-frost-900 dark:text-white">Exigir caractere especial na senha</p>
                    <p className="text-sm text-frost-500 dark:text-frost-400">Forçar uso de caracteres especiais (!@#$%^&*)</p>
                  </div>
                  <Switch
                    checked={settings.security.requireSpecialChar}
                    onCheckedChange={(checked) => updateSetting('security', 'requireSpecialChar', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
}