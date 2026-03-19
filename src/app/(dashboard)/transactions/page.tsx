'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Transaction } from '@/types/transaction.types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Assinatura Pro Mensal', amount: 199.00, type: 'INCOME', date: '2023-10-25', category: 'Software', status: 'COMPLETED' },
  { id: '2', description: 'AWS Hospedagem', amount: 450.00, type: 'EXPENSE', date: '2023-10-24', category: 'Infraestrutura', status: 'COMPLETED' },
  { id: '3', description: 'Consultoria Financeira', amount: 1500.00, type: 'INCOME', date: '2023-10-22', category: 'Serviços', status: 'PENDING' },
  { id: '4', description: 'Marketing Facebook Ads', amount: 800.00, type: 'EXPENSE', date: '2023-10-21', category: 'Marketing', status: 'COMPLETED' },
  { id: '5', description: 'Venda de Licença API', amount: 5000.00, type: 'INCOME', date: '2023-10-20', category: 'Software', status: 'COMPLETED' }
];

export default function TransactionsPage() {
  const [filterType, setFilterType] = React.useState<string>('');
  const [filterDate, setFilterDate] = React.useState<string>('');
  
  const filteredTransactions = INITIAL_TRANSACTIONS.filter(t => {
    let match = true;
    if (filterType && filterType !== 'ALL') {
      match = match && t.type === filterType;
    }
    if (filterDate) {
      match = match && t.date >= filterDate;
    }
    return match;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Transações</h1>
        <p className="text-gray-400">Histórico completo de entradas e saídas</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64">
          <Select 
            options={[
              { label: 'Todas as Transações', value: 'ALL' },
              { label: 'Entradas', value: 'INCOME' },
              { label: 'Saídas', value: 'EXPENSE' }
            ]}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-white">{tx.description}</TableCell>
                  <TableCell>{tx.category}</TableCell>
                  <TableCell>{new Date(tx.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === 'COMPLETED' ? 'success' : 'outline'}>
                      {tx.status === 'COMPLETED' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${tx.type === 'INCOME' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nenhuma transação encontrada com os filtros atuais.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
