import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ListingCard from "./ListingCard";
import { FaPlus } from "react-icons/fa";

export default function MyListing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myListing");
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      setActiveTab("myListing");
      const { data } = await axios.get(
        "http://localhost:5000/post/profile/posts",
        { withCredentials: true }
      );
      setPosts(data.myPosts);
      //console.log(data.myPosts);
    } catch (error) {
      console.error("Error fetching My Posts:", error);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      setActiveTab("saved");
      const { data } = await axios.get(
        "http://localhost:5000/post/profile/posts",
        { withCredentials: true }
      );
      setPosts(data.mySavedPosts);
      console.log(data.mySavedPosts);
    } catch (error) {
      console.error("Error fetching Saved Posts:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "myListing") {
      fetchMyPosts();
    } else if (activeTab === "saved") {
      fetchSavedPosts();
    }
  }, [activeTab]);

  return (
    <div className="sm:w-full bg-white shadow-md rounded-lg p-2 mt-3">
      <div className="flex justify-between m-6">
        <div>
          <button
            className={`mr-4 md:text-sm text-xs font-medium px-4 border rounded-full p-2 ${
              activeTab === "myListing"
                ? "border-black"
                : "border-transparent text-gray-600"
            }`}
            onClick={fetchMyPosts}
          >
            My Listing
          </button>
          <button
            className={`mr-4 md:text-sm text-xs font-medium px-4 border rounded-full p-2 ${
              activeTab === "saved"
                ? "border-black"
                : "border-transparent text-gray-600"
            }`}
            onClick={fetchSavedPosts}
          >
            Saved
          </button>
        </div>
        <button
          className="flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          onClick={() => navigate("/profile/add-post")}
        >
          <FaPlus className="mr-2" />
          Add Post
        </button>
      </div>
      {/* Listing Section */}
      <div className="p-4">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto">
            {posts.map((listing, index) => (
              <ListingCard key={index} item={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No listings available</p>
        )}
      </div>
    </div>
  );
}
