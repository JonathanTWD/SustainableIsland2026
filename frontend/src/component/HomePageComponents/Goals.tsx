import ProgressBar from "./ProgressBar";

interface GoalsProps {
    WaterSavedToday ?: number;
    WaterSavedTotal ?: number;
    Goal ?: number;
    Users ?: number;
}

const Goals = (GoalsProps: GoalsProps) => {
    return (
        <>
        <div className="flex flex-col items-center">
            <h2 className="font-kalam font-bold text-[40px]">
                Global Goals
            </h2>
            <div className="flex flex-col gap-4 items-center font-nunito font-medium text-[14px]">
                <p>Join a global community reducing water use.</p>
                <p>136 L of water saved today</p>
                <p>100.000 L / 1.000.000 L  of water saved in 2026</p>
                <ProgressBar />
                <p className="font-nunito font-bold text-[16px] mt-12">
                    430 people are saving water right now.
                </p>
            </div>
            
        </div>
        </>
    );
}   

export default Goals;