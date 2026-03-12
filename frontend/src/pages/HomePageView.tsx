import { useNavigate } from "react-router";
import Goals from "../component/HomePageComponents/Goals";
import waterImg from "../assets/water.png";
import { Description } from "../component/SubText/Description";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="mx-6 mt-16 flex flex-col gap-12 items-center">
                <div className="flex flex-col items-center leading-12 font-kalam text-[40px] font-bold">
                    <h1>Track your <span className="text-medium dark:text-primary">water</span></h1>
                    <h1>Protect the future</h1>
                </div>
                <Description
                    text="Measure your water use, set goals, and start saving. Every drop counts."
                    className="font-bold text-[16px] flex justify-center text-center"
                />
                <button onClick={() => navigate("/calculator")} className="font-nunito font-semibold text-[24px] bg-medium text-white dark:bg-primary hover:bg-secondary dark:hover:bg-accent cursor-pointer dark:text-black rounded-2xl px-10 py-3">
                    Start tracking
                </button>
                <Goals />
                <img src={waterImg} alt="Earth droplet" />
                <div className="h-20"></div>
            </div>
        </>
    );
};

export default HomePage;