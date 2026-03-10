import type { CalculatorFormState } from "./types";

const LITERS_PER_SHOWER_MINUTE = 8;
const LITERS_PER_FLUSH = 4.5;
const LITERS_PER_LAUNDRY_LOAD = 45;
const LITERS_PER_DISHWASHER_CYCLE = 10;

export const calculateDailyConsumption = (form: CalculatorFormState): number => {
    const showerPerDay = form.householdMembers * form.showerMinutesPerDay * LITERS_PER_SHOWER_MINUTE;
    const toiletPerDay = form.householdMembers * form.toiletFlushesPerDay * LITERS_PER_FLUSH;
    const householdScale = form.householdMembers / 2;
    const laundryPerDay = (form.laundryPerWeek * householdScale * LITERS_PER_LAUNDRY_LOAD) / 7;
    const dishwasherPerDay = (form.dishwasherPerWeek * householdScale * LITERS_PER_DISHWASHER_CYCLE) / 7;

    return Math.round(showerPerDay + toiletPerDay + laundryPerDay + dishwasherPerDay);
};