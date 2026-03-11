import { Input } from "../../component/Input/Input";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    onCommit?: (value: number) => void;
    min: number;
    max: number;
    title?: string;
    subText?: string;
}

export function Slider({ value, onChange, onCommit, min, max, title, subText }: SliderProps) {
    return (
        <Input
            value={value}
            onChange={onChange}
            onCommit={onCommit}
            min={min}
            max={max}
            title={title}
            text={subText}
        />


    )
}