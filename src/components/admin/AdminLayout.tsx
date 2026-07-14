'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Truck,
  Shield,
  Snowflake,
  Bell,
  User,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produtos', icon: Package },
  { href: '/admin/orders', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Clientes', icon: Users },
  { href: '/admin/delivery', label: 'Entregas', icon: Truck },
  { href: '/admin/reports', label: 'Relatórios', icon: BarChart3 },
  { href: '/admin/settings', label: 'Configurações', icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-frost-50 dark:bg-frost-900">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : isSidebarCollapsed ? -80 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-frost-900 border-r border-frost-200 dark:border-frost-700 flex flex-col transition-all duration-300',
          isSidebarCollapsed && !isSidebarOpen ? 'w-20' : 'w-72'
        )}
        aria-label="Menu administrativo"
      >
        {/* Logo Section */}
        <div className={cn('flex items-center justify-between h-16 px-4 border-b border-frost-200 dark:border-frost-700', isSidebarCollapsed && 'justify-center')}>
          <Link href="/admin" className="flex items-center gap-3" aria-label="Best Gelo Admin - Dashboard">
            <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center flex-shrink-0">
              <Snowflake className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-display font-bold text-xl text-frost-900 dark:text-white">
                Best Gelo Admin
              </span>
            )}
          </Link>
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg text-frost-500 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors"
              aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto" aria-label="Navegação principal">
          <ul className="space-y-1" role="list">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-gradient-ice text-white shadow-ice'
                        : 'text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-800',
                      isSidebarCollapsed && 'justify-center'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          {!isSidebarCollapsed && (
            <div className="my-4 border-t border-frost-200 dark:border-frost-700" />
          )}
        </nav>

        {/* Bottom Section */}
        <div className={cn('p-3 border-t border-frost-200 dark:border-frost-700', isSidebarCollapsed && 'px-2')}>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 p-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-ice flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-frost-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-frost-500 dark:text-frost-400 truncate capitalize">{user.userType.toLowerCase()}</p>
              </div>
            </div>
          )}

          <Link
            href="/admin/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-frost-600 dark:text-frost-400 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors',
              isSidebarCollapsed && 'justify-center'
            )}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Settings className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!isSidebarCollapsed && <span className="font-medium">Configurações</span>}
          </Link>

          <button
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2',
              isSidebarCollapsed && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!isSidebarCollapsed && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={cn('transition-all duration-300 lg:ml-72', isSidebarCollapsed && 'lg:ml-20')}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-frost-900/80 backdrop-blur-glass border-b border-frost-200 dark:border-frost-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-frost-500 hover:bg-frost-100 dark:hover:bg-frost-800"
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
              <h1 className="font-display font-bold text-xl text-frost-900 dark:text-white hidden sm:block">
                {adminNavItems.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-frost-500 hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors" aria-label="Notificações">
                <Bell className="w-5 h-5" aria-hidden="true" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-frost-100 dark:hover:bg-frost-800 transition-colors" aria-label="Menu do usuário">
                  <div className="w-8 h-8 rounded-xl bg-gradient-ice flex items-center justify-center">
                    <User className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="hidden md:block font-medium text-frost-900 dark:text-white">{user.name}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-ice text-white shadow-lg flex items-center justify-center"
        aria-label="Abrir menu lateral"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}