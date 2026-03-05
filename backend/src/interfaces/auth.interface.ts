export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  name?: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: number
    name: string | null
    email: string
    created_at: Date
  }
  token: string
}

export interface JWTPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

export interface AuthRequest extends Request {
  user?: JWTPayload
}