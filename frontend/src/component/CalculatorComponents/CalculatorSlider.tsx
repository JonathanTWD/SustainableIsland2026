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

    const progress = ((props.value - props.min) / (props.max - props.min)) * 100;

    return (
        <div className="space-y-1">
            <p className="text-[16px] font-nunito font-medium">{props.title}</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
                onBlur={handleCommit}
                className="slider w-full"
                style={{ '--progress': `${progress}` } as React.CSSProperties}
            />
            <p className="text-sm font-nunito font-medium text-secondary">
                {props.subText}: <span>{props.value}</span>
            </p>
        </div>
    );
};