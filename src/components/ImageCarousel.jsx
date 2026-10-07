import { useState } from "react";

function ImageCarousel({ photos, alt, onPhotoClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = photos.length > 1;

  function showPrevious() {
    setCurrentIndex((index) => (index === 0 ? photos.length - 1 : index - 1));
  }

  function showNext() {
    setCurrentIndex((index) => (index === photos.length - 1 ? 0 : index + 1));
  }

  return (
    <div className="carousel">
      <div className="carousel__frame">
        <img
          className="detail__img"
          src={photos[currentIndex]}
          alt={`${alt}, photo ${currentIndex + 1} of ${photos.length}`}
          onClick={() => onPhotoClick(photos[currentIndex])}
        />

        {hasMultiple && (
          <>
            <button
              className="carousel__arrow carousel__arrow--prev"
              onClick={showPrevious}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="carousel__arrow carousel__arrow--next"
              onClick={showNext}
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="carousel__dots">
          {photos.map((photo, index) => (
            <button
              key={photo}
              className={
                index === currentIndex
                  ? "carousel__dot carousel__dot--active"
                  : "carousel__dot"
              }
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;