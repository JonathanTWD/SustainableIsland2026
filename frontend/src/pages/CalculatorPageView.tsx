import { Slider } from "../component/CalculatorComponents/CalculatorSlider"
import { WaterDropLogo } from "../component/CalculatorComponents/WaterDropLogo"

export const CalculatorPage = () => {
    return (
        <>
            <WaterDropLogo title="Total" Subtext="Liters of water per day" value={50} />
            <div>
                
                <Slider title="How many people in your household" subText="people in house"  value={0} onChange={(value) => (value)} min={1} max={6} />
                <Slider title="Shower Time" subText="minutes" value={10} onChange={(value) => (value)} min={0} max={30} />
                <Slider title="Toilet Flushes" subText="flushes per day" value={5} onChange={(value) => (value)} min={0} max={20} />
                <Slider title="Laundry Loads" subText="loads per week" value={2} onChange={(value) => (value)} min={0} max={10} />
                <Slider title="Dishwasher Cycles" subText="cycles per week"  value={1} onChange={(value) => (value)} min={0} max={10} />
            </div>
        </>
    )
}