interface DescriptionProps {
    text: string;
    className?: string;
}

export const Description = ({ text, className = "" }: DescriptionProps) => {
    return (
        <p className={`font-nunito ${className}`}>
            {text}
        </p>
    )
}