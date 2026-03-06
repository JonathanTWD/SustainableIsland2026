interface ProfileHeaderProps {
    onMenuClick: () => void;
    isMenuOpen: boolean;
}

export const ProfileHeader = ({ onMenuClick, isMenuOpen }: ProfileHeaderProps) => {
    return (
        <header>
            <div>
                <h1>Profile</h1>
                <h4>Statistics</h4>
            </div>
            <div>
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle profile menu"
                >
                    menu
                </button>
            </div>
        </header>
    );
};