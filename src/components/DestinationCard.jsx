import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <Link to={`/destinations/${destination.id}`} className="card">
      <img src={destination.image} alt={destination.city} />
      <h3>
        {destination.city}, {destination.country}
      </h3>
    </Link>
  );
}

export default DestinationCard;
