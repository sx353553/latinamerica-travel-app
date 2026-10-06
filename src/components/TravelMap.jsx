// import: hooks from React
import { useEffect, useState } from "react";
// import: map components and the useMap hook from react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import: the Link component from React Router
import { Link } from "react-router-dom";
// import: the Leaflet library itself (used to create the red pin icon)
import L from "leaflet";
// import: your destinations array and your GeoDB API function
import destinations from "../data/destinations";
import { fetchCityData } from "../api/geodb";

// Object: settings for the red pin icon (same pin as Module 5)
const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41], // Array: [width, height]
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Object: matches each country name to its 2-letter code for the GeoDB search
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

// Function + Promise: waits a number of milliseconds before continuing
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function: turns "Bogotá" into "Bogota" so the API matches it reliably
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Function: shortens long text and adds "..." at the end
// slice() string method: takes the first part of the text
function shorten(text, maxLength) {
  // Ternary operator: if the text is too long, cut it; otherwise keep it
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trim()}...`
    : text;
}

// Component: flies the map to the searched city
function FlyToCity({ city }) {
  // useMap hook: gives access to the Leaflet map
  const map = useMap();

  // useEffect hook: runs whenever the searched city changes
  useEffect(() => {
    if (city) {
      // flyTo(): moves the map to a spot slightly north of the city (+ 0.8),
      // which places the pin lower on screen so the tall popup fits above it
      map.flyTo([city.latitude + 0.8, city.longitude], 8);
    }
  }, [city, map]); // Dependency array: re-run when city or map changes

  // Returning null: this component does its job without showing anything
  return null;
}

// Component + props: the map itself
function TravelMap({ searchedCity }) {
  // useState hook: an object that fills in with each destination's population
  const [populations, setPopulations] = useState({});

  // useEffect hook with []: runs once when the map first appears
  useEffect(() => {
    let cancelled = false; // let: this value will change in the cleanup

    // async function: loads the population for each destination, one at a time
    async function loadPopulations() {
      // for...of loop: goes through each destination in order
      for (const destination of destinations) {
        if (cancelled) return;

        // try...catch: if one city fails, keep going with the others
        try {
          const cityData = await fetchCityData(
            removeAccents(destination.city),
            countryCodes[destination.country],
          );

          if (!cancelled && cityData && cityData.population) {
            // Updater function + spread operator: keeps the old populations
            // and adds the new one
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

    // Cleanup function: stops the loop if you leave the Map page
    return () => {
      cancelled = true;
    };
  }, []);

  // JSX: the map, its tiles, and the markers
  return (
    <MapContainer center={[-12, -70]} zoom={3} className="map">
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* map() array method: one marker for each of your 12 destinations */}
      {destinations.map((destination) => (
        <Marker
          key={destination.id} // key prop: unique id for each item in a list
          position={[destination.lat, destination.lng]}
          icon={redIcon}
        >
          <Popup>
            <strong>
              {destination.city}, {destination.country}
            </strong>
            <img
              src={destination.image}
              alt={destination.city}
              className="popup-img"
            />
            {/* Conditional rendering (&&): only show population once it has loaded */}
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

      {/* Conditional rendering (&&): only show this marker after a search */}
      {searchedCity && (
        <Marker
          key={searchedCity.id}
          position={[searchedCity.latitude, searchedCity.longitude]}
          icon={redIcon}
          // Event handler: opens the popup as soon as the marker is added
          eventHandlers={{ add: (event) => event.target.openPopup() }}
        >
          <Popup autoPan={false}>
            <strong>
              {searchedCity.city}, {searchedCity.country}
            </strong>
            {/* Optional chaining (?.): safely reads summary.thumbnail even if
                summary is null, instead of crashing */}
            {searchedCity.summary?.thumbnail && (
              <img
                src={searchedCity.summary.thumbnail.source}
                alt={searchedCity.city}
                className="popup-img"
              />
            )}
            {searchedCity.region && (
              <>
                {searchedCity.region}
                <br />
              </>
            )}
            Population:{" "}
            {/* Ternary operator: show the number, or "N/A" if there isn't one */}
            {searchedCity.population
              ? searchedCity.population.toLocaleString()
              : "N/A"}
            {/* Optional chaining + conditional rendering: the Wikipedia description */}
            {searchedCity.summary?.extract && (
              <p className="popup-text">
                {shorten(searchedCity.summary.extract, 160)}{" "}
                <a
                  href={searchedCity.summary.content_urls?.desktop?.page}
                  target="_blank" // opens Wikipedia in a new tab
                  rel="noreferrer"
                >
                  Read more
                </a>
              </p>
            )}
          </Popup>
        </Marker>
      )}

      <FlyToCity city={searchedCity} />
    </MapContainer>
  );
}

// export default: lets MapPage import this component
export default TravelMap;
