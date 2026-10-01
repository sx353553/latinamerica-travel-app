import { useState } from "react";
import { fetchCityData } from "../api/geodb";

function CitySearch({ onCityFound }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setStatus("Type a city name first.");
      return;
    }

    setStatus("Searching...");

    try {
      const city = await fetchCityData(trimmed);

      if (!city) {
        setStatus(`No results for "${trimmed}". Check the spelling and try again.`);
        return;
      }

      onCityFound(city);
      setStatus(`Showing ${city.city}, ${city.country}.`);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong with that search. Please try again.");
    }
  }

  return (
    <form className="city-search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a city (e.g. Buenos Aires)"
      />
      <button type="submit">Search</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default CitySearch;