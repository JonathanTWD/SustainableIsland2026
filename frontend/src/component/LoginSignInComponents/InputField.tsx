
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
            className="border-2 border-secondary font-nunito text-2xl placeholder-white rounded-2xl px-4 py-3 focus:none"
        />
        </>
    );
};

export default InputField;