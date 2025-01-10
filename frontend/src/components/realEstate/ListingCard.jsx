/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { FaHeart, FaBed, FaBath } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const ListingCard = ({ item }) => {
  //console.log(item);
  const {user} = useContext(AuthContext);
  //console.log(user)
  const navigate  = useNavigate();
  const [isLike, setIsLike] = useState(false);

  const toggleLike = (postId) => {
    setIsLike(!isLike);
    axios.post("http://localhost:5000/post/savedPost", {postId}, {withCredentials: true})
  }
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative w-full h-52 md:w-1/3">
        <img
          src={item.photos[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {/* Favorite Icon */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg" onClick={() => toggleLike(item._id)}>
          <FaHeart className={`text-gray-500  ${item.isSaved  ? 'text-red-500' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 md:w-2/3">
        {/* Address */}
        <p className="text-sm text-gray-500 uppercase">{item.location.address}, {item.location.city}</p>
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-1 truncate">{item.description}</p>

        {/* Features */}
        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-3">
          <div className="flex items-center space-x-1">
            <FaBed className="text-black w-5 h-5" />
            <span>{item.features.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaBath className="text-black w-5 h-5" />
            <span>{item.features.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <BsArrowsFullscreen className="text-black w-5 h-5" />
            <span>{item.features.square_feet} sq.ft</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-800"><p className="text-md font-normal">Price</p>${item.price.toLocaleString()}</div>
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200" onClick={() => navigate(`/post/${item._id}`)}>
            Property Details
          </button>
          {item.user_id === user._id && (<button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200" onClick={() => navigate(`/profile/edit-post/${item._id}`)}>
            Edit
          </button>)}
          
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
