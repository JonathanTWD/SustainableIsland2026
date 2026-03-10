interface DescriptionProps {
    text: string;
}


export const Description = ({ text }: DescriptionProps) => {


    return (
        <p className="font-nunito font-bold text-[16px] flex justify-center text-center">
            {text}
        </p>
    )
}