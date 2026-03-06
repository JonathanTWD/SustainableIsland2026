import { useMemo } from "react";

interface Tip {
    id: string;
    title: string;
    description: string;
}

const WATER_TIPS: Tip[] = [
    { id: "1", title: "Shorter showers", description: "Cut 2-3 minutes from your shower and save many liters of water." },
    { id: "2", title: "Turn off the tap", description: "Turn off the water while brushing your teeth or soaping your hands." },
    { id: "3", title: "Full dishwasher loads", description: "Only run the dishwasher when it is completely full." },
    { id: "4", title: "Full laundry loads", description: "Wash clothes in full loads and use the eco program." },
    { id: "5", title: "Fix leaks", description: "A dripping tap can waste a surprising amount of water over time." },
    { id: "6", title: "Collect cold water", description: "Collect the water while waiting for it to heat up and use it for plants." },
    { id: "7", title: "Water plants smartly", description: "Water early in the morning or late in the evening to reduce evaporation." },
    { id: "8", title: "Use short rinses", description: "Use short rinses instead of multiple long ones." },
    { id: "9", title: "Cook with lids", description: "Food cooks faster and requires less water/energy." },
    { id: "10", title: "Thaw in the fridge", description: "Avoid thawing food under running water." },
    { id: "11", title: "Reuse rainwater", description: "Rainwater can be used for garden watering." },
    { id: "12", title: "Use less toilet flush water", description: "Use a small flush when possible." }
];

const pickRandomTips = (tips: Tip[], count: number) => {
    return [...tips].sort(() => Math.random() - 0.5).slice(0, count);
};

export const InformationTips = () => {
    const tipsToShow = useMemo(() => pickRandomTips(WATER_TIPS, 8), []);

    return (
        <section>
            <div>
                {tipsToShow.map((tip) => (
                    <article key={tip.id} >
                        <h3 >{tip.title}</h3>
                        <p >{tip.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};