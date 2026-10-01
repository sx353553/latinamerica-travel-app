import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";

function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
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
      <img src={destination.image} alt={destination.city} />
      <p>{destination.description}</p>
    </section>
  );
}

export default DestinationDetail;
