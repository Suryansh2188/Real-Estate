import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

// import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center space-x-1"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div
        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border border-gray-300"
        onClick={() => navigate("/profile")}
      >
        <img
          src={user.profile_photo || "/profile.png"} // Replace with your profile image URL
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className="text-gray-700 font-medium"
        // onClick={() => navigate('/profile')}
      >
        {user.first_name}
      </span>

      {showPopup && (
        <div className="absolute right-0 mt-28 w-36 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="flex flex-col">
            <li
              className="px-4 py-2 hover:bg-black hover:rounded-lg hover:text-white cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-black hover:rounded-lg hover:text-white cursor-pointer"
              onClick={async () => {
                // Add your logout logic here
                try {
                  await axios.post("http://localhost:5000/auth/logout");
                  updateUser(null);
                  navigate("/");
                  toast.success("Logout Successfully");
                } catch (error) {
                  toast.error(error);
                }
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
