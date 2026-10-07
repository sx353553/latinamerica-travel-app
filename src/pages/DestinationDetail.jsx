import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";
import ImageModal from "../components/ImageModal";
import ImageCarousel from "../components/ImageCarousel";

function DestinationDetail() {
  const { id } = useParams();
  const [modalImage, setModalImage] = useState(null);

  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
        <Link to="/destinations">Back to destinations</Link>
      </section>
    );
  }

  const photos = [destination.image, ...(destination.gallery || [])];

  return (
    <section className="detail">
      <Link to="/destinations">← Back to destinations</Link>

      <h1>
        {destination.city}, {destination.country}
      </h1>

      <ImageCarousel
        key={destination.id}
        photos={photos}
        alt={destination.city}
        onPhotoClick={setModalImage}
      />

      <p className="detail__hint">
        {photos.length > 1
          ? "Use the arrows to see more photos. Click a photo to enlarge it."
          : "Click the photo to enlarge it."}
      </p>

      <p>{destination.description}</p>

      {modalImage && (
        <ImageModal
          image={modalImage}
          alt={destination.city}
          onClose={() => setModalImage(null)}
        />
      )}
    </section>
  );
}

export default DestinationDetail;