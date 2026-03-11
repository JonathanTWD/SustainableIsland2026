import type { AuthResponse, LoginDTO, RegisterDTO, User } from "../interfaces/auth.interface";
import api from "./api.service";

export const authService = {

  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  getCurrentUser: async (): Promise<{ message: string; user: User }> => {
    const response = await api.get<{ message: string; user: User }>("/auth/me");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
