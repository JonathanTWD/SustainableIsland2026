import type { WaterItem } from '../../types/WaterItem';

type Props = {
    data: WaterItem[];
};

export const ProfileTextGraph = ({ data }: Props) => {
    const topThree = [...data].sort((a, b) => b.value - a.value).slice(0, 3);

    return (
        <div>
            {topThree.map((item) => (
                <p key={item.name}>
                    {item.value}% | {item.name}
                </p>
            ))}
        </div>
    );
};