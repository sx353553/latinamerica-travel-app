// import: bringing in a hook from React
import { useState } from "react";
// import: bringing in a hook and a component from React Router
import { useParams, Link } from "react-router-dom";
// import: bringing in the destinations array from your data file
import destinations from "../data/destinations";
// import: bringing in your ImageModal component
import ImageModal from "../components/ImageModal";

// Component: the detail page for one destination
function DestinationDetail() {
  // useParams hook + destructuring: reads the :id from the URL
  const { id } = useParams();

  // useState hook + destructuring: true/false state for whether the modal is open
  // (Hooks must always come BEFORE any early return in a component)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // find() array method + arrow function: gets the destination matching the URL
  const destination = destinations.find((place) => place.id === id);

  // if statement + early return: show a message if no destination matched
  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
        {/* Link component: moves to another page without reloading */}
        <Link to="/destinations">Back to destinations</Link>
      </section>
    );
  }

  // JSX: what the page shows when a destination is found
  return (
    <section className="detail">
      <Link to="/destinations">← Back to destinations</Link>

      <h1>
        {/* Curly braces in JSX: inserting JavaScript values (object properties) */}
        {destination.city}, {destination.country}
      </h1>

      <img
        className="detail__img"
        src={destination.image}
        alt={destination.city}
        // Event handler + arrow function: updating state opens the modal
        onClick={() => setIsModalOpen(true)}
      />
      <p className="detail__hint">Click the photo to enlarge it.</p>

      <p>{destination.description}</p>

      {/* Conditional rendering (&&): only show the modal when isModalOpen is true */}
      {isModalOpen && (
        <ImageModal
          image={destination.image} // Prop: passing the image down
          alt={destination.city} // Prop: passing the alt text down
          onClose={() => setIsModalOpen(false)} // Prop: passing a function down
        />
      )}
    </section>
  );
}

// export default: lets App.jsx import this page
export default DestinationDetail;