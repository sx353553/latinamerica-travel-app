import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import destinations from "../data/destinations";
import { fetchCityData } from "../api/geodb";

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const countryCodes = {
  Brazil: "BR",
  Argentina: "AR",
  Colombia: "CO",
  Chile: "CL",
  Peru: "PE",
  Venezuela: "VE",
  Ecuador: "EC",
  Guatemala: "GT",
  Bolivia: "BO",
  Paraguay: "PY",
  Uruguay: "UY",
  "Costa Rica": "CR",
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function FlyToCity({ city }) {
  const map = useMap();

  useEffect(() => {
    if (city) {
      map.flyTo([city.latitude, city.longitude], 8);
    }
  }, [city, map]);

  return null;
}

function TravelMap({ searchedCity }) {
  const [populations, setPopulations] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadPopulations() {
      for (const destination of destinations) {
        if (cancelled) return;

        try {
          const cityData = await fetchCityData(
            removeAccents(destination.city),
            countryCodes[destination.country],
          );

          if (!cancelled && cityData && cityData.population) {
            setPopulations((previous) => ({
              ...previous,
              [destination.id]: cityData.population,
            }));
          }
        } catch (error) {
          console.error(
            `Could not load population for ${destination.city}:`,
            error,
          );
        }

        await delay(1500); // GeoDB's free plan allows about 1 request per second
      }
    }

    loadPopulations();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MapContainer center={[-12, -70]} zoom={3} className="map">
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {destinations.map((destination) => (
        <Marker
          key={destination.id}
          position={[destination.lat, destination.lng]}
          icon={redIcon}
        >
          <Popup>
            <strong>
              {destination.city}, {destination.country}
            </strong>
            <br />
            <img
              src={destination.image}
              alt={destination.city}
              className="popup-img"
            />
            <br />
            {populations[destination.id] && (
              <>
                Population: {populations[destination.id].toLocaleString()}
                <br />
              </>
            )}
            <Link to={`/destinations/${destination.id}`}>View details</Link>
          </Popup>
        </Marker>
      ))}

      {searchedCity && (
        <Marker
          key={searchedCity.id}
          position={[searchedCity.latitude, searchedCity.longitude]}
          icon={redIcon}
          eventHandlers={{ add: (event) => event.target.openPopup() }}
        >
          <Popup autoPan={false}>
            <strong>
              {searchedCity.city}, {searchedCity.country}
            </strong>
            <br />
            {searchedCity.region && (
              <>
                {searchedCity.region}
                <br />
              </>
            )}
            Population:{" "}
            {searchedCity.population
              ? searchedCity.population.toLocaleString()
              : "N/A"}
          </Popup>
        </Marker>
      )}

      <FlyToCity city={searchedCity} />
    </MapContainer>
  );
}

export default TravelMap;
