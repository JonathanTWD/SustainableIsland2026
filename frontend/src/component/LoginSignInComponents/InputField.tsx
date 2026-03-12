interface InputFieldProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const InputField = ({ type = "text", placeholder = "", value, onChange }: InputFieldProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            className="border-2 border-secondary dark:border-white font-nunito text-2xl placeholder-secondary dark:placeholder-white rounded-2xl px-4 py-3 focus:none"
        />
    );
};

export default InputField;