// import: bringing in the useEffect hook from React
import { useEffect } from "react";

// Component: a reusable piece of UI
// Props + destructuring: pulling image, alt, and onClose out of the props object
function ImageModal({ image, alt, onClose }) {
  // useEffect hook: runs code after the modal appears on screen
  useEffect(() => {
    // Arrow function + event handler: runs when any key is pressed
    const handleKeyDown = (event) => {
      // if statement: only close when the key was Escape
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Event listener: start listening for key presses on the whole page
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function: stop listening when the modal closes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); // Dependency array: re-run if onClose ever changes

  // JSX: the HTML-like markup this component shows
  return (
    // Event handler (onClick): clicking the dark background closes the modal
    <div className="modal" onClick={onClose}>
      {/* Event handler: the X button closes the modal */}
      <button className="modal__close" onClick={onClose}>
        ×
      </button>

      <img
        className="modal__img"
        src={image} // Prop: the image path passed in from the parent
        alt={alt}
        // Arrow function + stopPropagation(): clicking the photo itself
        // won't count as clicking the background, so it stays open
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

// export default: lets other files import this component
export default ImageModal;