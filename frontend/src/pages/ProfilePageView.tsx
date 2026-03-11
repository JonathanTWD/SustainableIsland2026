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
import type { WaterCalculationResponse } from "../interfaces/water-calculation.interface";
import type { WaterItem } from "../types/WaterItem";
import { Description } from "../component/SubText/Description";

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

                const records = await waterCalculationService.getByUserId(me.user.id);
                setLatest(records.length > 0 ? records[0] : null);
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

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;
    if (!latest) return (
        <div>
            <Header onMenuClick={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <ProfileDropDown isOpen={isMenuOpen} items={menuItems} onSelect={handleMenuSelect} />
            <Description text="No data yet — go to the calculator to save your first calculation!" />
        </div>
    );

    return (
        <>
            <Header onMenuClick={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <ProfileDropDown isOpen={isMenuOpen} items={menuItems} onSelect={handleMenuSelect} />

            <div>
                <WaterChart data={waterData} />
                <ProfileTextGraph data={waterData} />
            </div>

            <div>
                <ProfileContact email={email} phone={0} />
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