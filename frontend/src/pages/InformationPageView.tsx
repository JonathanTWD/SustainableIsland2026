import { Header } from "../component/Header/Header";
import { InformationTips } from "../component/InformationComponents/InformationTips";
import { Map } from "../component/Map/Map";

export const InformationPage = () => {
  return (
    <div className="mx-6 my-16">
      <div className="flex flex-col gap-8">
        <Header />
        <InformationTips />
      </div>
      
      {/* Map */}
      <div>
        <h2 className="text-2xl font-medium text-white mb-4 w-[90%] mx-auto">Water use per capita</h2>
        <Map />
        <h6 className="font-medium text-white w-[90%] mx-auto">
          Source:{" "}
          <a
            href="https://worldpopulationreview.com/country-rankings/water-consumption-by-country"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-blue-400 hover:underline"
          >
            World Population Review
          </a>
        </h6>
      </div>
    </div>
  );
};
