import { useEffect } from "react";

function ImageModal({ image, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); 
  return (
    <div className="modal" onClick={onClose}>
      <button className="modal__close" onClick={onClose}>X
      </button>

      <img
        className="modal__img"
        src={image} 
        alt={alt}
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

export default ImageModal;