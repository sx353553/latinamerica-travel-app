// import: the Link component from React Router (moves between pages without reloading)
import { Link } from "react-router-dom";
// import: the destinations array from your data file
import destinations from "../data/destinations";
// import: your reusable DestinationCard component
import DestinationCard from "../components/DestinationCard";

// Array: the ids of the destinations you want to feature on the Home page
// (const because this list never changes; you can swap in any ids you like)
const featuredIds = ["machu-picchu", "rio-de-janeiro", "galapagos"];

// Component: the Home page
function Home() {
  // filter() array method + arrow function: keeps only the destinations whose id
  // is in featuredIds. includes() checks whether an array contains a value.
  const featuredDestinations = destinations.filter((destination) =>
    featuredIds.includes(destination.id),
  );

  // JSX: what the Home page shows
  return (
    // Fragment (<> </>): groups the two sections without adding an extra element
    <>
      <section className="hero">
        <h1>Welcome to the Latin America Travel App!</h1>
        <p>
          Explore the beautiful countries of Latin America, where culture meets
          nature and adventure, and breathtaking landscapes await you!
        </p>
        {/* Link component: a button-styled link to the Destinations page */}
        <Link to="/destinations" className="button">
          Explore destinations
        </Link>
      </section>

      <section className="featured">
        <h2>Featured Destinations</h2>
        <p>A few favorites to start your journey.</p>

        <div className="card-grid">
          {/* map() array method: turns each featured destination into a card */}
          {featuredDestinations.map((destination) => (
            // Component + props: reusing DestinationCard, the same one from the
            // Destinations page. key prop: a unique id for each card in the list
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        <div className="featured__actions">
          {/* Link component: two buttons leading to the other pages */}
          <Link to="/destinations" className="button">
            See all 12 destinations
          </Link>
          <Link to="/map" className="button button--outline">
            View them on the map
          </Link>
        </div>
      </section>
    </>
  );
}

// export default: lets App.jsx import this page
export default Home;
