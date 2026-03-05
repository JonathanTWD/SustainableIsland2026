import { useLocation } from 'react-router'
import headerImage from '../../assets/headersymbol.png'
import logoutSymbol from '../../assets/logoutsymbol.png'

export function Header() {
    const location = useLocation()

    if (location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login') {
        return (
            <header className="w-full h-20 flex items-center text-[#A5FFFE] font-['Kalam']">
                <h1 className="font-bold text-4xl">Welcome</h1>
            </header>
        )
    }
    else if (location.pathname === '/calculator') {
        return (
            <header className="self-stretch px-20 py-6 inline-flex justify-start items-center gap-3 text-[#A5FFFE]">
                <div className="">
                    <div className="w-14 h-6 absolute top-19 bg-teal-700 rounded-bl-[99px] rounded-br-[99px]"></div>
                    <img src={headerImage} alt="Header" className="w-14 h-20 relative z-100" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="h-6 justify-start text-2xl font-bold font-['Kalam']">Total</h3>
                    <h3 className="h-5 justify-start text-xl font-bold font-['Nunito']">5.000</h3>
                    <h3 className="h-4 justify-start text-base font-normal font-['Nunito']">Liters of water per day</h3>
                </div>
            </header>
        )
    }
    else if (location.pathname === '/information') {
        return (
            <header className="w-96 inline-flex justify-between items-start">
                <div className="h-24 inline-flex flex-col justify-start items-start gap-4">
                    <h1 className="w-56 h-12 justify-start text-cyan-200 text-4xl font-bold font-['Kalam']">Information</h1>
                    <h3 className="justify-end text-cyan-200 text-xl font-normal font-['Nunito']">Tips and tricks</h3>
                </div>
            </header>
        )
    }
    else if (location.pathname === '/profile') {
        return (
            <header className="w-full inline-flex justify-between items-start text-[#A5FFFE]">
                <div className="w-28 inline-flex flex-col justify-start items-start gap-2">
                    <h1 className="justify-start text-3xl font-bold font-['Kalam']">Profile</h1>
                    <h3 className="text-xl font-['Nunito']">Statistics</h3>
                </div>
                <div className="w-36 inline-flex justify-end items-end gap-2">
                    <img src={logoutSymbol} alt="Logout" className="w-8 h-8" />
                </div>
            </header>
        )
    }
    else {
        return null
    }
}