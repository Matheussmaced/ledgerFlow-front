export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
}
