import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../component/Button/Button";
import { Header } from "../component/Header/Header";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";
import { authService } from "../services/auth.service";
import { Description } from "../component/SubText/Description";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const USERNAME_REGEX = /^(?=.{3,20}$)[a-zA-Z0-9._-]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

const SignupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        if (!normalizedName) {
            setError("Username is required.");
            return;
        }
        if (!USERNAME_REGEX.test(normalizedName)) {
            setError("Username must be 3-20 chars and only use letters, numbers, dot, underscore or hyphen.");
            return;
        }
        if (!normalizedEmail || !normalizedPassword) {
            setError("Please enter both email and password.");
            return;
        }
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!PASSWORD_REGEX.test(normalizedPassword)) {
            setError("Password must be at least 6 characters and include letters and numbers.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authService.register({
                name: normalizedName,
                email: normalizedEmail,
                password: normalizedPassword,
            });
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
            <div className="px-6 py-15 flex flex-col gap-12 md:mx-[20%]">
                <Header title="Welcome" />

                <div className="flex flex-col gap-6">
                    <div className="flex justify-center">
                        <span className="text-secondary dark:text-accent font-nunito text-[24px] font-bold ">
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
                        <div className="grow border-t border-secondary dark:border-accent"/>
                        <span className="text-secondary font-kalam text-[20px] dark:text-accent">
                            Or
                        </span>
                        <div className="grow border-t border-secondary dark:border-accent"/>
                    </div>
                    <Button text="Log in" onClick={() => navigate("/login")} />
                </div>

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