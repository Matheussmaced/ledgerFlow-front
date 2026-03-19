'use client';

import * as React from 'react';
import { useAuthStore } from '@/context/useAuthStore';
import { LogOut, Bell, Search, Menu } from 'lucide-react';
import { Input } from '../ui/Input';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-[var(--color-card-border)] bg-[var(--color-background)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-gray-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
        <div className="max-w-md w-full hidden sm:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9 h-9 bg-transparent border-gray-700/50 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--color-danger)] border-2 border-[var(--color-background)]"></span>
        </button>
        
        <div className="h-8 w-px bg-[var(--color-card-border)] mx-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-white">{user?.name || 'Administrador'}</span>
            <span className="text-xs text-gray-500">{user?.role === 'ADMIN' ? 'Admin' : 'Usuário'}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-[var(--color-danger)] transition-colors ml-2"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
