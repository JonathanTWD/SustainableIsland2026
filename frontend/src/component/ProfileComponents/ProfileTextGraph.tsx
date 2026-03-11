import type { WaterItem } from '../../types/WaterItem';
import { Description } from '../SubText/Description';

type Props = {
    data: WaterItem[];
};

export const ProfileTextGraph = ({ data }: Props) => {
    const topThree = [...data].sort((a, b) => b.value - a.value).slice(0, 3);

    return (
        <div>
            {topThree.map((item) => (
                <Description key={item.name} text={`${item.value} L | ${item.name}`} />
            ))}
        </div>
    );
};