export interface UserResponse {
  id: number;
  name: string | null;
  email: string;
  created_at: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserCountResponse {
  count: number;
}
