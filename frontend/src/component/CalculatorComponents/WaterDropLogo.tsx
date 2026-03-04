import WaterDrop from '../../assets/img/Vector.svg'

interface WaterDropLogoProps {
    title?: string;
    Subtext?: string;
    value?: number;
}

export const WaterDropLogo = (props: WaterDropLogoProps) => {

    return (
        <>
            <div>
                <h1>{props.title || "Total:"}</h1>
                <p>{props.value}</p>
                <p>{props.Subtext}</p>
                <img src={WaterDrop} alt="Water Drop Logo" />
            </div>

        </>
    )
}