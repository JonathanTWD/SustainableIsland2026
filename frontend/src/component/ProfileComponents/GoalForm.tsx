import { Description } from "../SubText/Description";

type Props = {
    goalName: string;
    goalTargetInput: string;
    saving: boolean;
    error: string | null;
    hasSavedGoal: boolean;
    onGoalNameChange: (value: string) => void;
    onGoalTargetChange: (value: string) => void;
    onSave: () => void;
    onResetOrDelete: () => void;
};

export const GoalForm = ({
    goalName,
    goalTargetInput,
    saving,
    error,
    hasSavedGoal,
    onGoalNameChange,
    onGoalTargetChange,
    onSave,
    onResetOrDelete,
}: Props) => (
    <div className="mx-4 mt-6 rounded-2xl border-2 border-medium p-4">
        <Description text="My Water Goal" className="text-[20px] font-bold text-secondary dark:text-accent" />
        <div className="mt-3 flex flex-col gap-3">
            <input
                type="text"
                placeholder="Goal name"
                value={goalName}
                onChange={(e) => onGoalNameChange(e.target.value)}
                className="border-2 border-secondary dark:border-white font-nunito text-lg placeholder-secondary dark:placeholder-white rounded-2xl px-4 py-3"
            />
            <input
                type="number"
                min={1}
                placeholder="Target liters per day"
                value={goalTargetInput}
                onChange={(e) => onGoalTargetChange(e.target.value)}
                className="border-2 border-secondary dark:border-white font-nunito text-lg placeholder-secondary dark:placeholder-white rounded-2xl px-4 py-3"
            />
            <div className="flex gap-3">
                <button type="button" onClick={onSave} className="flex-1 font-nunito font-semibold text-[18px] bg-medium text-white dark:bg-primary dark:text-black rounded-2xl px-6 py-2">
                    {saving ? "Saving..." : "Save goal"}
                </button>
                <button type="button" onClick={onResetOrDelete} className="flex-1 font-nunito font-semibold text-[18px] rounded-2xl px-6 py-2 border border-secondary dark:border-accent">
                    {hasSavedGoal ? "Delete goal" : "Reset"}
                </button>
            </div>
        </div>
        {error && <Description text={error} className="mt-2 text-sm text-red-600" />}
    </div>
);