interface ButtonProps {
    text: string
    onClick: () => void
    className?: string
}

export function Button({ text, onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={`px-10 py-2 bg-primary text-white rounded hover:bg-cyan-600 transition-colors duration-300 ${className || ''}`}>
            {text}
        </button>
    )
}