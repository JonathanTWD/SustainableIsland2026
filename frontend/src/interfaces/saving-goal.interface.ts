export interface SavingGoalResponse {
  id: number;
  user_id: number;
  target_liters_per_day: number | null;
  yearly_target_liters: number | null;
  created_at: string;
}

export interface CreateSavingGoalDTO {
  user_id: number;
  target_liters_per_day?: number;
  yearly_target_liters?: number;
}

export interface UpdateSavingGoalDTO {
  target_liters_per_day?: number;
  yearly_target_liters?: number;
}
