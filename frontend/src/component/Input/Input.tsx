import { useState } from "react"

interface WaterCalcProps {
    value: number
    onChange: (value: number) => void
    onCommit?: (value: number) => void
    min: number
    max: number
    title?: string
    text?: string
}

export function Input(props: WaterCalcProps) {
    const [waterValue, setWaterValue] = useState(props.value)
    const percentage =
        ((waterValue - props.min) / (props.max - props.min)) * 100

    return (
        <>
            <p className="text-black">{props.title}</p>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={waterValue}
                onChange={(e) => {
                    const newValue = Number(e.target.value)
                    setWaterValue(newValue)
                    props.onChange(newValue)
                }}
                onMouseUp={() => props.onCommit?.(waterValue)}
                onTouchEnd={() => props.onCommit?.(waterValue)}
                onKeyUp={(e) => {
                    if (e.key === "Enter" || e.key === " ") props.onCommit?.(waterValue)
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider touch-none slider"
                style={{
                    background: `linear-gradient(to right, #1AD0CD ${percentage}%, #ffffff ${percentage}%)`
                }}
            />
            <p className="text-black flex justify-between">
                {Array.from({ length: 6 }, (_, i) => {
                    const value = props.min + i * ((props.max - props.min) / 5)
                    return (
                        <span key={i} className="text-sm">
                            {value}
                        </span>
                    )
                })}
            </p>
            <p className="text-black text-right">{props.text || '\u00A0'}</p>
        </>
    )
}