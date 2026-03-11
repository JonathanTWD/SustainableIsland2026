import Droplet from '../../assets/img/Droplet.svg';

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
                <p className="font-nunito text-secondary text-2xl font-bold">{props.value || 0}</p>
                <p className="font-nunito text-secondary text-[16px]">{props.Subtext}</p>
            </div>
        </div>
    );
};