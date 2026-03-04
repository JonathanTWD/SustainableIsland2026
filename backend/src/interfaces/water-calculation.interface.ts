export interface WaterCalculation {
  id: number
  user_id: number

  household_members: number | null
  shower_minutes_per_day: number | null
  laundry_per_week: number | null
  dishwasher_per_week: number | null

  meat_servings_per_week: number | null
  coffee_cups_per_week: number | null
  clothes_purchased_per_month: number | null

  digital_services_hours_per_day: number | null

  estimated_daily_consumption: number | null
  created_at: Date
}

export interface CreateWaterCalculationDTO {
  user_id: number
  household_members?: number
  shower_minutes_per_day?: number
  laundry_per_week?: number
  dishwasher_per_week?: number
  meat_servings_per_week?: number
  coffee_cups_per_week?: number
  clothes_purchased_per_month?: number
  digital_services_hours_per_day?: number
  estimated_daily_consumption?: number
}

export interface UpdateWaterCalculationDTO {
  household_members?: number
  shower_minutes_per_day?: number
  laundry_per_week?: number
  dishwasher_per_week?: number
  meat_servings_per_week?: number
  coffee_cups_per_week?: number
  clothes_purchased_per_month?: number
  digital_services_hours_per_day?: number
  estimated_daily_consumption?: number
}

export type WaterCalculationResponse = WaterCalculation