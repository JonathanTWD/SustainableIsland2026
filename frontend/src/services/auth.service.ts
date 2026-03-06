import type { AuthResponse, LoginDTO, RegisterDTO, User } from "../interfaces/auth.interface";
import api from "./api.service";

export const authService = {

  // Log in a user and store the token in localStorage
  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Register a new user and store the token in localStorage

  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Get the current authenticated user's details

  getCurrentUser: async (): Promise<{ message: string; user: User }> => {
    const response = await api.get<{ message: string; user: User }>("/auth/me");
    return response.data;
  },

  // Log out the current user by removing the token

  logout: () => {
    localStorage.removeItem("token");
    // Optional: Redirect to login
    // window.location.href = '/login';
  },
};
