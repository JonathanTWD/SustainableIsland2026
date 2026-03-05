import { useState } from "react";
import WaterChart from "../component/ProfileComponents/ProfileGraph";
import { ProfileHeader } from "../component/ProfileComponents/ProfileHeader";
import { ProfileTextGraph } from "../component/ProfileComponents/ProfileTextGraph";
import { ProfileDropDown } from "../component/ProfileComponents/DropDown";

const waterData = [
    { name: "Shower", value: 40, fill: "#3b82f6" },
    { name: "Toilet", value: 30, fill: "#22c55e" },
    { name: "Cooking", value: 20, fill: "#f59e0b" },
    { name: "Other", value: 10, fill: "#ef4444" },
];

const menuItems = [
    { id: "logout", label: "Log out" },
    { id: "delete", label: "Delete Account" },
];

export const ProfilePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

    const handleMenuSelect = (itemId: string) => {
        console.log("Selected:", itemId);
        setIsMenuOpen(false); // luk menu efter klik
    };

    return (
        <>
            <ProfileHeader onMenuClick={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <ProfileDropDown
                isOpen={isMenuOpen}
                items={menuItems}
                onSelect={handleMenuSelect}
            />

            <div>
                <WaterChart data={waterData} />
                <ProfileTextGraph data={waterData} />
            </div>
        </>
    );
};