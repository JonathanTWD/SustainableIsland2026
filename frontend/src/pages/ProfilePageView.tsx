import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import WaterChart from "../component/ProfileComponents/ProfileGraph";
import { ProfileTextGraph } from "../component/ProfileComponents/ProfileTextGraph";
import { ProfileDropDown } from "../component/ProfileComponents/DropDown";
import { ProfileContact } from "../component/ProfileComponents/ProfileContact";
import { Header } from "../component/Header/Header";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { waterCalculationService } from "../services/water-calculation.service";
import { savingGoalService } from "../services/saving-goal.service";
import type { WaterCalculationResponse } from "../interfaces/water-calculation.interface";
import type { WaterItem } from "../types/WaterItem";
import { Description } from "../component/SubText/Description";
import { GoalForm } from "../component/ProfileComponents/GoalForm";
import { GoalSummary } from "../component/ProfileComponents/GoalSummary";

const menuItems = [
    { id: "logout", label: "Log out" },
    { id: "delete", label: "Delete Account" },
];

const mapCalculationToChartData = (latest: WaterCalculationResponse): WaterItem[] => {
    const household = latest.household_members ?? 0;
    const showerMinutes = latest.shower_minutes_per_day ?? 0;
    const laundryPerWeek = latest.laundry_per_week ?? 0;
    const dishwasherPerWeek = latest.dishwasher_per_week ?? 0;

    const shower = household * showerMinutes * 8;
    const laundry = (laundryPerWeek * (household / 2) * 45) / 7;
    const dishwasher = (dishwasherPerWeek * (household / 2) * 10) / 7;

    return [
        { name: "Shower", value: Math.round(shower), fill: "#3b82f6" },
        { name: "Laundry", value: Math.round(laundry), fill: "#f59e0b" },
        { name: "Dishwasher", value: Math.round(dishwasher), fill: "#ef4444" },
    ];
};

export const ProfilePage = () => {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [latest, setLatest] = useState<WaterCalculationResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [goalId, setGoalId] = useState<number | null>(null);
    const [goalName, setGoalName] = useState("");
    const [goalTargetInput, setGoalTargetInput] = useState("");
    const [goalTarget, setGoalTarget] = useState<number | null>(null);
    const [goalSaving, setGoalSaving] = useState(false);
    const [goalError, setGoalError] = useState<string | null>(null);

    const waterData = useMemo(() => {
        if (!latest) return [];
        return mapCalculationToChartData(latest);
    }, [latest]);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            setError(null);

            try {
                const me = await authService.getCurrentUser();
                setUserId(me.user.id);
                setEmail(me.user.email);

                // Genindlæs gemt målnavn fra localStorage
                const savedGoalName = localStorage.getItem(`goal-name-${me.user.id}`);
                if (savedGoalName) setGoalName(savedGoalName);

                const [records, goals] = await Promise.all([
                    waterCalculationService.getByUserId(me.user.id),
                    savingGoalService.getByUserId(me.user.id),
                ]);
                setLatest(records.length > 0 ? records[0] : null);

                const existingGoal = goals[0];
                if (existingGoal) {
                    setGoalId(existingGoal.id);
                    setGoalTarget(existingGoal.target_liters_per_day ?? null);
                    setGoalTargetInput(
                        existingGoal.target_liters_per_day
                            ? String(Math.round(existingGoal.target_liters_per_day))
                            : "",
                    );
                }
            } catch (err) {
                console.error(err);
                setError("Could not load profile data");
            } finally {
                setLoading(false);
            }
        };

        void loadProfile();
    }, []);

    const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

    const handleMenuSelect = async (itemId: string) => {
        try {
            if (itemId === "logout") {
                authService.logout();
                navigate("/login");
                return;
            }

            if (itemId === "delete") {
                setIsMenuOpen(false);
                setConfirmDelete(true);
                return;
            }
        } catch (err) {
            console.error(err);
            setError("Action failed. Try again.");
        } finally {
            setIsMenuOpen(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!userId) return;
        try {
            await userService.delete(userId);
            authService.logout();
            navigate("/signup");
        } catch (err) {
            console.error(err);
            setError("Could not delete account. Try again.");
        } finally {
            setConfirmDelete(false);
        }
    };

    const handleSaveGoal = async () => {
        if (!userId) return;

        const parsedTarget = Number(goalTargetInput);
        const trimmedName = goalName.trim();

        if (!trimmedName) {
            setGoalError("Goal name is required.");
            return;
        }

        if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) {
            setGoalError("Goal target must be above 0.");
            return;
        }

        setGoalSaving(true);
        setGoalError(null);

        try {
            const payload = { target_liters_per_day: parsedTarget };
            const saved = goalId
                ? await savingGoalService.update(goalId, payload)
                : await savingGoalService.create({ user_id: userId, ...payload });

            setGoalId(saved.id);
            setGoalTarget(saved.target_liters_per_day ?? parsedTarget);

            // Gem målnavn lokalt så det overlever reload
            localStorage.setItem(`goal-name-${userId}`, trimmedName);
        } catch {
            setGoalError("Could not save goal. Try again.");
        } finally {
            setGoalSaving(false);
        }
    };

    const handleResetOrDeleteGoal = async () => {
        if (goalId) {
            try {
                await savingGoalService.delete(goalId);
            } catch {
                setGoalError("Could not delete goal. Try again.");
                return;
            }
        }

        if (userId) localStorage.removeItem(`goal-name-${userId}`);
        setGoalId(null);
        setGoalName("");
        setGoalTargetInput("");
        setGoalTarget(null);
        setGoalError(null);
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {/* relative wrapper så dropdown positionerer sig korrekt */}
            <div className="relative">
                <Header onMenuClick={handleMenuToggle} isMenuOpen={isMenuOpen} />
                <ProfileDropDown isOpen={isMenuOpen} items={menuItems} onSelect={handleMenuSelect} />
            </div>

            {latest ? (
                <div>
                    <WaterChart data={waterData} />
                    <ProfileTextGraph data={waterData} />
                </div>
            ) : (
                <div className="mx-4 mt-4">
                    <Description text="No data yet — go to the calculator to save your first calculation!" />
                </div>
            )}

            <div>
                <GoalForm
                    goalName={goalName}
                    goalTargetInput={goalTargetInput}
                    saving={goalSaving}
                    error={goalError}
                    hasSavedGoal={goalId !== null}
                    onGoalNameChange={setGoalName}
                    onGoalTargetChange={setGoalTargetInput}
                    onSave={() => void handleSaveGoal()}
                    onResetOrDelete={() => void handleResetOrDeleteGoal()}
                />
                <GoalSummary
                    goalName={goalName}
                    goalTarget={goalTarget}
                    currentDailyConsumption={latest?.estimated_daily_consumption ?? null}
                />
            </div>

            <div>
                <ProfileContact email={email} />
            </div>

            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="font-nunito text-lg font-bold text-gray-900">Delete account?</h2>
                        <Description className="mt-2 text-sm text-gray-600" text="This will permanently delete your account and all your data. This cannot be undone." />
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(false)}
                                className="flex-1 rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => void handleConfirmDelete()}
                                className="flex-1 rounded-xl bg-red-600 py-2 text-sm font-semibold text-white"
                            >
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};