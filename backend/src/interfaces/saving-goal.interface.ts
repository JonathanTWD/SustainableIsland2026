export interface SavingGoal {
  id: number;
  user_id: number;
  target_liters_per_day: number | null;
  yearly_target_liters: number | null;
  created_at: Date;
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

export type SavingGoalResponse = SavingGoal;