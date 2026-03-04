interface WaterSliderProps {
    value: number;
    onChange: (value: number) => void;
    onCommit?: (value: number) => void;
    min: number;
    max: number;
    title?: string;
    subText?: string;
}

export const Slider = (props: WaterSliderProps) => {
    const handleCommit = () => {
        props.onCommit?.(props.value);
    };

    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-800">{props.title}</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
                onBlur={handleCommit}
                className="slider w-full accent-blue-600"
            />
            <p className="text-sm text-gray-600">
                {props.subText}: <span className="font-semibold text-gray-900">{props.value}</span>
            </p>
        </div>
    );
};