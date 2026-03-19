'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product } from '@/types/product.types';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Software Pro', description: 'Licença anual Software Pro', price: 1999.00, stock: 999, category: 'Software', status: 'AVAILABLE', createdAt: new Date().toISOString() },
  { id: '2', name: 'Consultoria Premium', description: 'Pacote de 10h de consultoria', price: 1500.00, stock: 10, category: 'Serviço', status: 'AVAILABLE', createdAt: new Date().toISOString() },
  { id: '3', name: 'Curso de Finanças', description: 'Mentoria gravada', price: 499.00, stock: 0, category: 'Curso', status: 'OUT_OF_STOCK', createdAt: new Date().toISOString() }
];

const productSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
  price: z.coerce.number().min(0, 'O preço deve ser positivo'),
  stock: z.coerce.number().min(0, 'O estoque deve ser positivo'),
  category: z.string().min(1, 'Campo obrigatório'),
  status: z.enum(['AVAILABLE', 'OUT_OF_STOCK', 'COMPLETED'])
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      reset({ ...product });
    } else {
      setEditingProduct(null);
      reset({ name: '', description: '', price: 0, stock: 0, category: '', status: 'AVAILABLE' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = (data: ProductFormValues) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
    } else {
      setProducts([...products, { id: Math.random().toString(), ...data, createdAt: new Date().toISOString() }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if(confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const markAsCompleted = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'COMPLETED' } : p));
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'AVAILABLE') return 'success';
    if (status === 'OUT_OF_STOCK') return 'danger';
    return 'outline';
  };

  const getStatusText = (status: string) => {
    if (status === 'AVAILABLE') return 'Disponível';
    if (status === 'OUT_OF_STOCK') return 'Sem Estoque';
    return 'Concluído';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Produtos</h1>
          <p className="text-gray-400">Gerencie seu catálogo de produtos e serviços</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-white">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(product.status)}>
                      {getStatusText(product.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {product.status !== 'COMPLETED' && (
                        <Button variant="ghost" size="icon" title="Marcar como concluído" onClick={() => markAsCompleted(product.id)}>
                          <CheckCircle className="h-4 w-4 text-[var(--color-success)] hover:text-green-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(product)}>
                        <Edit2 className="h-4 w-4 text-gray-400 hover:text-[var(--color-primary)]" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
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
        title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Nome do Produto" 
            placeholder="Ex: Consultoria Premium" 
            {...register('name')} 
            error={errors.name?.message} 
          />
          <Input 
            label="Descrição" 
            placeholder="Breve descrição" 
            {...register('description')} 
            error={errors.description?.message} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Preço (R$)" 
              type="number" 
              step="0.01"
              {...register('price')} 
              error={errors.price?.message} 
            />
            <Input 
              label="Estoque" 
              type="number" 
              {...register('stock')} 
              error={errors.stock?.message} 
            />
          </div>
          <Input 
            label="Categoria" 
            placeholder="Ex: Serviço" 
            {...register('category')} 
            error={errors.category?.message} 
          />
          <Select 
            label="Status" 
            {...register('status')} 
            error={errors.status?.message}
            options={[
              { label: 'Disponível', value: 'AVAILABLE' },
              { label: 'Sem Estoque', value: 'OUT_OF_STOCK' },
              { label: 'Concluído', value: 'COMPLETED' }
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
