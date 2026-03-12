import { Button } from "../component/Button/Button";
import { Header } from "../component/Header/Header";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";


const SignupPage = () => {
    return (
        <>
            <div className="px-6 py-15 flex flex-col gap-12">
                {/* Welcome banner */}
                <Header title="Welcome" />

                {/* Input fields */}
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center">
                        <span className="text-secondary dark:text-accent font-nunito text-[24px] font-bold ">
                            Create account
                        </span>
                    </div>
                    <InputField type="text" placeholder="Username" />
                    <InputField type="text" placeholder="Email" />
                    <InputField type="password" placeholder="Password" />
                </div >

                {/* Buttons */}
                <div className="flex-col gap-2.5">
                    <Button text="Sign up" onClick={() => { }}
                    />
                    <div className="flex items-center gap-5 my-2.5">
                        <div className="grow border-t border-secondary dark:border-accent"/>
                        <span className="text-secondary font-kalam text-[20px] dark:text-accent">
                            Or
                        </span>
                        <div className="grow border-t border-secondary dark:border-accent"/>
                    </div>
                    <Button text="Log in" onClick={() => { }}
                    />
                </div>

                {/* Dark mode Toggle */}
                <div className="flex flex-col w-full items-center">
                    <span className="font-nunito text-[16px] text-secondary font-medium dark:text-accent">
                        Dark mode
                    </span>
                    <ToggleSwitch />
                </div>
            </div>
        </>
    );
};
export default SignupPage;