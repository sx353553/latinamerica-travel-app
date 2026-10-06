// Arrow function: builds the Wikipedia API URL for a page title.
// replaceAll() string method: Wikipedia titles use underscores instead of spaces
// Template literal: inserting the title into the URL with ${ }
const buildUrl = (title) =>
  `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title.replaceAll(" ", "_"),
  )}`;

// async function: tries to load one Wikipedia page summary, or returns null
async function fetchSummary(title) {
  // await + fetch(): request the summary (no API key needed for Wikipedia)
  const response = await fetch(buildUrl(title));

  // if statement: a missing page returns an error status, so give up on this title
  if (!response.ok) {
    return null;
  }

  // await: turn the response into a JavaScript object
  const data = await response.json();

  // if statement: "disambiguation" pages are lists like "San José may refer to...",
  // which aren't about one specific city, so skip them
  if (data.type === "disambiguation") {
    return null;
  }

  return data;
}

// export + async function: gets a photo and description for a city.
// Tries "City, Country" first (more exact), then just "City".
export async function fetchCitySummary(cityName, countryName) {
  // Array: the page titles to try, in order
  const titlesToTry = [`${cityName}, ${countryName}`, cityName];

  // for...of loop: go through each title until one works
  for (const title of titlesToTry) {
    // try...catch: if Wikipedia fails, don't break the whole search
    try {
      const summary = await fetchSummary(title);
      if (summary) {
        return summary; // found one, so stop looking
      }
    } catch (error) {
      console.error(`Wikipedia lookup failed for "${title}":`, error);
    }
  }

  // Nothing found: the popup will just show without a photo
  return null;
}
