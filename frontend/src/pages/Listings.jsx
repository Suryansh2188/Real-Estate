import { useState, useEffect } from "react";
import Filter from "../components/realEstate/Filter";
import ListingCard from "../components/realEstate/ListingCard";
import axios from "axios";
import PostsSkeleton from "../components/skeleton/PostsSkeleton";

export default function Listings() {
  const [filters, setFilters] = useState({
    type: "sale",
    location: "",
    price_min: 0,
    price_max: 0,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "",
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial fetch to get all listings when no filters are applied
    fetchListings({});
  }, []);

  const fetchListings = async (appliedFilters) => {
    setLoading(true);
    setTimeout(async() => {
    try {
      // Build query string only if filters are provided
      const query = Object.keys(appliedFilters).length
        ? `?${new URLSearchParams(appliedFilters).toString()}`
        : "";
        console.log("", query);
      
      const response = await axios.get(`http://localhost:5000/post${query}`);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }, 2000)
  };

  return (
    <>
      <div className="bg-gradient-to-br from-yellow-100 to-gray-200 p-6">
        <div className="lg:flex gap-3">
          {/* Filter component */}
          <Filter
            filters={filters}
            setFilters={setFilters}
            fetchListings={() => fetchListings(filters)}
          />
          
          {/* Listings Display */}
          <div className="w-full md:h-[34rem] rounded-lg overflow-y-auto">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {loading ? (
                // Display skeleton loader when loading
                <>
                  <PostsSkeleton />
                  <PostsSkeleton />
                  <PostsSkeleton />
                </>
              ) : (
                // Show listings or a fallback message if no listings
                listings.length > 0 ? (
                  listings.map((item, index) => (
                    <ListingCard key={index} item={item} />
                  ))
                ) : (
                  <div>No listings available</div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
