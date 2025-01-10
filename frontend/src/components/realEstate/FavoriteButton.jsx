import { useState } from "react";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";

export default function FavoriteButton() {
  // State to track the toggle
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to toggle the state
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <button
        onClick={toggleFavorite}
        className="rounded-full w-10 h-10  p-0 border-0 inline-flex items-center justify-center text-gray-500  hover:bg-gray-300"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <CiBookmarkCheck className="w-6 h-6 text-red-500" />
        ) : (
          <CiBookmark className="w-6 h-6 text-gray-500" />
        )}
      </button>
    </>
  );
}
