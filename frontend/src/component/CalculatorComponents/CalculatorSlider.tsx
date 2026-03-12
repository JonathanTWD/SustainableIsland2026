import { Description } from "../SubText/Description";
import { useTheme } from "../../context/ThemeContext";

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
    const { isDarkMode } = useTheme();

    const handleCommit = () => {
        props.onCommit?.(props.value);
    };

    const progress = ((props.value - props.min) / (props.max - props.min)) * 100;
    const stop = `calc(12px + (100% - 24px) * ${progress / 100})`;

    const filled = isDarkMode ? '#1AD0CD' : '#0A302F';
    const unfilled = isDarkMode ? '#ffffff' : '#1AD0CD';

    return (
        <div className="space-y-2">
            <Description text={props.title ?? ""} className="text-[16px] font-medium" />
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
                style={{ '--slider-bg': `linear-gradient(to right, ${filled} 0%, ${filled} ${stop}, ${unfilled} ${stop}, ${unfilled} 100%)` } as React.CSSProperties}
            />
            <Description text={`${props.subText}: ${props.value}`} className="text-sm font-medium text-secondary dark:text-white" />
        </div>
    );
};