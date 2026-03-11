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
    const stop = `calc(12px + (100% - 24px) * ${progress / 100})`;

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
                style={{ '--slider-bg': `linear-gradient(to right, #0A302F 0%, #0A302F ${stop}, #1AD0CD ${stop}, #1AD0CD 100%)` } as React.CSSProperties}
            />
            <p className="text-sm font-nunito font-medium text-secondary">
                {props.subText}: <span>{props.value}</span>
            </p>
        </div>
    );
};