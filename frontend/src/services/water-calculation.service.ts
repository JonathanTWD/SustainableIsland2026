import api from "./api.service";
import { 
  type WaterCalculationResponse, 
  type CreateWaterCalculationDTO, 
  type UpdateWaterCalculationDTO 
} from "../interfaces/water-calculation.interface";

export const waterCalculationService = {
  /**
   * Get all water calculations for a specific user
   * @param userId The ID of the user
   */
  getByUserId: async (userId: number): Promise<WaterCalculationResponse[]> => {
    const response = await api.get<WaterCalculationResponse[]>(`/water-calculations/user/${userId}`);
    return response.data;
  },

  /**
   * Create a new water calculation for a user
   * @param data The water calculation data to create
   */
  create: async (data: CreateWaterCalculationDTO): Promise<WaterCalculationResponse> => {
    const response = await api.post<WaterCalculationResponse>("/water-calculations", data);
    return response.data;
  },

  /**
   * Update an existing water calculation
   * @param calculationId The ID of the calculation to update
   * @param data The properties to update
   */
  update: async (calculationId: number, data: UpdateWaterCalculationDTO): Promise<WaterCalculationResponse> => {
    const response = await api.put<WaterCalculationResponse>(`/water-calculations/${calculationId}`, data);
    return response.data;
  },

  /**
   * Delete a water calculation
   * @param calculationId The ID of the calculation to delete
   */
  delete: async (calculationId: number): Promise<void> => {
    await api.delete(`/water-calculations/${calculationId}`);
  },
};
