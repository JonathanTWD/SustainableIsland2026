import Button from "../component/LoginSignInComponents/Button";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";


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
                    <InputField type="text" placeholder="Email" />
                    <InputField type="password" placeholder="Password" />
                </div >

                {/* Buttons */}
                <div className="flex-col gap-2.5">
                    <Button text="Log in" onClick={() => { }}
                    />
                    <div className="flex items-center gap-5 my-2.5">
                        <div className="grow border-t border-[#0A302F] "></div>
                        <span className="text-[#0A302F] font-kalam text-[20px]">
                            Or
                        </span>
                        <div className="grow border-t border-[#0A302F]"></div>
                    </div>
                    <Button text="Sign Up" onClick={() => { }}
                    />
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