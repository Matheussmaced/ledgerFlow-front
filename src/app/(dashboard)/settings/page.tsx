'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuthStore } from '@/context/useAuthStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Configurações</h1>
        <p className="text-gray-400">Gerencie suas preferências e informações da conta</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Nome" defaultValue={user?.name} />
            <Input label="E-mail" type="email" defaultValue={user?.email} />
            <Select 
              label="Idioma" 
              options={[
                { label: 'Português (BR)', value: 'pt-BR' },
                { label: 'English (US)', value: 'en-US' }
              ]} 
              defaultValue="pt-BR"
            />
            <Button className="mt-4">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Senha Atual" type="password" placeholder="••••••••" />
            <Input label="Nova Senha" type="password" placeholder="••••••••" />
            <Input label="Confirmar Nova Senha" type="password" placeholder="••••••••" />
            <Button variant="outline" className="mt-4 w-full text-white">Alterar Senha</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
