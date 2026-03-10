import type {
    CreateWaterCalculationDTO,
    UpdateWaterCalculationDTO,
    WaterCalculationResponse,
} from "../../../interfaces/water-calculation.interface";
import type { CalculatorFormState } from "./types";

const toNumberOrDefault = (value: number | null | undefined, fallback = 0): number => {
    return typeof value === "number" ? value : fallback;
};

export const fromApiToForm = (record: WaterCalculationResponse): CalculatorFormState => {
    return {
        householdMembers: toNumberOrDefault(record.household_members, 1),
        showerMinutesPerDay: toNumberOrDefault(record.shower_minutes_per_day, 10),
        toiletFlushesPerDay: 5, // UI-only indtil backend har feltet
        laundryPerWeek: toNumberOrDefault(record.laundry_per_week, 2),
        dishwasherPerWeek: toNumberOrDefault(record.dishwasher_per_week, 1),
        meatServingsPerWeek: toNumberOrDefault(record.meat_servings_per_week, 0),
        coffeeCupsPerWeek: toNumberOrDefault(record.coffee_cups_per_week, 0),
        clothesPurchasedPerMonth: toNumberOrDefault(record.clothes_purchased_per_month, 0),
        digitalServicesHoursPerDay: toNumberOrDefault(record.digital_services_hours_per_day, 0),
    };
};

export const toCreateWaterCalculationDTO = (
    form: CalculatorFormState,
    userId: number,
    estimatedDailyConsumption: number,
): CreateWaterCalculationDTO => {
    return {
        user_id: userId,
        household_members: form.householdMembers,
        shower_minutes_per_day: form.showerMinutesPerDay,
        laundry_per_week: form.laundryPerWeek,
        dishwasher_per_week: form.dishwasherPerWeek,
        meat_servings_per_week: form.meatServingsPerWeek,
        coffee_cups_per_week: form.coffeeCupsPerWeek,
        clothes_purchased_per_month: form.clothesPurchasedPerMonth,
        digital_services_hours_per_day: form.digitalServicesHoursPerDay,
        estimated_daily_consumption: estimatedDailyConsumption,
    };
};

export const toUpdateWaterCalculationDTO = (
    form: CalculatorFormState,
    estimatedDailyConsumption: number,
): UpdateWaterCalculationDTO => {
    return {
        household_members: form.householdMembers,
        shower_minutes_per_day: form.showerMinutesPerDay,
        laundry_per_week: form.laundryPerWeek,
        dishwasher_per_week: form.dishwasherPerWeek,
        meat_servings_per_week: form.meatServingsPerWeek,
        coffee_cups_per_week: form.coffeeCupsPerWeek,
        clothes_purchased_per_month: form.clothesPurchasedPerMonth,
        digital_services_hours_per_day: form.digitalServicesHoursPerDay,
        estimated_daily_consumption: estimatedDailyConsumption,
    };
};