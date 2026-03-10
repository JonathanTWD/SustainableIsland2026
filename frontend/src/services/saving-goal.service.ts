import api from "./api.service";
import type {
  SavingGoalResponse,
  CreateSavingGoalDTO,
  UpdateSavingGoalDTO,
} from "../interfaces/saving-goal.interface";

export const savingGoalService = {

  getByUserId: async (userId: number): Promise<SavingGoalResponse[]> => {
    const response = await api.get<SavingGoalResponse[]>(`/saving-goals/user/${userId}`);
    return response.data;
  },

  create: async (data: CreateSavingGoalDTO): Promise<SavingGoalResponse> => {
    const response = await api.post<SavingGoalResponse>("/saving-goals", data);
    return response.data;
  },

  update: async (goalId: number, data: UpdateSavingGoalDTO): Promise<SavingGoalResponse> => {
    const response = await api.put<SavingGoalResponse>(`/saving-goals/${goalId}`, data);
    return response.data;
  },

  delete: async (goalId: number): Promise<void> => {
    await api.delete(`/saving-goals/${goalId}`);
  },
};
