import Droplet from '../../assets/img/Droplet.svg';
import { Description } from "../SubText/Description";

interface WaterDropLogoProps {
    title?: string;
    Subtext?: string;
    value?: number;
}

export const WaterDropLogo = (props: WaterDropLogoProps) => {
    return (
        <div className="flex items-center justify-center gap-3">
            <img src={Droplet} alt="Water Drop Logo" />
            <div>
                <h1 className="font-kalam text-secondary text-2xl font-bold -mb-1">{props.title || "Total:"}</h1>
                <Description className="text-secondary text-2xl font-bold" text={`${props.value || 0}`} />
                <Description className="text-secondary text-[16px]" text={props.Subtext || ""} />
            </div>
        </div>
    );
};