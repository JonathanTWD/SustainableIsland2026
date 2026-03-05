import { PieChart, Pie } from "recharts";

const data = [
    { name: "Shower", value: 40, fill: "#3b82f6" },
    { name: "Toilet", value: 30, fill: "#22c55e" },
    { name: "Cooking", value: 20, fill: "#f59e0b" },
    { name: "Other", value: 10, fill: "#ef4444" }
];

export default function WaterChart() {
    return (
        <PieChart width={300} height={300}>
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
            />
        </PieChart>
    );
}