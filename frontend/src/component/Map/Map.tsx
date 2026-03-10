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

const consumptionMap = new globalThis.Map<string, number>();
waterData.forEach(country => {
  if (country.AnnualWaterWithdrawalPerCapita_2022 !== null) {
    consumptionMap.set(country.country, country.AnnualWaterWithdrawalPerCapita_2022);
  }
});

const getColor = (d: number | undefined) => {
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

const styleFeature = (feature?: Feature<Geometry, any>) => {
  const countryName = feature?.properties?.ADMIN || feature?.properties?.name;
  
  const consumption = consumptionMap.get(countryName);
  
  return {
    fillColor: getColor(consumption),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
};

const onEachFeature = (feature: Feature<Geometry, any>, layer: L.Layer) => {
  const countryName = feature.properties?.ADMIN || feature.properties?.name || "Desconocido";
  const consumption = consumptionMap.get(countryName);

  if (consumption !== undefined) {
    layer.bindPopup(`<strong>${countryName}</strong><br/>Withdrawal Per Capita: ${consumption.toLocaleString()} m³`);
  } else {
    layer.bindPopup(`<strong>${countryName}</strong><br/>No data available`);
  }
};

export const Map = () => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/countries.geojson")
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full h-150 m rounded-lg overflow-hidden shadow-md z-0 relative">
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
            data={geoData} 
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      <Legend />
    </div>
  );
};



