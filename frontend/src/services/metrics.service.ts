import api from "./api.service";
import type { MetricsResponse } from "../interfaces/metrics.interface";

export const metricsService = {
  getTotalSaved: async (): Promise<MetricsResponse> => {
    const response = await api.get<MetricsResponse>("/metrics/saved");
    return response.data;
  },

  getUserSavings: async (userId: number):Promise<MetricsResponse> => {
    const response = await api.get<MetricsResponse>(`/metrics/user/${userId}/saved`);
    return response.data;
  }
};
