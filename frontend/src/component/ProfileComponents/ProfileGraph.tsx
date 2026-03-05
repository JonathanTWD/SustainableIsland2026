import { PieChart, Pie } from "recharts";

type WaterItem = {
    name: string;
    value: number;
    fill: string;
};

type Props = {
    data: WaterItem[];
};

export default function WaterChart({ data }: Props) {
    return (
        <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} />
        </PieChart>
    );
}