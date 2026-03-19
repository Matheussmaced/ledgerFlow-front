'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Client } from '@/types/client.types';

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'Empresa Alpha', email: 'contato@alpha.com', phone: '(11) 99999-9999', company: 'Alpha Inc.', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: '2', name: 'Tech Solutions', email: 'tech@solutions.com', phone: '(11) 88888-8888', company: 'Tech Sol', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: '3', name: 'Global Finance', email: 'global@finance.com', phone: '(21) 77777-7777', company: 'Global SA', status: 'INACTIVE', createdAt: new Date().toISOString() }
];

const clientSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Campo obrigatório'),
  company: z.string().min(1, 'Campo obrigatório'),
  status: z.enum(['ACTIVE', 'INACTIVE'])
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function ClientsPage() {
  const [clients, setClients] = React.useState<Client[]>(INITIAL_CLIENTS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingClient, setEditingClient] = React.useState<Client | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema)
  });

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      reset({ ...client });
    } else {
      setEditingClient(null);
      reset({ name: '', email: '', phone: '', company: '', status: 'ACTIVE' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
    reset();
  };

  const onSubmit = (data: ClientFormValues) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...data } : c));
    } else {
      setClients([...clients, { id: Math.random().toString(), ...data, createdAt: new Date().toISOString() }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if(confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Clientes</h1>
          <p className="text-gray-400">Gerencie todos os seus clientes aqui</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium text-white">{client.name}</TableCell>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'ACTIVE' ? 'success' : 'secondary'}>
                      {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(client)}>
                        <Edit2 className="h-4 w-4 text-gray-400 hover:text-[var(--color-primary)]" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-[var(--color-danger)]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingClient ? 'Editar Cliente' : 'Novo Cliente'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Nome" 
            placeholder="Nome do cliente" 
            {...register('name')} 
            error={errors.name?.message} 
          />
          <Input 
            label="Empresa" 
            placeholder="Nome da empresa" 
            {...register('company')} 
            error={errors.company?.message} 
          />
          <Input 
            label="E-mail" 
            type="email" 
            placeholder="contato@empresa.com" 
            {...register('email')} 
            error={errors.email?.message} 
          />
          <Input 
            label="Telefone" 
            placeholder="(00) 00000-0000" 
            {...register('phone')} 
            error={errors.phone?.message} 
          />
          <Select 
            label="Status" 
            {...register('status')} 
            error={errors.status?.message}
            options={[
              { label: 'Ativo', value: 'ACTIVE' },
              { label: 'Inativo', value: 'INACTIVE' }
            ]}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
