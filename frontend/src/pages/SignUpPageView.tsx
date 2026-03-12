import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../component/Button/Button";
import { Header } from "../component/Header/Header";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";
import { authService } from "../services/auth.service";
import { Description } from "../component/SubText/Description";

const SignupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authService.register({ name, email, password });
            navigate("/", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Could not create account. Email may already be in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-6 py-15 flex flex-col gap-12">
                <Header title="Welcome" />

                <div className="flex flex-col gap-6">
                    <div className="flex justify-center">
                        <span className="text-secondary font-nunito text-[24px] font-bold">
                            Create account
                        </span>
                    </div>
                    <InputField type="text" placeholder="Username" value={name} onChange={setName} />
                    <InputField type="text" placeholder="Email" value={email} onChange={setEmail} />
                    <InputField type="password" placeholder="Password" value={password} onChange={setPassword} />
                    {error && <Description text={error} className="text-red-600 text-sm" />}
                </div>

                <div className="flex-col gap-2.5">
                    <Button
                        text={loading ? "Creating account..." : "Sign up"}
                        onClick={() => void handleSignup()}
                    />
                    <div className="flex items-center gap-5 my-2.5">
                        <div className="grow border-t border-secondary" />
                        <span className="text-secondary font-kalam text-[20px]">Or</span>
                        <div className="grow border-t border-secondary" />
                    </div>
                    <Button text="Log in" onClick={() => navigate("/login")} />
                </div>

                <div className="flex flex-col w-full items-center">
                    <span className="font-nunito text-[16px] text-secondary font-medium">
                        Dark mode
                    </span>
                    <ToggleSwitch />
                </div>
            </div>
        </>
    );
};

export default SignupPage;