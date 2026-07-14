'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn, formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle, Truck, CreditCard, Calendar, MapPin,
  Clock, Package, Mail, Phone, MessageCircle, Printer,
  ChevronRight, RotateCcw, Shield, User, FileText,
  ArrowLeft, XCircle, AlertCircle, Loader2, Smartphone, Snowflake
} from 'lucide-react';

const orderStatuses = [
  { id: 'confirmed', label: 'Confirmado', icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  { id: 'preparing', label: 'Em Preparação', icon: Package, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'out_for_delivery', label: 'Saiu para Entrega', icon: Truck, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { id: 'delivered', label: 'Entregue', icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  { id: 'cancelled', label: 'Cancelado', icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
];

const mockOrder = {
  id: 'BG-20250115-0042',
  status: 'confirmed',
  createdAt: '2025-01-15T14:30:00',
  confirmedAt: '2025-01-15T14:32:00',
  estimatedDelivery: '2025-01-15T18:30:00',
  items: [
    { id: 'gelo-cubos-5kg', name: 'Gelo em Cubos - 5kg', quantity: 3, price: 12.90, image: '/images/gelo-cubos.jpg' },
    { id: 'gelo-triturado-5kg', name: 'Gelo Triturado - 5kg', quantity: 2, price: 14.90, image: '/images/gelo-triturado.jpg' },
  ],
  delivery: {
    type: 'express',
    address: 'Rua das Flores, 123 - Vila Mariana, São Paulo - SP, 04001-000',
    reference: 'Próximo ao metrô Vila Mariana, portão azul',
    recipient: 'João Silva',
    phone: '(11) 99999-9999',
    price: 35.00,
  },
  payment: {
    method: 'pix',
    status: 'paid',
    subtotal: 68.50,
    deliveryFee: 35.00,
    discount: 3.43,
    total: 100.07,
  },
  customer: {
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
  },
  notes: 'Entregar na portaria. Interfone 123.',
  trackingCode: 'BG202501150042',
};

const deliveryOptions = {
  standard: { name: 'Entrega Padrão', description: 'Até 4 horas úteis', price: 15.00, icon: Truck },
  express: { name: 'Entrega Expressa', description: 'Até 2 horas', price: 35.00, icon: Truck },
  scheduled: { name: 'Entrega Agendada', description: 'Data e horário escolhidos', price: 20.00, icon: Calendar },
  pickup: { name: 'Retirada na Fábrica', description: 'Disponível em 30 min', price: 0, icon: Package },
};

const paymentMethods = {
  pix: { name: 'PIX', icon: Smartphone, discount: 5 },
  card: { name: 'Cartão de Crédito/Débito', icon: CreditCard, discount: 0 },
  cash: { name: 'Dinheiro na Entrega', icon: CreditCard, discount: 0 },
};

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [isPrinting, setIsPrinting] = useState(false);

  // In a real app, you'd fetch the order from an API using resolvedParams.id
  const order = mockOrder;

  const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const currentStatus = orderStatuses.find(s => s.id === order.status) || orderStatuses[0];
  const deliveryOption = deliveryOptions[order.delivery.type as keyof typeof deliveryOptions];
  const paymentMethod = paymentMethods[order.payment.method as keyof typeof paymentMethods];

  const whatsappMessage = `Olá! Gostaria de acompanhar meu pedido ${order.id}. Código de rastreamento: ${order.trackingCode}`;
  const whatsappUrl = generateWhatsAppLink(whatsappMessage);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-frost-200 dark:border-frost-800 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Snowflake className="w-8 h-8 text-ice-600 dark:text-ice-400" />
              <span className="font-space-grotesk font-bold text-xl text-gray-900 dark:text-white">BEST<span className="text-red-600">Gelo</span></span>
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">Pedido confirmado</span>
          </div>
        </div>
      </motion.nav>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8 lg:py-12"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Seu pedido <strong className="text-ice-600 dark:text-ice-400">{order.id}</strong> foi recebido e está sendo processado.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Criado em {formatDate(order.createdAt)}</span>
              <span>•</span>
              <span>Confirmação: {formatShortDate(order.confirmedAt)}</span>
            </div>
          </motion.div>

          {/* Order Status Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="border-ice-200 dark:border-ice-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Acompanhamento do Pedido
                  </h3>
                  <Badge variant="outline" className={cn(currentStatus.bg, currentStatus.color)}>
                    <currentStatus.icon className="w-3 h-3 mr-1" />
                    {currentStatus.label}
                  </Badge>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-8 w-full h-1 bg-frost-200 dark:bg-frost-700" />
                  <div className="relative flex items-start justify-between">
                    {orderStatuses.map((status, index) => {
                      const isActive = orderStatuses.findIndex(s => s.id === order.status) >= index;
                      const isCurrent = status.id === order.status;
                      return (
                        <div key={status.id} className="flex flex-col items-center relative z-10">
                          <div className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300',
                            isActive
                              ? `border-${status.color.replace('text-', '').replace('dark:text-', 'dark:border-')}`
                              : 'border-frost-200 dark:border-frost-700'
                          )}>
                            <div className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                              isActive ? status.bg : 'bg-frost-100 dark:bg-frost-800'
                            )}>
                              <status.icon className={cn(
                                'w-5 h-5 transition-colors duration-300',
                                isActive ? status.color : 'text-frost-400 dark:text-frost-500'
                              )} />
                            </div>
                          </div>
                          <span className={cn(
                            'mt-2 text-xs font-medium text-center w-24',
                            isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                          )}>
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Delivery */}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="mt-6 p-4 bg-ice-50 dark:bg-ice-900/20 rounded-xl border border-ice-200 dark:border-ice-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Previsão de entrega</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatDate(order.estimatedDelivery, { weekday: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pedido entregue com sucesso</p>
                        <p className="font-semibold text-gray-900 dark:text-white">Obrigado por escolher a BEST Gelo!</p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === 'cancelled' && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pedido cancelado</p>
                        <p className="font-semibold text-gray-900 dark:text-white">Entre em contato conosco para mais informações.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Items */}
              <Card className="border-frost-200 dark:border-frost-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Itens do Pedido ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex gap-4 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Qtd: {item.quantity} × {formatCurrency(item.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card className="border-frost-200 dark:border-frost-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{order.delivery.recipient}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.delivery.phone}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.delivery.address}</p>
                        {order.delivery.reference && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Ref: {order.delivery.reference}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <deliveryOption.icon className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{deliveryOption.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{deliveryOption.description}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {deliveryOption.price === 0 ? 'Grátis' : formatCurrency(deliveryOption.price)}
                        </p>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Observação de entrega</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card className="border-frost-200 dark:border-frost-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-frost-50 dark:bg-frost-900/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-ice-100 dark:bg-ice-900/30 flex items-center justify-center flex-shrink-0">
                        <paymentMethod.icon className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{paymentMethod.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.payment.method === 'pix' && 'Pagamento confirmado via PIX'}
                          {order.payment.method === 'card' && 'Pagamento aprovado'}
                          {order.payment.method === 'cash' && 'Pagamento na entrega'}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant={order.payment.status === 'paid' ? 'default' : 'secondary'} className={cn(
                          order.payment.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''
                        )}>
                          {order.payment.status === 'paid' ? 'Pago' : order.payment.status === 'pending' ? 'Pendente' : 'Aguardando'}
                        </Badge>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="border-t border-frost-200 dark:border-frost-700 pt-4 space-y-2">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal ({order.items.reduce((sum, i) => sum + i.quantity, 0)} itens)</span>
                        <span>{formatCurrency(order.payment.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Entrega ({deliveryOption.name})</span>
                        <span>{deliveryOption.price === 0 ? 'Grátis' : formatCurrency(deliveryOption.price)}</span>
                      </div>
                      {order.payment.discount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>Desconto PIX ({paymentMethod.discount}%)</span>
                          <span>- {formatCurrency(order.payment.discount)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span className="text-ice-600 dark:text-ice-400">{formatCurrency(order.payment.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Order Info Card */}
              <Card className="border-frost-200 dark:border-frost-700 sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-ice-600 dark:text-ice-400" />
                    Detalhes do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Número do pedido</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono">{order.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Código de rastreio</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">{order.trackingCode}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Data do pedido</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Previsão de entrega</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Cliente</span>
                      <span className="font-medium text-gray-900 dark:text-white">{order.customer.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">E-mail</span>
                      <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{order.customer.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Telefone</span>
                      <span className="font-medium text-gray-900 dark:text-white">{order.customer.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">CPF/CNPJ</span>
                      <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">{order.customer.document}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="border-frost-200 dark:border-frost-700 sticky top-24" style={{ top: 'calc(24rem + 1.5rem)' }}>
                <CardContent className="pt-6 space-y-3">
                  <Button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className="w-full"
                    size="lg"
                  >
                    {isPrinting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Preparando impressão...
                      </>
                    ) : (
                      <>
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir Pedido
                      </>
                    )}
                  </Button>

                  <Button
                    variant="whatsapp"
                    asChild
                    className="w-full"
                    size="lg"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar no WhatsApp
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="w-full"
                    size="lg"
                  >
                    <Link href="/pedido/novo">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Fazer Novo Pedido
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="w-full text-gray-600 dark:text-gray-400 hover:text-ice-600 dark:hover:text-ice-400"
                  >
                    <Link href="/produtos">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continuar Comprando
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Support Card */}
              <Card className="border-frost-200 dark:border-frost-700 bg-gradient-to-br from-ice-50 to-white dark:from-ice-900/20 dark:to-gray-900">
                <CardContent className="pt-6 text-center space-y-4">
                  <Shield className="w-12 h-12 text-ice-600 dark:text-ice-400 mx-auto" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Precisa de ajuda?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nossa equipe está à disposição para dúvidas sobre seu pedido.
                  </p>
                  <div className="space-y-2 pt-2">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-ice-600 dark:text-ice-400 hover:underline">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp: (11) 99999-9999
                    </a>
                    <a href="tel:+551133334444" className="flex items-center justify-center gap-2 text-sm text-ice-600 dark:text-ice-400 hover:underline">
                      <Phone className="w-4 h-4" />
                      Telefone: (11) 3333-4444
                    </a>
                    <a href="mailto:pedidos@bestgelo.com.br" className="flex items-center justify-center gap-2 text-sm text-ice-600 dark:text-ice-400 hover:underline">
                      <Mail className="w-4 h-4" />
                      E-mail: pedidos@bestgelo.com.br
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-frost-200 dark:border-frost-700">
                    Atendimento: Seg-Sex 8h-18h | Sáb 8h-12h
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Invoice Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Nota Fiscal Eletrônica (NF-e)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  A nota fiscal será emitida automaticamente e enviada para o e-mail <strong>{order.customer.email}</strong> após a confirmação do pagamento.
                  Para clientes PJ, o XML e DANFE também ficam disponíveis na área do cliente.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Snowflake className="w-8 h-8 text-ice-400" />
            <span className="font-space-grotesk font-bold text-xl text-white">BEST<span className="text-red-400">Gelo</span></span>
          </Link>
          <p className="text-sm">Fábrica própria em Mauá/SP. Gelo cristalino, seguro e entregue rapidamente.</p>
          <p className="text-sm mt-2">© 2025 BEST Gelo Comércio de Gelo LTDA. CNPJ 00.000.000/0000-00</p>
        </div>
      </footer>
    </div>
  );
}