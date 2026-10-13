# Latin America Travel App

A React web app for exploring travel destinations across Latin America. Browse 12 featured destinations, sort them, flip through photo galleries, and explore an interactive map with live population data. You can also search for any city in the world and get its location, population, photo, and description in real time.

This project is a rebuild of my Module 5 JavaScript final project, recreated from scratch in React.

**Live demo:** https://latinamerica-travel-app.vercel.app/

## Features

- **Home page** with a full-width hero image and featured destinations
- **Destinations page** with 12 destination cards and sorting (City A–Z, City Z–A, Country A–Z)
- **Destination detail pages** with a description and a photo carousel (arrows, dots, and wraparound)
- **Image modal** to enlarge any photo (closes with the ×, clicking the background, or the Escape key)
- **Interactive map** with a pin and photo popup for every destination
- **Live population data** for each destination, loaded from the GeoDB Cities API
- **City search** for any city in the world. The map flies to the city and shows its region, population, photo, and a short description from Wikipedia
- **Responsive design** that adapts to desktop, tablet, and phone screens
- **404 page** for any URL that doesn't exist

## Built With

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for page navigation
- [React Leaflet](https://react-leaflet.js.org/) and [Leaflet](https://leafletjs.com/) for the interactive map
- [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) (via RapidAPI) for city locations and populations
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) for city photos and descriptions
- CSS with Flexbox, Grid, and media queries
- Deployed on [Vercel](https://vercel.com/)

## React Concepts Used

- **Components and props:** reusable pieces like `DestinationCard`, used on both the Home and Destinations pages
- **`useState`:** sorting, the search input, status messages, the searched city, the photo carousel, the image modal, and population data
- **`useEffect`:** loading population data when the map appears, flying the map to a searched city, and listening for the Escape key, with cleanup functions
- **React Router:** `Routes`, `Route`, `Link`, `NavLink`, and `useParams` for dynamic detail pages (`/destinations/:id`)
- **Lifting state up:** the searched city is shared between the search bar and the map through their parent page
- **Conditional rendering** and **rendering lists** with `map()` and `key` props
- **Async API calls** with `fetch`, `async`/`await`, and `try`/`catch` error handling

## Project Structure

```
src/
├── api/          # GeoDB and Wikipedia API functions
├── components/   # Nav, Footer, DestinationCard, ImageCarousel, ImageModal, CitySearch, TravelMap
├── data/         # Destination data (cities, coordinates, photos, descriptions)
├── pages/        # Home, Destinations, DestinationDetail, MapPage, NotFound
├── App.jsx       # Routes
├── main.jsx      # App entry point
└── index.css     # Styles
```

## Getting Started

1. Clone the repository:

```bash
   git clone https://github.com/sx353553/latinamerica-travel-app.git
   cd latinamerica-travel-app
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the project's main folder with your own free [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) key from RapidAPI:

```
   VITE_GEODB_API_KEY=your-api-key-here
```

4. Start the development server:

```bash
   npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Improvements from the Module 5 Version

- Rebuilt with reusable React components instead of repeated HTML
- Added separate pages with React Router, including a detail page for each destination
- Added a photo gallery for each destination
- Moved the API key out of the code and into an environment variable
- Fixed map coordinates for Rio de Janeiro and San José
- Replaced a mislabeled Santiago photo with a real photo of Santiago
- City population lookups now filter by country, so cities like San José, Costa Rica don't match larger cities with the same name elsewhere
- Search results now include a photo and description from Wikipedia

## Photo Credits

Photos from [Unsplash](https://unsplash.com/) and [Wikimedia Commons](https://commons.wikimedia.org/).

- Huayna Picchu (`machu-picchu-2.jpg`): David Broad, CC BY 3.0, via Wikimedia Commons
- Llama at Machu Picchu: freestock.ca, CC BY-SA 3.0, via Wikimedia Commons

## Author

**Raul Castillo**
GitHub: [@sx353553](https://github.com/sx353553)
