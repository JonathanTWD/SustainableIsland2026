
interface ProgressBarProps {
    percentage?: number;
}

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
    return (
        <div className="relative w-full">
            <div className="w-full h-2 bg-primary dark:bg-white rounded-full relative">
                <div
                    className="absolute left-0 top-0 h-full bg-secondary dark:bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {/* Percentage label */}
            <div className="absolute mt-2 flex flex-col items-center"
                style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
            >
                {/* Arrow */}
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-neutral-100" />
                {/* Card */}
                <div className="-mt-px bg-neutral-100 rounded-xl shadow-md px-3 py-2">
                    <span className="font-nunito font-medium text-[12px] text-black">
                        {percentage}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;