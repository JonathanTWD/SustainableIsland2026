import { useLocation } from 'react-router'
import logoutSymbol from '../../assets/logoutsymbol.png'

interface HeaderProps {
    title?: string;
    onMenuClick?: () => void;
    isMenuOpen?: boolean;
}

export function Header({ onMenuClick, isMenuOpen, title }: HeaderProps) {
    const location = useLocation()

    if (location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login') {
        return (
            <header className="w-full h-20 flex items-center text-secondary dark:text-accent font-['Kalam']">
                <h1 className="font-bold text-4xl">{title || "Welcome"}</h1>
            </header>
        )
    }
    else if (location.pathname === '/information') {
        return (
            <header className="w-96 inline-flex justify-between items-start">
                <div className="h-24 inline-flex flex-col justify-start items-start gap-4">
                    <h1 className="w-56 h-12 justify-start text-secondary dark:text-accent text-[40px] font-bold font-['Kalam']">Information</h1>
                    <h3 className="justify-end text-medium dark:text-accent text-[20px] font-normal font-['Nunito']">Tips and tricks</h3>
                </div>
            </header>
        )
    }
    else if (location.pathname === '/profile') {
        return (
            <header className="w-full inline-flex justify-between items-start text-secondary dark:text-accent">
                <div className="w-28 inline-flex flex-col justify-start items-start gap-2">
                    <h1 className="justify-start text-3xl font-bold font-['Kalam']">Profile</h1>
                    <h3 className="text-xl font-['Nunito']">Statistics</h3>
                </div>
                <div className="w-36 inline-flex justify-end items-end gap-2">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle profile menu"
                    >
                        <img src={logoutSymbol} alt="Logout" className="w-8 h-8" />
                    </button>
                </div>
            </header>
        )
    }
    else {
        return null
    }
}