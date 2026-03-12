import { Header } from "../component/Header/Header";
import {Button} from "../component/Button/Button";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";


const LoginPage = () => {
    return (
        <>
        <div className="px-6 py-15 flex flex-col gap-12">
            {/* Welcome banner */}
           <Header title="Welcome" />

            {/* Input fields */}
            <div className="flex flex-col gap-6">
                <InputField type="text" placeholder="Email" />
                <InputField type="password" placeholder="Password" />
            </div >

            {/* Buttons */}
            <div className="flex-col gap-2.5">
                <Button text="Log in" onClick={() => {}} 
                    />
                <div className="flex items-center gap-5 my-2.5">
                    <div className="grow border-t border-secondary dark:border-accent"/>
                    <span className="text-secondary font-kalam text-[20px] dark:text-accent">
                        Or
                    </span>
                    <div className="grow border-t border-secondary dark:border-accent"/>
                </div>
                <Button text="Sign Up" onClick={() => {}} 
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
export default LoginPage;