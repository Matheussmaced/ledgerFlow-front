'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Wallet, 
  ArrowRightLeft, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { label: 'Painel', route: '/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', route: '/clients', icon: Users },
  { label: 'Produtos', route: '/products', icon: Package },
  { label: 'Financeiro', route: '/finance', icon: Wallet },
  { label: 'Transações', route: '/transactions', icon: ArrowRightLeft },
  { label: 'Análises', route: '/analytics', icon: BarChart3 },
  { label: 'Configurações', route: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-[var(--color-card-border)] bg-[var(--color-background)]/80 backdrop-blur-md flex flex-col hidden md:flex sticky top-0 z-40">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-card-border)] mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Ledger Flow</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.route);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.route}
              href={item.route}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive 
                  ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-[0_0_10px_rgba(138,92,246,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-[var(--color-card)]'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-[var(--color-primary)]' : 'text-gray-400 group-hover:text-white transition-colors')} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-card-border)] mt-auto">
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-sm text-gray-300 font-medium mb-2">Precisa de Ajuda?</p>
          <button className="text-xs bg-white/10 hover:bg-white/20 text-white w-full py-2 rounded-md transition-colors">
            Contatar Suporte
          </button>
        </div>
      </div>
    </aside>
  );
}
