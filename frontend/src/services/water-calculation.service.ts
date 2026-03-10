import api from "./api.service";
import type { 
  WaterCalculationResponse, 
  CreateWaterCalculationDTO, 
  UpdateWaterCalculationDTO 
} from "../interfaces/water-calculation.interface";

export const waterCalculationService = {
  
  getByUserId: async (userId: number): Promise<WaterCalculationResponse[]> => {
    const response = await api.get<WaterCalculationResponse[]>(`/water-calculations/user/${userId}`);
    return response.data;
  },

  create: async (data: CreateWaterCalculationDTO): Promise<WaterCalculationResponse> => {
    const response = await api.post<WaterCalculationResponse>("/water-calculations", data);
    return response.data;
  },

  update: async (calculationId: number, data: UpdateWaterCalculationDTO): Promise<WaterCalculationResponse> => {
    const response = await api.put<WaterCalculationResponse>(`/water-calculations/${calculationId}`, data);
    return response.data;
  },

  delete: async (calculationId: number): Promise<void> => {
    await api.delete(`/water-calculations/${calculationId}`);
  },
};
