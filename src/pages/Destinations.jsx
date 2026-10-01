import { useState } from "react";
import destinations from "../data/destinations";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const [sortBy, setSortBy] = useState("default");

  const sortedDestinations = [...destinations];

  if (sortBy === "city-az") {
    sortedDestinations.sort((a, b) => a.city.localeCompare(b.city));
  } else if (sortBy === "city-za") {
    sortedDestinations.sort((a, b) => b.city.localeCompare(a.city));
  } else if (sortBy === "country-az") {
    sortedDestinations.sort((a, b) => a.country.localeCompare(b.country));
  }

  return (
    <section className="destinations">
      <h1>Top Destinations</h1>

      <div className="sort">
        <label htmlFor="sort-filter">Sort destinations: </label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="city-az">City A-Z</option>
          <option value="city-za">City Z-A</option>
          <option value="country-az">Country A-Z</option>
        </select>
      </div>

      <div className="card-grid">
        {sortedDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}

export default Destinations;
