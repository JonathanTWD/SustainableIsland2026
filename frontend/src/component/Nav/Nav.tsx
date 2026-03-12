import hint from "../../assets/hint-symbol.png"
import water from "../../assets/water-symbol.png"
import user from "../../assets/user-symbol.png"
import { Link } from "react-router"

export function Nav() {
    return (
        <div className="fixed bottom-0 left-0 w-full h-20 mt-20 bg-white dark:bg-primary border-t-2 border-secondary dark:border-black flex items-center justify-around">
            <Link to="/information">
                <img src={hint} alt="Hint" className="w-10" />
            </Link>
            <Link to="/homepage">
                <div className="w-20 h-20 relative bg-white dark:bg-primary rounded-[99px] -top-5  outline-2 -outline-offset-2 outline-secondary dark:outline-black overflow-hidden">
                    <img src={water} alt="Water" className="w-9 h-12 left-5.25 top-3.5 absolute" />
                </div>
            </Link>
            <Link to="/profile">
                <img src={user} alt="User" className="w-10" />
            </Link>
        </div>
    )
}