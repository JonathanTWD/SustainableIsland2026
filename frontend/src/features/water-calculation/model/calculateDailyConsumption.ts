import type { CalculatorFormState } from "./types";

const LITERS_PER_SHOWER_MINUTE = 8;
const LITERS_PER_FLUSH = 4.5;
const LITERS_PER_LAUNDRY_LOAD = 45;
const LITERS_PER_DISHWASHER_CYCLE = 10;
const LITERS_PER_MEAT_SERVING = 1700;
const LITERS_PER_COFFEE_CUP = 140;
const LITERS_PER_CLOTHING_ITEM = 2700;
const LITERS_PER_DIGITAL_HOUR = 0.3;

export type DailyConsumptionBreakdown = {
    directLitersPerDay: number;
    indirectLitersPerDay: number;
    totalLitersPerDay: number;
};

export const calculateDailyConsumptionBreakdown = (
    form: CalculatorFormState,
): DailyConsumptionBreakdown => {
    const showerPerDay = form.householdMembers * form.showerMinutesPerDay * LITERS_PER_SHOWER_MINUTE;
    const toiletPerDay = form.householdMembers * form.toiletFlushesPerDay * LITERS_PER_FLUSH;
    const laundryPerDay = (form.laundryPerWeek * form.householdMembers * LITERS_PER_LAUNDRY_LOAD) / 7;
    const dishwasherPerDay = (form.dishwasherPerWeek * form.householdMembers * LITERS_PER_DISHWASHER_CYCLE) / 7;

    const meatPerDay = (form.meatServingsPerWeek * form.householdMembers * LITERS_PER_MEAT_SERVING) / 7;
    const coffeePerDay = form.coffeeCupsPerDay * form.householdMembers * LITERS_PER_COFFEE_CUP;
    const clothesPerDay = (form.clothesPurchasedPerMonth * form.householdMembers * LITERS_PER_CLOTHING_ITEM) / 30;
    const digitalPerDay = form.digitalServicesHoursPerDay * form.householdMembers * LITERS_PER_DIGITAL_HOUR;

    const directLitersPerDay = Math.round(showerPerDay + toiletPerDay + laundryPerDay + dishwasherPerDay);
    const indirectLitersPerDay = Math.round(meatPerDay + coffeePerDay + clothesPerDay + digitalPerDay);
    const totalLitersPerDay = directLitersPerDay + indirectLitersPerDay;

    return { directLitersPerDay, indirectLitersPerDay, totalLitersPerDay };
};

export const calculateDailyConsumption = (form: CalculatorFormState): number => {
    return calculateDailyConsumptionBreakdown(form).totalLitersPerDay;
};