// import: the useState hook from React
import { useState } from "react";
// import: your two API functions (named imports use { })
import { fetchCityData } from "../api/geodb";
import { fetchCitySummary } from "../api/wikipedia";

// Component + props + destructuring: onCityFound is a function passed down from MapPage
function CitySearch({ onCityFound }) {
  // useState hook: the text typed in the search box (controlled input)
  const [query, setQuery] = useState("");
  // useState hook: the message shown under the search box
  const [status, setStatus] = useState("");

  // async function + event handler: runs when the form is submitted
  async function handleSubmit(event) {
    // preventDefault(): stops the browser from reloading the page
    event.preventDefault();
    // trim() string method: removes spaces from the start and end
    const trimmed = query.trim();

    // if statement + early return: don't search if the box is empty
    if (!trimmed) {
      setStatus("Type a city name first.");
      return;
    }

    setStatus("Searching...");

    // try...catch: handles any errors from the API calls
    try {
      // await: API #1, GeoDB finds the city
      const city = await fetchCityData(trimmed);

      if (!city) {
        // Template literal: inserting the search text into the message
        setStatus(
          `No results for "${trimmed}". Check the spelling and try again.`,
        );
        return;
      }

      // await: API #2, Wikipedia finds a photo and description
      const summary = await fetchCitySummary(city.city, city.country);

      // Spread operator (...): copies all of the city's data into a new object
      // and adds the Wikipedia summary to it, then sends it up to MapPage
      onCityFound({ ...city, summary });

      setStatus(`Showing ${city.city}, ${city.country}.`);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong with that search. Please try again.");
    }
  }

  // JSX: the search form
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
      {/* Conditional rendering (&&): only show the message if there is one */}
      {status && <p>{status}</p>}
    </form>
  );
}

// export default: lets MapPage import this component
export default CitySearch;
