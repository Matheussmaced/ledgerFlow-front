'use client';

import * as React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Wallet, DollarSign, TrendingUp, CreditCard, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const dataPie = [
  { name: 'Software', value: 4500 },
  { name: 'Serviços', value: 3000 },
  { name: 'Consultoria', value: 2500 },
  { name: 'Outros', value: 1000 },
];
const COLORS = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)', '#6b7280'];

const txSchema = z.object({
  description: z.string().min(1, 'Campo obrigatório'),
  amount: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Campo obrigatório'),
  date: z.string().min(1, 'Campo obrigatório'),
});

type TxFormValues = z.infer<typeof txSchema>;

export default function FinancePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TxFormValues>({
    resolver: zodResolver(txSchema) as any
  });

  const onSubmit = (data: TxFormValues) => {
    alert(`Nova transação salva: ${data.description}`);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Financeiro</h1>
          <p className="text-gray-400">Visão detalhada do seu fluxo de caixa</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nova Transação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard 
          title="Saldo Total" 
          value="R$ 124.500,20" 
          trend={12.5} 
          icon={<Wallet className="h-4 w-4 text-[var(--color-primary)]" />} 
        />
        <StatsCard 
          title="Entradas (Mês)" 
          value="R$ 45.231,89" 
          trend={8.2} 
          icon={<TrendingUp className="h-4 w-4 text-[var(--color-success)]" />} 
        />
        <StatsCard 
          title="Saídas (Mês)" 
          value="R$ 12.300,50" 
          trend={-4.1} 
          icon={<TrendingUp className="h-4 w-4 text-[var(--color-danger)] transform rotate-180" />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Distribuição de Receitas" description="Receita por categoria de produto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-card-border)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any) => `R$ ${value}`}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Histórico Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-[var(--color-card)] border border-[var(--color-card-border)]">
                  <div>
                    <p className="font-medium text-white">{i % 2 === 0 ? 'Pagamento de Fornecedor' : 'Licença Anual'}</p>
                    <p className="text-xs text-gray-400">Hoje, 10:00</p>
                  </div>
                  <div className={`font-semibold ${i % 2 === 0 ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'}`}>
                    {i % 2 === 0 ? '-' : '+'} R$ {i * 150},00
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Descrição" 
            placeholder="Ex: Pagamento de Hospedagem" 
            {...register('description')} 
            error={errors.description?.message} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Valor (R$)" 
              type="number" 
              step="0.01"
              {...register('amount')} 
              error={errors.amount?.message} 
            />
            <Input 
              label="Data" 
              type="date" 
              {...register('date')} 
              error={errors.date?.message} 
            />
          </div>
          <Select 
            label="Tipo" 
            {...register('type')} 
            error={errors.type?.message}
            options={[
              { label: 'Entrada', value: 'INCOME' },
              { label: 'Saída', value: 'EXPENSE' }
            ]}
          />
          <Input 
            label="Categoria" 
            placeholder="Ex: Infraestrutura" 
            {...register('category')} 
            error={errors.category?.message} 
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Transação
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
