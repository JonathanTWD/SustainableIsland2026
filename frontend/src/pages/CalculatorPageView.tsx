import { useEffect, useState } from "react";
import { Slider } from "../component/CalculatorComponents/CalculatorSlider";
import { WaterDropLogo } from "../component/CalculatorComponents/WaterDropLogo";
import { SliderFactPopup } from "../component/CalculatorComponents/SliderFactPopup";
import { Description } from "../component/SubText/Description";
import { useWaterCalculation } from "../features/water-calculation/hooks/useWaterCalculation";
import type { TipData } from "../features/water-calculation/model/types";

export const CalculatorPage = () => {
    const {
        form,
        setField,
        totalLitersPerDay,
        directLitersPerDay,
        indirectLitersPerDay,
        loading,
        saving,
        error,
        loadInitial,
        save,
    } = useWaterCalculation();

    const [tip, setTip] = useState<TipData | null>(null);

    const [showSavedToast, setShowSavedToast] = useState(false);

    const handleSave = async () => {
        const ok = await save();
        if (!ok) return;

        setShowSavedToast(true);
        window.setTimeout(() => setShowSavedToast(false), 2500);
    };

    const LITERS_PER_SHOWER_MINUTE = 8;
    const LITERS_PER_FLUSH = 4.5;
    const LITERS_PER_LAUNDRY_LOAD = 45;
    const LITERS_PER_DISHWASHER_CYCLE = 10;
    const LITERS_PER_MEAT_SERVING = 1700;
    const LITERS_PER_COFFEE_CUP = 140;
    const LITERS_PER_CLOTHING_ITEM = 2700;

    useEffect(() => {
        void loadInitial();
    }, [loadInitial]);

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

    const showLaundryTip = (loads: number) => {
        const liters = loads * LITERS_PER_LAUNDRY_LOAD;
        setTip({
            title: "Laundry insight",
            fact: "A modern washing machine uses around 45 liters per load.",
            calculation: `${loads} loads x ${LITERS_PER_LAUNDRY_LOAD} L = ${liters} L per week`,
        });
    };

    const showDishwasherTip = (cycles: number) => {
        const liters = cycles * LITERS_PER_DISHWASHER_CYCLE;
        setTip({
            title: "Dishwasher insight",
            fact: "A dishwasher uses less water than washing by hand — about 10 liters per cycle.",
            calculation: `${cycles} cycles x ${LITERS_PER_DISHWASHER_CYCLE} L = ${liters} L per week`,
        });
    };

    const showMeatTip = (servings: number) => {
        const liters = Math.round((servings * LITERS_PER_MEAT_SERVING) / 7);
        setTip({
            title: "Meat insight",
            fact: "Producing 1 serving of meat requires around 1,700 L of virtual water on average.",
            calculation: `${servings} servings x ${LITERS_PER_MEAT_SERVING} L / 7 = ${liters} L/day`,
        });
    };

    const showCoffeeTip = (cups: number) => {
        const liters = cups * LITERS_PER_COFFEE_CUP;
        setTip({
            title: "Coffee insight",
            fact: "Growing and processing coffee beans takes about 140 liters per cup.",
            calculation: `${cups} cups x ${LITERS_PER_COFFEE_CUP} L = ${liters} L/day`,
        });
    };

    const showClothesTip = (items: number) => {
        const liters = Math.round((items * LITERS_PER_CLOTHING_ITEM) / 30);
        setTip({
            title: "Clothing insight",
            fact: "A single cotton garment takes around 2,700 liters of water to produce.",
            calculation: `${items} items x ${LITERS_PER_CLOTHING_ITEM} L / 30 = ${liters} L/day`,
        });
    };

    return (
        <>
            <main className="mx-auto my-16 min-h-screen w-full max-w-sm px-4 pb-24 pt-4">
                <section className="space-y-4">
                    <WaterDropLogo title="Total" Subtext="Liters of water per day" value={totalLitersPerDay} />

                    <div className="rounded-xl border border-gray-200 bg-white p-3">
                        <Description className="text-sm text-gray-700" text={`Direct water: ${directLitersPerDay} L/day`} />
                        <Description className="text-sm text-gray-700" text={`Indirect water: ${indirectLitersPerDay} L/day`} />
                        <Description
                            className="mt-1 text-sm font-semibold text-gray-900"
                            text={`Total water: ${directLitersPerDay} + ${indirectLitersPerDay} = ${totalLitersPerDay} L/day`}
                        />
                    </div>

                    {loading && (
                        <Description 
                            className="my-4 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-600" 
                            text="Loading your saved data..." />
                    )}

                    {error && (
                        <Description 
                            className="my-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" 
                            text={error} />
                    )}

                    <div className="space-y-6">
                        <Slider
                            title="Number of people in your household"
                            subText="Number of people"
                            value={form.householdMembers}
                            onChange={(value) => setField("householdMembers", value)}
                            min={1}
                            max={10}
                        />

                        <Slider
                            title="Shower Time"
                            subText="Shower minutes"
                            value={form.showerMinutesPerDay}
                            onChange={(value) => setField("showerMinutesPerDay", value)}
                            onCommit={showShowerTip}
                            min={0}
                            max={60}
                        />

                        <Slider
                            title="Toilet Flushes"
                            subText="Toilet flushes per day"
                            value={form.toiletFlushesPerDay}
                            onChange={(value) => setField("toiletFlushesPerDay", value)}
                            onCommit={showToiletTip}
                            min={0}
                            max={20}
                        />

                        <Slider
                            title="Laundry Loads"
                            subText="Loads per week"
                            value={form.laundryPerWeek}
                            onChange={(value) => setField("laundryPerWeek", value)}
                            onCommit={showLaundryTip}
                            min={0}
                            max={10}
                        />

                        <Slider
                            title="Dishwasher Cycles"
                            subText="Cycles per week"
                            value={form.dishwasherPerWeek}
                            onChange={(value) => setField("dishwasherPerWeek", value)}
                            onCommit={showDishwasherTip}
                            min={0}
                            max={10}
                        />

                        <Slider
                            title="Meat servings"
                            subText="Servings per week"
                            value={form.meatServingsPerWeek}
                            onChange={(value) => setField("meatServingsPerWeek", value)}
                            onCommit={showMeatTip}
                            min={0}
                            max={20}
                        />

                        <Slider
                            title="Coffee cups"
                            subText="Cups per Day"
                            value={form.coffeeCupsPerDay}
                            onChange={(value) => setField("coffeeCupsPerDay", value)}
                            onCommit={showCoffeeTip}
                            min={0}
                            max={10}
                        />

                        <Slider
                            title="New clothes"
                            subText="Items per month"
                            value={form.clothesPurchasedPerMonth}
                            onChange={(value) => setField("clothesPurchasedPerMonth", value)}
                            onCommit={showClothesTip}
                            min={0}
                            max={30}
                        />

                        <button
                            type="button"
                            onClick={() => void handleSave()}
                            disabled={loading || saving}
                            className="w-full rounded-xl bg-primary px-4 py-3 text-[16px] font-nunito font-semibold text-black disabled:cursor-not-allowed hover:bg-accent cursor-pointer"
                        >
                            {saving ? "Saving..." : "Save calculation"}
                        </button>
                    </div>
                </section>

                {showSavedToast && (
                    <div className="fixed inset-x-4 bottom-24 z-50 rounded-xl border border-green-200 bg-green-50 p-3 shadow-sm">
                        <Description className="text-sm font-semibold text-green-800" text="Your data has been saved." />
                    </div>
                )}

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

