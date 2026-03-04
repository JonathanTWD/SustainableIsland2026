import { useState } from "react";

interface WaterSliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    title?: string;
    subText?: string;

}

export const Slider = (props: WaterSliderProps) => {
    const [waterValue, setWaterValue] = useState(props.value);

    return (
        <>
            <p>{props.title}</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={waterValue}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setWaterValue(newValue);
                    props.onChange(newValue);
                }}
                className="slider"
            />
            <p>{props.subText}: {waterValue}</p>
        </>
    );
}