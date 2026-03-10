import { Header } from "../component/Header/Header";
import { InformationTips } from "../component/InformationComponents/InformationTips";
import { Map } from "../component/Map/Map";

export const InformationPage = () => {
    return (
        <div className="container mx-auto px-4 pb-8">
            <Header />
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Consumo de agua mundial</h2>
                <Map />
            </div>
            <InformationTips />
        </div>
    );
};