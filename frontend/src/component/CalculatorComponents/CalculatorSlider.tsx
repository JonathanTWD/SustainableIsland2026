

interface WaterSliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    title?: string;
    subText?: string;

}

export const Slider = (props: WaterSliderProps) => {
    return (
        <>
            <p>{props.title}</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}
                className="slider"
            />
            <p>{props.subText}: {props.value}</p>
        </>
    );
}