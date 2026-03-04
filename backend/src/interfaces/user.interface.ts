export interface User {
  id: number
  name: string | null
  email: string
  password_hash: string
  created_at: Date
}

export interface CreateUserDTO {
  name?: string
  email: string
  password: string
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  password?: string
}

export interface UserResponse {
  id: number
  name: string | null
  email: string
  created_at: Date
}