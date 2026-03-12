interface ButtonProps {
    text: string
    onClick: () => void
    className?: string
}

export function Button({ text, onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={`w-full p-3 font-nunito text-[32px] font-medium bg-primary text-black rounded-2xl hover:bg-accent cursor-pointer transition-colors duration-300 ${className || ''}`}>
            {text}
        </button>
    )
}