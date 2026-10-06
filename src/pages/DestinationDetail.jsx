import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";
import ImageModal from "../components/ImageModal";

function DestinationDetail() {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
        {/* Link component: moves to another page without reloading */}
        <Link to="/destinations">Back to destinations</Link>
      </section>
    );
  }

  return (
    <section className="detail">
      <Link to="/destinations">← Back to destinations</Link>

      <h1>
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
          image={destination.image} 
          alt={destination.city} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}

export default DestinationDetail;