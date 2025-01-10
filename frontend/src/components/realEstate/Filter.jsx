/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaCity,
  FaMapMarkerAlt,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

const Filter = ({ filters, setFilters, fetchListings }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handlePropertyType = (type) => {
    setFilters((prev) => ({ ...prev, propertyType: type }));
  };

  const handleBedroomSelection = (bedrooms) => {
    setFilters((prev) => ({ ...prev, bedrooms }));
  };
  const handleBathroomSelection = (bathrooms) => {
    setFilters((prev) => ({ ...prev, bathrooms }));
  };

  const handlePriceChange = (e, type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const applyFilters = () => {
    fetchListings(filters);
  };

  return (
    <div className="">
      <div className="flex  justify-between items-center p-4 bg-white shadow-md rounded-lg mb-2">
        <h2 className="text-xl font-bold text-gray-800">Filter Properties</h2>
        <button
          className="text-gray-600 lg:hidden"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? <FaTimes size={24} /> : <FaFilter size={24} />}
        </button>
      </div>
      {/* Property Type */}
      <div className={`bg-gray-900 md:h-[30rem] overflow-y-auto text-white max-w-3xl mx-auto p-4 rounded-lg lg:block ${showFilters ? 'block mb-2' : 'hidden'}`}>
      <div>
        <h3 className="font-semibold text-lg mb-2">Property Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "House", icon: FaHome, value: "house" },
            { label: "Apartment", icon: FaBuilding, value: "apartment" },
            { label: "Commercial", icon: FaCity, value: "commercial" },
            { label: "Land Plot", icon: FaCity, value: "landPlot" },
          ].map(({ label, icon: Icon, value }) => (
            <button
              key={label}
              className={`flex text-sm flex-col items-center justify-center p-3 rounded-lg ${
                filters.propertyType === value
                  ? "bg-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => handlePropertyType(value)}
            >
              <Icon className="" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Location</h3>
        <div className="flex items-center border border-gray-700 p-3 rounded-lg bg-gray-800">
          <FaMapMarkerAlt className="mr-2" />
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className="bg-transparent outline-none w-full"
            value={filters.location || ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Price</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">Min: ${filters.price_min || 0}</div>
          <div className="text-sm">Max: ${filters.price_max || 1000000}</div>
        </div>
        <div className="relative">
          {/* <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={filters.price_min || 0}
            onChange={(e) => handlePriceChange(e, "price_min")}
            className="absolute top-0 left-0 w-full appearance-none bg-gray-800 h-1"
          /> */}
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={filters.price_max || 1000000}
            onChange={(e) => handlePriceChange(e, "price_max")}
            className="absolute top-0 left-0 w-full appearance-none bg-gray-800 h-1"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Bedrooms</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                filters.bedrooms === num
                  ? "bg-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => handleBedroomSelection(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Bathrooms</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                filters.bathrooms === num
                  ? "bg-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => handleBathroomSelection(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filters */}
      <div className="mt-6">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
      </div>
    </div>
  );
};

export default Filter;
