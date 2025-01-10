/* eslint-disable react/prop-types */
import { useState } from "react";

const ImageGallery = ({ images }) => {
  console.log(images)
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleShowMoreClick = () => {
    setShowAllImages(true);
  };

  const closeGallery = () => {
    setShowAllImages(false);
  };

  return (
    <div className="lg:w-1/2 w-full">
      <div className="flex flex-wrap">
        {/* Full-width first image */}
        <div className="w-full h-64 mb-4">
          <img
            alt="apartment"
            className="w-full h-full object-cover object-center rounded-xl cursor-zoom-in"
            src={images[0]}
            onClick={() => handleImageClick(images[0])}
          />
        </div>

        {/* Smaller next images */}
        {images.slice(1, 3).map((src, idx) => (
          <div key={idx} className="lg:w-1/3 w-1/2 h-32">
            <img
              alt="apartment"
              className="w-full h-full object-cover object-center rounded-xl cursor-zoom-in"
              src={src}
              onClick={() => handleImageClick(src)}
            />
          </div>
        ))}

        {/* Remaining image count */}
        {images.length > 3 && (
          <div
            className="lg:w-1/3 w-1/2 h-32 flex items-center justify-center bg-gray-200 rounded-xl relative cursor-pointer"
            onClick={handleShowMoreClick} // Show all extra images in a modal
            style={{
              backgroundImage: `url(${images[3]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
              <span className="text-white text-lg font-semibold">
                +{images.length - 3} More
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal for magnified image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={closeModal}
        >
          <div className="relative lg:w-1/2">
            <img
              src={selectedImage}
              alt="Magnified"
              className="max-w-full max-h-full object-contain rounded"
            />
            <button
              className="absolute top-2 right-2 text-black rounded-full p-2 focus:outline-none"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal for showing all images */}
      {showAllImages && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeGallery}
        >
          <div className="relative w-4/5 h-4/5 bg-white rounded overflow-y-auto p-4 cursor-default">
            <button
              className="absolute top-2 right-2 text-gray-700 bg-gray-200 rounded-full p-2 focus:outline-none"
              onClick={closeGallery}
            >
              ✕
            </button>
            <div className="grid grid-cols-2 gap-4">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  alt="extra images"
                  className="w-full h-48 object-cover object-center rounded cursor-zoom-in"
                  src={src}
                  onClick={() => handleImageClick(src)} // Open magnified view on click
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
