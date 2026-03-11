import { useEffect, useState } from "react";
import { Slider } from "../component/Slider/Slider";
import { WaterDropLogo } from "../component/CalculatorComponents/WaterDropLogo";
import { SliderFactPopup } from "../component/CalculatorComponents/SliderFactPopup";
import { Header } from "../component/Header/Header";
import { useWaterCalculation } from "../features/water-calculation/hooks/useWaterCalculation";
import type { TipData } from "../features/water-calculation/model/types";

export const CalculatorPage = () => {
    const { form, setField, totalLitersPerDay, loading, saving, error, loadInitial, save } =
        useWaterCalculation();

    const [tip, setTip] = useState<TipData | null>(null);

    const LITERS_PER_SHOWER_MINUTE = 8;
    const LITERS_PER_FLUSH = 4.5;
    const LITERS_PER_LAUNDRY_LOAD = 45;
    const LITERS_PER_DISHWASHER_CYCLE = 10;
    const LITERS_PER_MEAT_SERVING = 1500;
    const LITERS_PER_COFFEE_CUP = 140;
    const LITERS_PER_NEW_CLOTHES = 2700;

    const totalLitersPerDay = useMemo(() => {
        const showerPerDay = people * showerMinutes * LITERS_PER_SHOWER_MINUTE;
        const toiletPerDay = people * toiletFlushes * LITERS_PER_FLUSH;
        const householdScale = people / 2;
        const laundryPerDay = (laundryLoads * householdScale * LITERS_PER_LAUNDRY_LOAD) / 7;
        const dishwasherPerDay = (dishwasherCycles * householdScale * LITERS_PER_DISHWASHER_CYCLE) / 7;
        const meatPerWeek = (people * meatServing * LITERS_PER_MEAT_SERVING) / 7;
        const coffeePerDay = people * coffeeCups * LITERS_PER_COFFEE_CUP;
        const clothesPerMonth = (people * newClothes * LITERS_PER_NEW_CLOTHES) / 30;

        return Math.round(showerPerDay + toiletPerDay + laundryPerDay + dishwasherPerDay + meatPerWeek + coffeePerDay + clothesPerMonth);
    }, [people, showerMinutes, toiletFlushes, laundryLoads, dishwasherCycles, meatServing, coffeeCups, newClothes]);

    useEffect(() => {
        if (!tip) return;
        const timer = window.setTimeout(() => setTip(null), 5000);
        return () => window.clearTimeout(timer);
    }, [tip]);

    const showShowerTip = (minutes: number) => {
        const liters = minutes * LITERS_PER_SHOWER_MINUTE;
        setTip({
            title: "Shower insight",
            fact: "Average shower length is around 8 minutes.",
            calculation: `${minutes} min x ${LITERS_PER_SHOWER_MINUTE} L/min = ${liters} L per shower`,
        });
    };

    const showToiletTip = (flushes: number) => {
        const liters = flushes * LITERS_PER_FLUSH;
        setTip({
            title: "Toilet insight",
            fact: "Modern toilets often use around 3-6 liters per flush.",
            calculation: `${flushes} flushes x ${LITERS_PER_FLUSH} L = ${liters.toFixed(1)} L per person/day`,
        });
    };

    return (
        <>
            <Header />
            <main className="mx-auto min-h-screen w-full max-w-sm bg-slate-50 px-4 pb-24 pt-4">
                <section className="space-y-4">
                    <WaterDropLogo title="Total" Subtext="Liters of water per day" value={totalLitersPerDay} />

                    {loading && (
                        <p className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-600">Loading your saved data...</p>
                    )}

                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
                    )}

                    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <Slider
                            title="How many people in your household"
                            subText="people in house"
                            value={form.householdMembers}
                            onChange={(value) => setField("householdMembers", value)}
                            min={1}
                            max={6}
                        />

                        <Slider
                            title="Shower Time"
                            subText="minutes"
                            value={form.showerMinutesPerDay}
                            onChange={(value) => setField("showerMinutesPerDay", value)}
                            onCommit={showShowerTip}
                            min={0}
                            max={30}
                        />

                        <Slider
                            title="Toilet Flushes"
                            subText="flushes per day"
                            value={form.toiletFlushesPerDay}
                            onChange={(value) => setField("toiletFlushesPerDay", value)}
                            onCommit={showToiletTip}
                            min={0}
                            max={20}
                        />

                        <Slider
                            title="Laundry Loads"
                            subText="loads per week"
                            value={form.laundryPerWeek}
                            onChange={(value) => setField("laundryPerWeek", value)}
                            min={0}
                            max={10}
                        />

                        <Slider
                            title="Dishwasher Cycles"
                            subText="cycles per week"
                            value={form.dishwasherPerWeek}
                            onChange={(value) => setField("dishwasherPerWeek", value)}
                            min={0}
                            max={10}
                        />

                        <button
                            type="button"
                            onClick={() => void save()}
                            disabled={loading || saving}
                            className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-sky-300"
                        >
                            {saving ? "Saving..." : "Save calculation"}
                        </button>
                    </div>
                </section>

                {tip && (
                    <SliderFactPopup
                        title={tip.title}
                        fact={tip.fact}
                        calculation={tip.calculation}
                        onClose={() => setTip(null)}
                    />
                )}
            </main>
        </>
    );
};

