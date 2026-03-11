import type { CalculatorFormState } from "./types";

const LITERS_PER_SHOWER_MINUTE = 8;
const LITERS_PER_FLUSH = 4.5;
const LITERS_PER_LAUNDRY_LOAD = 45;
const LITERS_PER_DISHWASHER_CYCLE = 10;
const LITERS_PER_MEAT_SERVING = 1700;
const LITERS_PER_COFFEE_CUP = 140;
const LITERS_PER_CLOTHING_ITEM = 2700;

export const calculateDailyConsumption = (form: CalculatorFormState): number => {
    const showerPerDay = form.householdMembers * form.showerMinutesPerDay * LITERS_PER_SHOWER_MINUTE;
    const toiletPerDay = form.householdMembers * form.toiletFlushesPerDay * LITERS_PER_FLUSH;
    const laundryPerDay = (form.laundryPerWeek * form.householdMembers * LITERS_PER_LAUNDRY_LOAD) / 7;
    const dishwasherPerDay = (form.dishwasherPerWeek * form.householdMembers * LITERS_PER_DISHWASHER_CYCLE) / 7;
    const meatPerDay = (form.meatServingsPerWeek * form.householdMembers * LITERS_PER_MEAT_SERVING) / 7;
    const coffeePerDay = form.coffeeCupsPerDay * form.householdMembers * LITERS_PER_COFFEE_CUP;
    const clothesPerDay = (form.clothesPurchasedPerMonth * form.householdMembers * LITERS_PER_CLOTHING_ITEM) / 30;

    return Math.round(showerPerDay + toiletPerDay + laundryPerDay + dishwasherPerDay + meatPerDay + coffeePerDay + clothesPerDay);
};