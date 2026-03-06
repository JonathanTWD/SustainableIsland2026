import Goals from "../component/HomePageComponents/Goals";
import waterImg from "../assets/water.png";


const HomePage = () => {

    return (
        <>
        <div className="mx-6 mt-15 flex flex-col gap-12 items-center">
            <div className="flex flex-col items-center">
                <h1 className="font-kalam font-bold text-[40px] leading-tight">
                    Track your <span className="text-medium">water</span>
                </h1>
                <h1 className="font-kalam font-bold text-[40px] leading-tight">
                    Protect the future
                </h1>
            </div>
            <p className="font-nunito font-bold text-[16px] flex justify-center text-center">
                Measure your water use, set goals, and start saving. Every drop counts.
            </p>
            <button className="font-nunito font-semibold text-[24px] bg-medium text-white rounded-2xl px-10 py-3">
                Start tracking
            </button>
            <Goals />
            
            <img src={waterImg} alt="Earth droplet"/>
        </div>
        </>
    );
};

export default HomePage;