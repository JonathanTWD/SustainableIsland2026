import { useEffect, useState } from "react";
import { metricsService } from "../../services/metrics.service";
import { Description } from "../SubText/Description";
import ProgressBar from "./ProgressBar";

interface GoalsProps {
  Users?: number;
}

const Goals = ({ Users }: GoalsProps) => {

  const [waterSavedToday, setWaterSavedToday] = useState("0");
  const [waterSavedTotal, setWaterSavedTotal] = useState("0");
  const [goals, setGoals] = useState("1.000.000");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await metricsService.getTotalSaved();
        setWaterSavedToday(metrics.saved_today_liters.toLocaleString());
        setWaterSavedTotal(metrics.saved_year_liters.toLocaleString());
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="font-kalam font-bold text-[40px]">Global Goals</h2>
        <div className="flex flex-col gap-4 items-center font-nunito font-medium text-[14px]">
          <Description text="Join a global community reducing water use." />
          <Description text={`${waterSavedToday} L of water saved today`} />
          <Description
            text={`${waterSavedTotal} L / ${goals} L  of water saved in 2026`}
          />
          <ProgressBar />
          <Description text={`${Users} people are saving water right now.`} />
        </div>
      </div>
    </>
  );
};

export default Goals;
