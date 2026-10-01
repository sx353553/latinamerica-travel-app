const API_KEY = import.meta.env.VITE_GEODB_API_KEY;
const HOST = "wft-geo-db.p.rapidapi.com";

export async function fetchCityData(query, countryCode) {
  const cityName = query.split(",")[0].trim();

  let url = `https://${HOST}/v1/geo/cities?namePrefix=${encodeURIComponent(
    cityName,
  )}&limit=1&sort=-population`;

  if (countryCode) {
    url += `&countryIds=${countryCode}`;
  }

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`GeoDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.data && data.data.length > 0 ? data.data[0] : null;
}
