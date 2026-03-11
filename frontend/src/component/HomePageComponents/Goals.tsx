import { Description } from "../SubText/Description";
import ProgressBar from "./ProgressBar";

interface GoalsProps {
    WaterSavedToday?: number;
    WaterSavedTotal?: number;
    Goal?: number;
    Users?: number;
}

const Goals = ({ WaterSavedToday, WaterSavedTotal, Goal, Users }: GoalsProps) => {
    return (
        <>
            <div className="flex flex-col items-center">
                <h2 className="font-kalam font-bold text-[40px]">
                    Global Goals
                </h2>
                <div className="flex flex-col gap-4 items-center font-nunito font-medium text-[14px]">
                    <Description text="Join a global community reducing water use." />
                    <Description text="136 L of water saved today" />
                    <Description text="100.000 L / 1.000.000 L  of water saved in 2026" />
                    <ProgressBar />
                    <Description text="430 people are saving water right now." />
                </div>

            </div>
        </>
    );
}

export default Goals;