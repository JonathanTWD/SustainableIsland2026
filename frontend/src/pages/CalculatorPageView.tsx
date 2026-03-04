import { useMemo, useState } from "react";
import { Slider } from "../component/CalculatorComponents/CalculatorSlider";
import { WaterDropLogo } from "../component/CalculatorComponents/WaterDropLogo";

export const CalculatorPage = () => {
    const [people, setPeople] = useState(1);
    const [showerMinutes, setShowerMinutes] = useState(10);
    const [toiletFlushes, setToiletFlushes] = useState(5);
    const [laundryLoads, setLaundryLoads] = useState(2);         // baseline: household/week (for 2 people)
    const [dishwasherCycles, setDishwasherCycles] = useState(1); // baseline: household/week (for 2 people)

    // More realistic default values (can later come from an API)
    const LITERS_PER_SHOWER_MINUTE = 8;   // typical low-flow shower ~7-10
    const LITERS_PER_FLUSH = 4.5;         // average dual-flush value
    const LITERS_PER_LAUNDRY_LOAD = 45;   // modern washing machine ~40-60
    const LITERS_PER_DISHWASHER_CYCLE = 10; // eco dishwasher ~9-12

    const totalLitersPerDay = useMemo(() => {
        const showerPerDay = people * showerMinutes * LITERS_PER_SHOWER_MINUTE;
        const toiletPerDay = people * toiletFlushes * LITERS_PER_FLUSH;

        // Scale household activities by number of people (2 people = baseline 1.0)
        const householdScale = people / 2;

        const laundryPerDay =
            (laundryLoads * householdScale * LITERS_PER_LAUNDRY_LOAD) / 7;

        const dishwasherPerDay =
            (dishwasherCycles * householdScale * LITERS_PER_DISHWASHER_CYCLE) / 7;

        return Math.round(showerPerDay + toiletPerDay + laundryPerDay + dishwasherPerDay);
    }, [people, showerMinutes, toiletFlushes, laundryLoads, dishwasherCycles]);

    return (
        <>
            <WaterDropLogo title="Total" Subtext="Liters of water per day" value={totalLitersPerDay} />
            <div>
                <Slider title="How many people in your household" subText="people in house" value={people} onChange={setPeople} min={1} max={6} />
                <Slider title="Shower Time" subText="minutes" value={showerMinutes} onChange={setShowerMinutes} min={0} max={30} />
                <Slider title="Toilet Flushes" subText="flushes per day" value={toiletFlushes} onChange={setToiletFlushes} min={0} max={20} />
                <Slider title="Laundry Loads" subText="loads per week (household baseline)" value={laundryLoads} onChange={setLaundryLoads} min={0} max={10} />
                <Slider title="Dishwasher Cycles" subText="cycles per week (household baseline)" value={dishwasherCycles} onChange={setDishwasherCycles} min={0} max={10} />
            </div>
        </>
    );
};