import { Description } from "../SubText/Description";

type Props = {
  goalName: string;
  goalTarget: number | null;
  currentDailyConsumption: number | null;
};

export const GoalSummary = ({ goalName, goalTarget, currentDailyConsumption }: Props) => {
  if (goalTarget === null) return null;

  const current = currentDailyConsumption === null ? null : Math.round(currentDailyConsumption);
  const target = Math.round(goalTarget);
  const saved = current !== null ? Math.max(0, target - current) : null;
  const remaining = current !== null ? Math.max(0, current - target) : null;

  return (
    <div className="mx-4 mt-3 flex flex-col gap-1">
      <Description text={`Task: ${goalName || "My goal"}`} className="font-semibold" />
      <Description text={`Goal target: ${target} L/day`} />
      {current === null ? (
        <Description text="Save a calculation to see progress." />
      ) : (
        <>
          <Description text={`Current use: ${current} L/day`} />
          <Description text={saved && saved > 0 ? `Saved so far: ${saved} L/day` : `Remaining to goal: ${remaining ?? 0} L/day`} />
        </>
      )}
    </div>
  );
};