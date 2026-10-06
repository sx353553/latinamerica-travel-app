import { useState } from "react";
import { fetchCityData } from "../api/geodb";
import { fetchCitySummary } from "../api/wikipedia";

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
      // await: API #1, GeoDB finds the city
      const city = await fetchCityData(trimmed);

      if (!city) {
        setStatus(
          `No results for "${trimmed}". Check the spelling and try again.`,
        );
        return;
      }

      // await: API #2, Wikipedia finds a photo and description
      const summary = await fetchCitySummary(city.city, city.country);

      onCityFound({ ...city, summary });

      setStatus(`Showing ${city.city}, ${city.country}.`);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong with that search. Please try again.");
    }
  }

  return (
    // Event handler (onSubmit): pressing Enter or clicking Search runs handleSubmit
    <form className="city-search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query} // Controlled input: the box shows whatever is in state
        // Arrow function + event handler: typing updates the state
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a city (e.g. Buenos Aires)"
      />
      <button type="submit">Search</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default CitySearch;
