'use client';

import * as React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Wallet, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Fev', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Abr', revenue: 2780, expenses: 3908 },
  { name: 'Mai', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const growthData = [
  { name: 'Jan', clients: 40 },
  { name: 'Fev', clients: 55 },
  { name: 'Mar', clients: 70 },
  { name: 'Abr', clients: 85 },
  { name: 'Mai', clients: 120 },
  { name: 'Jun', clients: 160 },
  { name: 'Jul', clients: 210 },
];

const recentTransactions = [
  { id: 1, name: 'Assinatura Pro', amount: '+ R$ 199,00', type: 'INCOME', date: 'Hoje, 14:30' },
  { id: 2, name: 'AWS Cloud', amount: '- R$ 450,00', type: 'EXPENSE', date: 'Hoje, 10:15' },
  { id: 3, name: 'Consultoria', amount: '+ R$ 1.500,00', type: 'INCOME', date: 'Ontem' },
  { id: 4, name: 'Marketing Ads', amount: '- R$ 800,00', type: 'EXPENSE', date: '21 Mar' },
];

const topClients = [
  { id: 1, name: 'Empresa Alpha', spent: 'R$ 12.500', status: 'Ativo' },
  { id: 2, name: 'Tech Solutions', spent: 'R$ 8.320', status: 'Ativo' },
  { id: 3, name: 'Global Finance', spent: 'R$ 5.100', status: 'Ativo' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Visão Geral</h1>
        <p className="text-gray-400">Acompanhe suas métricas financeiras</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Saldo Total" 
          value="R$ 124.500,20" 
          trend={12.5} 
          icon={<Wallet className="h-4 w-4" />} 
        />
        <StatsCard 
          title="Receita Mensal" 
          value="R$ 45.231,89" 
          trend={8.2} 
          icon={<DollarSign className="h-4 w-4" />} 
        />
        <StatsCard 
          title="Despesas Mensais" 
          value="R$ 12.300,50" 
          trend={-4.1} 
          icon={<CreditCard className="h-4 w-4" />} 
        />
        <StatsCard 
          title="Lucro" 
          value="R$ 32.931,39" 
          trend={15.3} 
          icon={<TrendingUp className="h-4 w-4" />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Receita vs Despesas" description="Análise dos últimos 7 meses">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-card-border)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Area type="monotone" name="Receita" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" name="Despesas" dataKey="expenses" stroke="var(--color-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Crescimento de Clientes" description="Total de clientes ativos">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-card-border)', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="clients" name="Clientes" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-[var(--color-card-border)]">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${tx.type === 'INCOME' ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/20 text-[var(--color-danger)]'}`}>
                      {tx.type === 'INCOME' ? <TrendingUp className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{tx.name}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${tx.type === 'INCOME' ? 'text-[var(--color-success)]' : 'text-gray-300'}`}>
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Principais Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map(client => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-card)] border border-[var(--color-card-border)]">
                  <div>
                    <p className="text-sm font-medium text-white">{client.name}</p>
                    <p className="text-xs text-gray-400">{client.spent}</p>
                  </div>
                  <Badge variant="success">{client.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
