'use client';

import * as React from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/context/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Wallet } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = React.useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useRHForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.email === 'admin@ledgerflow.com' && data.password === '123456') {
        setAuth({
          id: '1',
          name: 'Admin',
          email: data.email,
          role: 'ADMIN',
          createdAt: new Date().toISOString()
        }, 'mock-jwt-token');
        router.push('/dashboard');
      } else {
        setAuth({
          id: '2',
          name: 'Usuário',
          email: data.email,
          role: 'USER',
          createdAt: new Date().toISOString()
        }, 'mock-jwt-token');
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10" />
      
      <div className="w-full max-w-md z-10">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] mb-4">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-400">Entre na sua conta para acessar o painel</p>
        </div>

        <Card className="glass-card shadow-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-md">
                  {error}
                </div>
              )}
              
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                error={errors.email?.message}
              />
              
              <div className="space-y-1">
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <div className="flex justify-end pt-1">
                  <Link href="#" className="text-sm text-[var(--color-primary)] hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Não tem uma conta?{' '}
              <Link href="/register" className="text-[var(--color-primary)] hover:underline font-medium">
                Criar conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
