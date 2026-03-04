import ToggleSwitch from "../components/ToggleSwitch";


const LoginPage = () => {
    return (
        <>
        <div className="px-6 py-15 flex flex-col gap-12">
            {/* Welcome banner */}
            <h1 className="text-[#0A302F] font-kalam font-bold text-[40px]">
                Welcome
            </h1>
            {/* Input fields */}
            <div className="flex flex-col gap-6">
                <input 
                    type="text" 
                    placeholder="Email"
                    className="border-2 border-[#0A302F] font-nunito text-2xl placeholder-[#0A302F] rounded-2xl px-4 py-3 focus:none"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="border-2 border-[#0A302F] font-nunito text-2xl placeholder-[#0A302F] rounded-2xl px-4 py-3 focus:none"
                />
            </div >
            {/* Buttons */}
            <div className="flex-col gap-2.5">
                <button className="bg-[#1AD0CD] text-[32px] font-nunito font-medium w-full py-2.5 flex items-center justify-center rounded-2xl hover:bg-[#A5FFFE]">
                    Log in
                </button>
                <div className="flex items-center gap-5 my-2.5">
                    <div className="grow border-t border-[#0A302F] "></div>
                    <span className="text-[#0A302F] font-kalam text-[20px]">
                        Or
                    </span>
                    <div className="grow border-t border-[#0A302F]"></div>
                </div>
                <button className="bg-[#1AD0CD] text-[32px] font-nunito font-medium w-full py-2.5 flex items-center justify-center rounded-2xl hover:bg-[#A5FFFE]">
                    Sign Up
                </button>
            </div>
            {/* Dark mode Toggle */}
            <div className="flex flex-col w-full items-center">
                <span className="font-nunito text-[16px] text-[#0A302F] font-medium">
                    Dark mode
                </span>
                <ToggleSwitch />
            </div>
        </div>
        </>
    );
};
export default LoginPage;