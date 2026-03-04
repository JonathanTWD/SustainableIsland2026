import { WaterSlider } from "../component/pages/CalculatorSlider"

export const CalculatorPage = () => {
    return (
        <div>
            <WaterSlider value={50} onChange={(value) => (value)} min={0} max={100} step={1} />
        </div>
    )
}