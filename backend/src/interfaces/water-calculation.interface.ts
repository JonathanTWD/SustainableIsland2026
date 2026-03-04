export interface WaterCalculation {
  id: number
  user_id: number

  household_members: number
  shower_minutes: number
  laundry_per_week: number
  dishwasher_per_week: number

  meat_servings_per_week: number
  coffee_cups_per_week: number
  clothes_purchased_per_month: number

  digital_services_hours_per_day: number

  estimated_daily_consumption: number
  created_at: Date
}