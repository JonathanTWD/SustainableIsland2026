import { useState } from "react";

interface DropdownProps {
    title: string;
    content: string;
}



const Dropdown = ({ title, content }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className="flex flex-col p-3 font-nunito bg-primary dark:bg-secondary border-2 border-medium dark:border-primary rounded-lg cursor-pointer" 
            onClick={() => setIsOpen(!isOpen)}>
            <div className="flex justify-between items-center">
                <h3 className="text-[16px] font-semibold">{title}</h3>
                <span className="text-secondary dark:text-white text-2xl font-bold select-none">
                    {isOpen ? "−" : "+"}
                </span>
            </div>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden text-[14px]">{content}</div>
            </div>
        </div>
        </>
    )
}

export default Dropdown;