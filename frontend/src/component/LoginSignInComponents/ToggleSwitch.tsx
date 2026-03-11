import { useState } from "react";

const ToggleSwitch = () => {
    const [isToggled, setIsToggled] = useState(false);

return(
    <>
    <button
        onClick={() => setIsToggled(!isToggled)}
        className="w-12.5 h-7.25 flex items-center rounded-full p-0.5 bg-primary border-2 border-secondary"
    >
        <div className={`w-5.75 h-5.75 rounded-full bg-secondary transition-transform duration-300 ${
            isToggled ? "translate-x-4.75" : "translate-x-0"}`}/>
    </button>
    </>
);
};

export default ToggleSwitch;