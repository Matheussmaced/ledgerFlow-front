'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/context/useAuthStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Wallet } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = React.useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuth({
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        role: 'USER',
        createdAt: new Date().toISOString()
      }, 'mock-jwt-token-registered');
      
      router.push('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10" />
      
      <div className="w-full max-w-md z-10 py-8">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] mb-4">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
          <p className="text-gray-400">Junte-se ao Ledger Flow para gerenciar suas finanças</p>
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
                label="Nome completo"
                placeholder="Seu nome"
                {...register('name')}
                error={errors.name?.message}
              />

              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                error={errors.email?.message}
              />
              
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />

              <Input
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[var(--color-primary)] hover:underline font-medium">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
