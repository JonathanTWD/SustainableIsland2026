import Goals from "../component/HomePageComponents/Goals";
import waterImg from "../assets/water.png";
import { Header } from "../component/Header/Header";
import { Description } from "../component/SubText/Description";


const HomePage = () => {

    return (
        <>
            <div className="mx-6 mt-15 flex flex-col gap-12 items-center">
                <div className="flex flex-col items-center">
                    <Header title="Track your water protect the future" />
                </div>
                <Description text="Measure your water use, set goals, and start saving. Every drop counts." className="font-bold text-[16px] flex justify-center text-center" />
                <button className="font-nunito font-semibold text-[24px] bg-medium text-white rounded-2xl px-10 py-3">
                    Start tracking
                </button>
                <Goals />

                <img src={waterImg} alt="Earth droplet" />
            </div>
        </>
    );
};

export default HomePage;