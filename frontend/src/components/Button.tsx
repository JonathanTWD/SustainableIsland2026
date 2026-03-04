
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <>
        <button 
            className="bg-[#1AD0CD] text-[32px] font-nunito font-medium w-full py-2.5 flex items-center justify-center rounded-2xl hover:bg-[#A5FFFE]"
            onClick={props.onClick}
        >
            {props.text}
        </button>
        </>
    );
}

export default Button;