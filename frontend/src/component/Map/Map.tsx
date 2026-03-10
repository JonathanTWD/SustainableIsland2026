import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import type { FeatureCollection, Geometry, Feature } from "geojson";
import waterData from "../../data/water-consumption-by-country-2026.json";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Legend } from "./Legend";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const perCapitaMap = new globalThis.Map<string, number>();
const totalMap = new globalThis.Map<string, number>();

waterData.forEach(country => {
  if (country.AnnualWaterWithdrawalPerCapita_2022 !== null && country.AnnualWaterWithdrawalPerCapita_2022 !== undefined) {
    perCapitaMap.set(country.country, country.AnnualWaterWithdrawalPerCapita_2022);
  }
  if (country.AnnualWaterWithdrawal_2022 !== null && country.AnnualWaterWithdrawal_2022 !== undefined) {
    totalMap.set(country.country, country.AnnualWaterWithdrawal_2022);
  }
});

const getPerCapitaColor = (d: number | undefined) => {
  if (d === undefined) return '#ccc'; // No data available
  return d > 2000 ? '#800026' :
         d > 1000 ? '#BD0026' :
         d > 800  ? '#E31A1C' :
         d > 600  ? '#FC4E2A' :
         d > 400  ? '#FD8D3C' :
         d > 200  ? '#FEB24C' :
         d > 100  ? '#FED976' :
                    '#FFEDA0';
};

const getTotalColor = (d: number | undefined) => {
  if (d === undefined) return '#ccc'; // No data available
  return d > 500_000_000_000 ? '#800026' :
         d > 100_000_000_000 ? '#BD0026' :
         d > 50_000_000_000  ? '#E31A1C' :
         d > 10_000_000_000  ? '#FC4E2A' :
         d > 5_000_000_000   ? '#FD8D3C' :
         d > 1_000_000_000   ? '#FEB24C' :
         d > 100_000_000     ? '#FED976' :
                               '#FFEDA0';
};

export const Map = () => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [dataType, setDataType] = useState<"perCapita" | "total">("perCapita");

  useEffect(() => {
    fetch("/countries.geojson")
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(console.error);
  }, []);

  const styleFeature = (feature?: Feature<Geometry, any>) => {
    const countryName = feature?.properties?.ADMIN || feature?.properties?.name;
    const value = dataType === "perCapita" 
      ? perCapitaMap.get(countryName)
      : totalMap.get(countryName);
    
    return {
      fillColor: dataType === "perCapita" ? getPerCapitaColor(value) : getTotalColor(value),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: L.Layer) => {
    const countryName = feature.properties?.ADMIN || feature.properties?.name || "Desconocido";
    const perCapitaVal = perCapitaMap.get(countryName);
    const totalVal = totalMap.get(countryName);

    if (dataType === "perCapita" && perCapitaVal !== undefined) {
      layer.bindPopup(`<strong>${countryName}</strong><br/>Withdrawal Per Capita: ${perCapitaVal.toLocaleString()} m³`);
    } else if (dataType === "total" && totalVal !== undefined) {
      layer.bindPopup(`<strong>${countryName}</strong><br/>Total Withdrawal: ${(totalVal / 1_000_000_000).toLocaleString(undefined, {maximumFractionDigits: 2})} Billion m³`);
    } else {
      layer.bindPopup(`<strong>${countryName}</strong><br/>No data available`);
    }
  };

  const geoJsonKey = dataType + (geoData ? "-loaded" : "-loading");

  return (
    <div className="w-[90%] mx-auto h-125 my-8 rounded-lg overflow-hidden shadow-md z-0 relative">
      <div className="absolute top-4 right-4 z-1 bg-white/95 p-1 rounded-lg shadow-md border border-gray-200">
        <div className="flex gap-1">
          <button 
            onClick={() => setDataType("perCapita")}
            className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors cursor-pointer ${
              dataType === "perCapita" 
                ? "bg-blue-600 text-white" 
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Per Capita
          </button>
          <button 
            onClick={() => setDataType("total")}
            className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors cursor-pointer ${
              dataType === "total" 
                ? "bg-blue-600 text-white" 
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Total
          </button>
        </div>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2.5}
        minZoom={2.3}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        
        {geoData && (
          <GeoJSON 
            key={geoJsonKey}
            data={geoData} 
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      <Legend dataType={dataType} />
    </div>
  );
};



