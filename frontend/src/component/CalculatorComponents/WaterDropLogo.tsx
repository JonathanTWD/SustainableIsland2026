import { Description } from "../SubText/Description";

interface WaterDropLogoProps {
    title?: string;
    Subtext?: string;
    value?: number;
}

const DropletIcon = () => (
    <svg width="61" height="81" viewBox="0 0 61 81" fill="none" xmlns="http://www.w3.org/2000/svg" 
        className="text-secondary dark:text-accent">
        <path d="M46.5 48.04C46.5076 52.9109 44.6164 57.5929 41.228 61.092C39.3408 63.0298 37.0412 64.5173 34.5 65.444M58.5 49.268C58.5 22.96 30.5 2.5 30.5 2.5C30.5 2.5 2.5 22.96 2.5 49.268C2.5 57.02 5.448 64.456 10.7 69.94C15.952 75.424 23.076 78.5 30.5 78.5C37.924 78.5 45.048 75.42 50.3 69.94C55.552 64.46 58.5 57.02 58.5 49.264" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const WaterDropLogo = (props: WaterDropLogoProps) => {
    return (
        <div className="flex items-center justify-center gap-3">
            <DropletIcon />
            <div>
                <h1 className="font-kalam text-secondary dark:text-accent text-2xl font-bold -mb-1">{props.title || "Total:"}</h1>
                <Description className="text-secondary dark:text-accent text-2xl font-bold" text={`${props.value || 0}`} />
                <Description className="text-secondary dark:text-accent text-[16px]" text={props.Subtext || ""} />
            </div>
        </div>
    );
};
