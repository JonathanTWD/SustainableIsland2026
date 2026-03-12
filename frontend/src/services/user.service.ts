import api from "./api.service";
import type { UserCountResponse, UserResponse, UpdateUserDTO } from "../interfaces/user.interface";

export const userService = {
  /**
   * Get the total count of registered users in the application
   */
  getUserCount: async (): Promise<UserCountResponse> => {
    const response = await api.get<UserCountResponse>("/users");
    return response.data;
  },

  /**
   * Update the currently authenticated user's profile
   * @param userId The ID of the user (must match the authenticated user)
   * @param data The profile information to update
   */
  update: async (userId: number, data: UpdateUserDTO): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Delete the authenticated user's account and all related data
   * @param userId The ID of the user (must match the authenticated user)
   */
  delete: async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};
