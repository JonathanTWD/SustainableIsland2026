import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Header } from "../component/Header/Header";
import { Button } from "../component/Button/Button";
import InputField from "../component/LoginSignInComponents/InputField";
import ToggleSwitch from "../component/LoginSignInComponents/ToggleSwitch";
import { authService } from "../services/auth.service";
import { Description } from "../component/SubText/Description";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; 

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

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
            await authService.login({ email: normalizedEmail, password: normalizedPassword });
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-6 py-15 flex flex-col gap-12">
                <Header title="Welcome" />

                <div className="flex flex-col gap-6">
                    <InputField
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                    />
                    {error && <Description text={error} className="text-red-600 text-sm" />}
                </div>

                <div className="flex-col gap-2.5">
                    <Button
                        text={loading ? "Logging in..." : "Log in"}
                        onClick={() => void handleLogin()}
                    />
                    <div className="flex items-center gap-5 my-2.5">
                        <div className="grow border-t border-secondary" />
                        <span className="text-secondary font-kalam text-[20px]">Or</span>
                        <div className="grow border-t border-secondary" />
                    </div>
                    <Button
                        text="Sign Up"
                        onClick={() => navigate("/signup")}
                    />
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

export default LoginPage;