
interface InputFieldProps {
    type?: string;
    placeholder?: string;
}

const InputField = ({ type = "text", placeholder = "" }: InputFieldProps) => {
    return (
        <>
        <input 
            type={type} 
            placeholder={placeholder}
            className="border-2 border-[#0A302F] font-nunito text-2xl placeholder-[#0A302F] rounded-2xl px-4 py-3 focus:none"
        />
        </>
    );
};

export default InputField;