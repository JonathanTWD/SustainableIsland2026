import { useState } from "react";

const ToggleSwitch = () => {
    const [isToggled, setIsToggled] = useState(false);

return(
    <>
    <button
        onClick={() => setIsToggled(!isToggled)}
        className="w-[50px] h-[29px] flex items-center rounded-full p-0.5 bg-[#1AD0CD] border-2 border-[#0A302F]"
    >
        <div className={`w-[23px] h-[23px] rounded-full bg-[#0A302F] transition-transform duration-300 ${
            isToggled ? "translate-x-[19px]" : "translate-x-0"}`}/>
    </button>
    </>
);
};

export default ToggleSwitch;