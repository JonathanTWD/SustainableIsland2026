import { useState } from "react";

export const WaterSlider = () => {
    const [value, setValue] = useState(0);

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-xl w-96">

            <h2 className="text-2xl font-semibold">
                Water Usage
            </h2>

            <p className="text-4xl font-bold text-blue-600">
                {value} L
            </p>

            <input
                type="range"
                min="0"
                max="200"
                value={value}
                onChange={(e) => setValue(+e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    );
}