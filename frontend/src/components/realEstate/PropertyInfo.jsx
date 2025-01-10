/* eslint-disable react/prop-types */

import { FaRulerCombined, FaSchool, FaBus, FaUtensils } from "react-icons/fa";

export default function PropertyInfo ({ size, school, bus, restaurant }) {
  return (
    <div>
      {/* Size and Address */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-gray-600 flex items-center space-x-2">
          <FaRulerCombined className="text-black w-5 h-5" />
           <span>{size} sq. ft.</span>
        </span>
        
      </div>

      {/* Nearby Amenities */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 flex items-center space-x-2">
          <FaSchool className="text-black w-5 h-5" />
          <span>{school}</span>
        </span>
        <span className="text-gray-600 flex items-center space-x-2">
          <FaBus className="text-black w-5 h-5" />
           <span>{bus}</span>
        </span>
        <span className="text-gray-600 flex items-center space-x-2">
          <FaUtensils className="text-black w-5 h-5" />
           <span>{restaurant}</span>
        </span>
      </div>
    </div>
  );
};


