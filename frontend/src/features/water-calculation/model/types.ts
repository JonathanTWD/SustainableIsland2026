export type CalculatorFormState = {
    householdMembers: number;
    showerMinutesPerDay: number;
    toiletFlushesPerDay: number; // UI-only indtil backend har feltet
    laundryPerWeek: number;
    dishwasherPerWeek: number;
    meatServingsPerWeek: number;
    coffeeCupsPerWeek: number;
    clothesPurchasedPerMonth: number;
    digitalServicesHoursPerDay: number;
};

export type TipData = {
    title: string;
    fact: string;
    calculation: string;
};