import { useState } from "react";
import TravelMap from "../components/TravelMap";
import CitySearch from "../components/CitySearch";

function MapPage() {
  const [searchedCity, setSearchedCity] = useState(null);

  return (
    <section className="map-page">
      <h1>Explore the Map</h1>
      <p>Click a pin to see each destination, or search for any city.</p>
      <CitySearch onCityFound={setSearchedCity} />
      <TravelMap searchedCity={searchedCity} />
    </section>
  );
}

export default MapPage;