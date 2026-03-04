
interface WaterSliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;

}

export const WaterSlider = (props: WaterSliderProps) => {
 

    return (
        <>
        <p>Water Usage</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}
                className="slider"
            />
             <p>Value: {props.value}</p>
        </>
    );
}