'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatCurrency, generateWhatsAppLink, formatPhoneNumber } from '@/lib/utils';
import {
  Snowflake, Truck, MapPin, Clock, CreditCard, MessageCircle,
  Package, User, Calendar, AlertCircle, CheckCircle, ChevronRight,
  Plus, Minus, Trash2, Edit2, Eye, MapPin as MapPinIcon, Shield
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const deliveryOptions = [
  { id: 'standard', name: 'Entrega Padrão', description: 'Até 4 horas úteis', price: 15.00, icon: Truck },
  { id: 'express', name: 'Entrega Expressa', description: 'Até 2 horas', price: 35.00, icon: Truck, badge: 'Mais Rápida' },
  { id: 'scheduled', name: 'Entrega Agendada', description: 'Escolha data e horário', price: 20.00, icon: Calendar },
  { id: 'pickup', name: 'Retirada na Fábrica', description: 'Disponível em 30 min', price: 0, icon: Package, badge: 'Grátis' },
];

const paymentMethods = [
  { id: 'pix', name: 'PIX', description: 'Pagamento instantâneo via QR Code ou chave', icon: CreditCard, discount: 5 },
  { id: 'card', name: 'Cartão de Crédito/Débito', description: 'Visa, Mastercard, Elo, Amex', icon: CreditCard },
  { id: 'cash', name: 'Dinheiro na Entrega', description: 'Pague ao receber (apenas entrega padrão)', icon: CreditCard },
];

const products = [
  {
    id: 'gelo-cubos-5kg',
    name: 'Gelo em Cubos - 5kg',
    price: 12.90,
    category: 'CUBES',
    maxStock: 500,
    weight: 5,
  },
  {
    id: 'gelo-cubos-10kg',
    name: 'Gelo em Cubos - 10kg',
    price: 22.90,
    category: 'CUBES',
    maxStock: 300,
    weight: 10,
  },
  {
    id: 'gelo-cubos-20kg',
    name: 'Gelo em Cubos - 20kg',
    price: 39.90,
    category: 'CUBES',
    maxStock: 150,
    weight: 20,
  },
  {
    id: 'gelo-triturado-5kg',
    name: 'Gelo Triraturado - 5kg',
    price: 14.90,
    category: 'CRUSHED',
    maxStock: 400,
    weight: 5,
  },
  {
    id: 'gelo-triturado-10kg',
    name: 'Gelo Triturado - 10kg',
    price: 26.90,
    category: 'CRUSHED',
    maxStock: 200,
    weight: 10,
  },
  {
    id: 'gelo-seco-1kg',
    name: 'Gelo Seco - 1kg',
    price: 45.00,
    category: 'DRY_ICE',
    maxStock: 100,
    weight: 1,
  },
  {
    id: 'gelo-seco-5kg',
    name: 'Gelo Seco - 5kg',
    price: 180.00,
    category: 'DRY_ICE',
    maxStock: 50,
    weight: 5,
  },
  {
    id: 'gelo-personalizado',
    name: 'Gelo Personalizado',
    price: 35.00,
    category: 'CUSTOM',
    maxStock: 999,
    custom: true,
    weight: 0,
  },
];

const categoryLabels: Record<string, string> = {
  CUBES: 'Cubos',
  CRUSHED: 'Triturado',
  DRY_ICE: 'Seco',
  CUSTOM: 'Personalizado',
};

const categoryColors: Record<string, string> = {
  CUBES: 'bg-ice-100 text-ice-700 dark:bg-ice-900/30 dark:text-ice-300',
  CRUSHED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DRY_ICE: 'bg-frost-100 text-frost-700 dark:bg-frost-900/30 dark:text-frost-300',
  CUSTOM: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    cnpj: '',
    companyName: '',
    isB2B: false,
  });
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: '',
  });
  const [notes, setNotes] = useState('');
  const [customIceDetails, setCustomIceDetails] = useState({
    logo: false,
    format: '',
    color: '',
    quantity: 0,
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId)!;
    return { product, quantity };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryOptions.find(o => o.id === deliveryOption)?.price || 0;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal + deliveryFee - pixDiscount;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (cartItems.length === 0) {
        newErrors.cart = 'Adicione pelo menos um produto ao pedido';
      }
    } else if (currentStep === 2) {
      if (!customerInfo.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!customerInfo.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!customerInfo.email.trim()) newErrors.email = 'E-mail é obrigatório';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) newErrors.email = 'E-mail inválido';
      if (customerInfo.isB2B) {
        if (!customerInfo.companyName.trim()) newErrors.companyName = 'Razão social é obrigatória para PJ';
        if (!customerInfo.cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório para PJ';
      }
    } else if (currentStep === 3) {
      if (deliveryOption !== 'pickup') {
        if (!address.cep.trim()) newErrors.cep = 'CEP é obrigatório';
        if (!address.street.trim()) newErrors.street = 'Endereço é obrigatório';
        if (!address.number.trim()) newErrors.number = 'Número é obrigatório';
        if (!address.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
        if (!address.city.trim()) newErrors.city = 'Cidade é obrigatória';
        if (!address.state.trim()) newErrors.state = 'Estado é obrigatório';
      }
      if (deliveryOption === 'scheduled') {
        if (!deliveryDate) newErrors.deliveryDate = 'Data de entrega é obrigatória';
        if (!deliveryTime) newErrors.deliveryTime = 'Horário de entrega é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const addToCart = (productId: string) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const product = products.find(p => p.id === productId)!;
      if (currentQty >= product.maxStock) return prev;
      return { ...prev, [productId]: currentQty + 1 };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: currentQty - 1 };
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      customer: customerInfo,
      address: deliveryOption !== 'pickup' ? address : null,
      delivery: {
        option: deliveryOption,
        date: deliveryDate || null,
        time: deliveryTime || null,
      },
      payment: paymentMethod,
      notes,
      customIce: cartItems.some(item => item.product.custom) ? customIceDetails : null,
      subtotal,
      deliveryFee,
      discount: pixDiscount,
      total,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        router.push(`/pedido/${order.id}?success=true`);
      } else {
        alert('Erro ao criar pedido. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Tente novamente.');
    }
  };

  const whatsappMessage = `Olá! Gostaria de fazer um pedido:\n\n${cartItems.map(item =>
    `- ${item.quantity}x ${item.product.name} (${formatCurrency(item.product.price)} cada)`
  ).join('\n')}\n\nSubtotal: ${formatCurrency(subtotal)}\nEntrega: ${formatCurrency(deliveryFee)}\n${pixDiscount > 0 ? `Desconto PIX: -${formatCurrency(pixDiscount)}\n` : ''}Total: ${formatCurrency(total)}\n\nNome: ${customerInfo.name}\nTelefone: ${customerInfo.phone}\n${address.street ? `Endereço: ${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city}/${address.state}` : 'Retirada na fábrica'}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: 'Produtos', href: '#' },
                { num: 2, label: 'Cliente', href: '#' },
                { num: 3, label: 'Entrega', href: '#' },
                { num: 4, label: 'Pagamento', href: '#' },
              ].map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    step > s.num
                      ? 'bg-green-500 text-white'
                      : step === s.num
                      ? 'bg-ice-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}>
                    {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                  </div>
                  <span className={cn(
                    'hidden sm:block text-sm font-medium',
                    step >= s.num ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                  )}>
                    {s.label}
                  </span>
                  {i < 3 && (
                    <div className={cn(
                      'hidden sm:block w-16 h-0.5 rounded',
                      step > s.num ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    )} />
                  )}
                </motion.div>
              ))}
            </div>
            <Link href="/produtos" className="text-sm text-ice-600 dark:text-ice-400 hover:underline flex items-center gap-1">
              <Snowflake className="h-4 w-4" />
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Products */}
            <motion.div
              key={1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 1 ? 1 : 0, y: step === 1 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={cn('absolute lg:relative pointer-events-none lg:pointer-events-auto', step !== 1 && 'hidden')}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Escolha seus Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={cart[product.id] || 0}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  {cartItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span className="font-medium text-green-800 dark:text-green-200">
                            {cartItems.length} produto{cartItems.length !== 1 ? 's' : ''} no pedido
                          </span>
                        </div>
                        <span className="text-lg font-bold text-green-800 dark:text-green-200">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2: Customer Info */}
            <motion.div
              key={2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={cn('absolute lg:relative pointer-events-none lg:pointer-events-auto', step !== 2 && 'hidden')}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Dados do Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Como devemos chamar você?"
                        error={!!errors.name}
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                        error={!!errors.phone}
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        error={!!errors.email}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-4">
                    <Switch
                      id="isB2B"
                      checked={customerInfo.isB2B}
                      onCheckedChange={(checked) => setCustomerInfo(prev => ({ ...prev, isB2B: checked }))}
                    />
                    <Label htmlFor="isB2B" className="cursor-pointer">
                      <span className="font-medium text-gray-900 dark:text-white">Sou pessoa jurídica (CNPJ)</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Preencha os dados da empresa para nota fiscal</p>
                    </Label>
                  </div>

                  {customerInfo.isB2B && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="companyName">Razão Social *</Label>
                          <Input
                            id="companyName"
                            value={customerInfo.companyName}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="Nome da empresa"
                            error={!!errors.companyName}
                          />
                          {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="cnpj">CNPJ *</Label>
                          <Input
                            id="cnpj"
                            value={customerInfo.cnpj}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, cnpj: e.target.value }))}
                            placeholder="00.000.000/0000-00"
                            error={!!errors.cnpj}
                          />
                          {errors.cnpj && <p className="text-sm text-red-500 mt-1">{errors.cnpj}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3: Delivery */}
            <motion.div
              key={3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 3 ? 1 : 0, y: step === 3 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={cn('absolute lg:relative pointer-events-none lg:pointer-events-auto', step !== 3 && 'hidden')}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Tipo de Entrega
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {deliveryOptions.map((option) => (
                        <DeliveryOptionCard
                          key={option.id}
                          option={option}
                          selected={deliveryOption === option.id}
                          onSelect={() => setDeliveryOption(option.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {deliveryOption !== 'pickup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cep">CEP *</Label>
                          <Input
                            id="cep"
                            value={address.cep}
                            onChange={(e) => setAddress(prev => ({ ...prev, cep: e.target.value }))}
                            placeholder="00000-000"
                            error={!!errors.cep}
                            maxLength={9}
                          />
                          {errors.cep && <p className="text-sm text-red-500 mt-1">{errors.cep}</p>}
                        </div>
                        <div className="md:col-span-1">
                          <Label htmlFor="street">Endereço *</Label>
                          <Input
                            id="street"
                            value={address.street}
                            onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                            placeholder="Rua, Avenida, etc."
                            error={!!errors.street}
                          />
                          {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
                        </div>
                        <div>
                          <Label htmlFor="number">Número *</Label>
                          <Input
                            id="number"
                            value={address.number}
                            onChange={(e) => setAddress(prev => ({ ...prev, number: e.target.value }))}
                            placeholder="123"
                            error={!!errors.number}
                          />
                          {errors.number && <p className="text-sm text-red-500 mt-1">{errors.number}</p>}
                        </div>
                        <div>
                          <Label htmlFor="complement">Complemento</Label>
                          <Input
                            id="complement"
                            value={address.complement}
                            onChange={(e) => setAddress(prev => ({ ...prev, complement: e.target.value }))}
                            placeholder="Apto, Bloco, Sala, etc."
                          />
                        </div>
                        <div>
                          <Label htmlFor="neighborhood">Bairro *</Label>
                          <Input
                            id="neighborhood"
                            value={address.neighborhood}
                            onChange={(e) => setAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                            placeholder="Centro"
                            error={!!errors.neighborhood}
                          />
                          {errors.neighborhood && <p className="text-sm text-red-500 mt-1">{errors.neighborhood}</p>}
                        </div>
                        <div>
                          <Label htmlFor="city">Cidade *</Label>
                          <Input
                            id="city"
                            value={address.city}
                            onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Mauá"
                            error={!!errors.city}
                          />
                          {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <Label htmlFor="state">Estado *</Label>
                          <Select value={address.state} onValueChange={(v) => setAddress(prev => ({ ...prev, state: v }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="SP" />
                            </SelectTrigger>
                            <SelectContent>
                              {['SP', 'RJ', 'MG', 'RS', 'SC', 'PR', 'BA', 'GO', 'PE', 'CE', 'DF', 'ES', 'AM', 'PA', 'MT', 'MS'].map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="reference">Ponto de Referência</Label>
                          <Input
                            id="reference"
                            value={address.reference}
                            onChange={(e) => setAddress(prev => ({ ...prev, reference: e.target.value }))}
                            placeholder="Próximo à padaria, portão azul, etc."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {deliveryOption === 'scheduled' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="deliveryDate">Data de Entrega *</Label>
                          <Input
                            id="deliveryDate"
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            error={!!errors.deliveryDate}
                          />
                          {errors.deliveryDate && <p className="text-sm text-red-500 mt-1">{errors.deliveryDate}</p>}
                        </div>
                        <div>
                          <Label htmlFor="deliveryTime">Horário *</Label>
                          <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.deliveryTime && <p className="text-sm text-red-500 mt-1">{errors.deliveryTime}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {deliveryOption === 'pickup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-ice-50 dark:bg-ice-900/20 border border-ice-200 dark:border-ice-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                        <div>
                          <p className="font-medium text-ice-900 dark:text-ice-100">Retirada na Fábrica</p>
                          <p className="text-sm text-ice-700 dark:text-ice-300">
                            Endereço: Av. Industrial, 123 - Mauá/SP<br />
                            Horário: Seg-Sex 7h-19h | Sáb 7h-13h<br />
                            Pedido disponível em ~30 minutos após confirmação
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4: Payment & Review */}
            <motion.div
              key={4}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 4 ? 1 : 0, y: step === 4 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={cn('absolute lg:relative pointer-events-none lg:pointer-events-auto', step !== 4 && 'hidden')}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-ice-600 dark:text-ice-400" />
                    Pagamento e Revisão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Forma de Pagamento
                    </Label>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          method={method}
                          selected={paymentMethod === method.id}
                          onSelect={() => setPaymentMethod(method.id)}
                          subtotal={subtotal}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Observações do Pedido
                    </Label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Instruções de entrega, portaria, horários preferenciais, etc."
                      className="w-full min-h-[80px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  {cartItems.some(item => item.product.custom) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <h4 className="font-medium text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                        <Snowflake className="h-5 w-5" />
                        Detalhes do Gelo Personalizado
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customFormat">Formato Desejado</Label>
                          <Input
                            id="customFormat"
                            value={customIceDetails.format}
                            onChange={(e) => setCustomIceDetails(prev => ({ ...prev, format: e.target.value }))}
                            placeholder="Ex: Cubo com logotipo, Esfera, Coração, etc."
                          />
                        </div>
                        <div>
                          <Label htmlFor="customColor">Cor</Label>
                          <Input
                            id="customColor"
                            value={customIceDetails.color}
                            onChange={(e) => setCustomIceDetails(prev => ({ ...prev, color: e.target.value }))}
                            placeholder="Ex: Transparente, Azul, Vermelho, etc."
                          />
                        </div>
                        <div>
                          <Label htmlFor="customQuantity">Quantidade (kg)</Label>
                          <Input
                            id="customQuantity"
                            type="number"
                            value={customIceDetails.quantity}
                            onChange={(e) => setCustomIceDetails(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                            placeholder="50"
                            min="10"
                          />
                        </div>
                        <div className="flex items-end">
                          <Label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customIceDetails.logo}
                              onChange={(e) => setCustomIceDetails(prev => ({ ...prev, logo: e.target.checked }))}
                              className="h-4 w-4 rounded border-gray-300 text-ice-600 focus:ring-ice-500"
                            />
                            <span className="text-sm">Incluir logotipo da empresa</span>
                          </Label>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="customDescription">Descrição Detalhada / Referências</Label>
                          <textarea
                            id="customDescription"
                            value={customIceDetails.description}
                            onChange={(e) => setCustomIceDetails(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Descreva o design, anexe referências, cores Pantone, posição do logotipo, etc."
                            className="w-full min-h-[80px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent resize-none"
                            rows={3}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Voltar
              </Button>
              <div className="flex gap-3">
                {step < 4 && (
                  <Button onClick={handleNext} className="gap-2">
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                {step === 4 && (
                  <Button onClick={handleSubmit} size="lg" className="gap-2 bg-red-600 hover:bg-red-700">
                    <CheckCircle className="h-4 w-4" />
                    Confirmar Pedido
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    Resumo do Pedido
                    <Badge variant="outline" className="ml-2">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum produto adicionado</p>
                      <p className="text-sm mt-1">Selecione os produtos na aba "Produtos"</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.product.id}
                            item={item}
                            onUpdateQty={addToCart}
                            onRemove={() => removeFromCart(item.product.id)}
                          />
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Entrega</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {deliveryFee === 0 ? 'Grátis' : formatCurrency(deliveryFee)}
                          </span>
                        </div>
                        {pixDiscount > 0 && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Desconto PIX (5%)</span>
                            <span className="font-medium">-{formatCurrency(pixDiscount)}</span>
                          </div>
                        )}
                      </div>

                      <Separator className="my-2" />

                      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>

                      {paymentMethod === 'pix' && pixDiscount > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 text-center">
                          Economia de {formatCurrency(pixDiscount)} pagando com PIX!
                        </p>
                      )}
                    </>
                  )}

                  {cartItems.length > 0 && (
                    <a
                      href={generateWhatsAppLink(whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Enviar Pedido pelo WhatsApp
                    </a>
                  )}
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <TrustBadge icon={Shield} title="Qualidade" desc="Água purificada" />
                    <TrustBadge icon={Truck} title="Entrega Rápida" desc="Até 2h" />
                    <TrustBadge icon={Snowflake} title="Fábrica Própria" desc="Produção própria" />
                    <TrustBadge icon={CheckCircle} title="Garantia" desc="Satisfação total" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, quantity, onAdd, onRemove }: {
  product: typeof products[0];
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className={cn(
      'relative p-4 border-2 rounded-xl transition-all',
      quantity > 0
        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
        : 'border-gray-200 dark:border-gray-700 hover:border-ice-300 dark:hover:border-ice-700'
    )}>
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className={categoryColors[product.category]}>
          {categoryLabels[product.category]}
        </Badge>
        {product.custom && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Personalizado
          </Badge>
        )}
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {formatCurrency(product.price)} / {product.weight}kg
      </p>
      {quantity > 0 ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => onRemove(product.id)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => onAdd(product.id)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="font-bold text-red-600 dark:text-red-400">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
      ) : (
        <Button
          className="w-full"
          onClick={() => onAdd(product.id)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      )}
    </div>
  );
}

function CartItem({ item, onUpdateQty, onRemove }: {
  item: { product: typeof products[0]; quantity: number };
  onUpdateQty: (id: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
        <Snowflake className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{item.product.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatCurrency(item.product.price)} x {item.quantity} = {formatCurrency(item.product.price * item.quantity)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onRemove} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DeliveryOptionCard({ option, selected, onSelect }: {
  option: typeof deliveryOptions[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative p-4 rounded-xl border-2 transition-all text-left',
        selected
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-ice-300 dark:hover:border-ice-700'
      )}
    >
      {option.badge && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5">
          {option.badge}
        </Badge>
      )}
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          selected ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={cn('font-medium', selected ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')}>
              {option.name}
            </h4>
            <span className={cn('font-bold', selected ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')}>
              {option.price === 0 ? 'Grátis' : formatCurrency(option.price)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
        </div>
      </div>
      {selected && (
        <div className="absolute inset-0 border-2 border-red-500 rounded-xl pointer-events-none" />
      )}
    </button>
  );
}

function PaymentMethodCard({ method, selected, onSelect, subtotal }: {
  method: typeof paymentMethods[0];
  selected: boolean;
  onSelect: () => void;
  subtotal: number;
}) {
  const Icon = method.icon;
  const discount = method.id === 'pix' ? subtotal * 0.05 : 0;
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative p-4 rounded-xl border-2 transition-all flex items-center gap-4',
        selected
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-ice-300 dark:hover:border-ice-700'
      )}
    >
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
        selected ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h4 className={cn('font-medium', selected ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')}>
          {method.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
      </div>
      {discount > 0 && (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          -{formatCurrency(discount)} (5%)
        </Badge>
      )}
      {selected && (
        <div className="absolute inset-0 border-2 border-red-500 rounded-xl pointer-events-none" />
      )}
    </button>
  );
}

function TrustBadge({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-3">
      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center mb-2">
        <Icon className="h-5 w-5 text-ice-600 dark:text-ice-400" />
      </div>
      <p className="text-xs font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}