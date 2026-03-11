export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}