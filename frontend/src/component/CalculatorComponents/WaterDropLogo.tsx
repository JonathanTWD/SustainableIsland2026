import WaterDrop from '../../assets/img/Vector.svg'

interface WaterDropLogoProps {
    title?: string;
    Subtext?: string;
    value?: number;
}

export const WaterDropLogo = (props: WaterDropLogoProps) => {
    return (
        <div className="rounded-2xl border border-blue-100 bg-linear-to-b from-blue-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-base font-semibold text-slate-800">{props.title || "Total:"}</h1>
                    <p className="text-3xl font-bold leading-tight text-blue-700">{props.value || 0}</p>
                    <p className="text-sm text-slate-600">{props.Subtext}</p>
                </div>
                <img src={WaterDrop} alt="Water Drop Logo" className="h-14 w-14 shrink-0" />
            </div>
        </div>
    )
}