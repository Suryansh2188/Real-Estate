import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/common/Button";
import ImageGallery from "../components/realEstate/ImageGallery";
import Overview from "../components/realEstate/Overview";
import NearbyPlaces from "../components/realEstate/NearbyPlaces";

export default function PropertyDetails() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // Property data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isLike, setIsLike] = useState(false); // Like button state

  // Fetch property details on component mount
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/post/${id}`,
          { withCredentials: true }
        );
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const toggleLike = () => {
    setIsLike(!isLike);
  };

  // Show a loading spinner or fallback message while data is being fetched
  if (isLoading) {
    return (
      <div className="text-center mt-20 text-blue-500 text-xl">
        Loading property details...
      </div>
    );
  }

  // Handle case when the property is not found
  if (!property) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Property not found!
      </div>
    );
  }

  console.log(property)

  const { title, price, images, address, city, description, owner } = property;

  return (
    <div className="container h-screen py-4 mx-auto bg-gradient-to-br from-yellow-100 to-gray-200">
      <div className="lg:w-11/12 mx-auto flex flex-wrap px-3">
        {/* Images Section */}
        <ImageGallery images={property.post.photos} />

        {/* Details Section */}
        <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
          <div className="flex justify-between shadow-md bg-white p-4 rounded-md mb-3">
            <div>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {property.post.title}
              </h1>
              <p>
                <span className="text-gray-600 flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-black w-4 h-4" />
                  <span>
                    {property.post.location.address}, {property.post.location.city}
                  </span>
                </span>
              </p>
              <p className="text-gray-600 text-lg mb-1">
                <span className="font-bold text-gray-900">{property.post.price}</span>
              </p>
              <div className="flex gap-2">
                <Button label="Connect" />
                {/* Favorite Icon */}
                <button
                  className="bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                  onClick={toggleLike}
                >
                  <FaHeart
                    className={`text-gray-500 ${isLike ? "text-red-500" : ""}`}
                  />
                </button>
              </div>
            </div>
            {/* Owner Information */}
            {property.post.user_id && (
              <div className="flex flex-col items-center bg-orange-700 p-2 rounded-md">
                <img
                  src={property.post.user_id.avatar || '/profile.png'}
                  alt={property.post.user_id.first_name}
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <h1 className="text-md font-bold mt-1">{property.post.user_id.first_name}</h1>
                <p className=" font-bold text-md">{property.post.user_id.last_name}</p>
              </div>
            )}
          </div>

          {/* Overview Section */}
          <Overview data={property.post.features}/>

          {/* Nearby Places Section */}
          <NearbyPlaces data={property.post}/>

          {/* Description Section */}
          <div className="shadow-md bg-white p-4 rounded-md">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-2">
              Description
            </h1>
            <p className="leading-relaxed mb-4">{property.post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
