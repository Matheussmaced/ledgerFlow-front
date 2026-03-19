export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
