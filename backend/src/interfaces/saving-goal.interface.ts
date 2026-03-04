export interface SavingGoal {
  id: number
  user_id: number
  target_liters_per_day: number
  yearly_target_liters?: number   // opcional
  created_at: Date
}