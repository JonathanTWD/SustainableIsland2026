interface ButtonProps {
    text: string
    onClick: () => void
}

export function Button({ text, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="px-10 py-2 bg-[#1AD0CD] text-white rounded hover:bg-cyan-600 transition-colors duration-300">
            {text}
        </button>
    )
}