import { MdOutlineMailOutline } from "react-icons/md";
//import { IoCallOutline } from "react-icons/io5";
import Button from "../common/Button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

export default function UserInfoCard() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout");
      updateUser(null);
      navigate("/");
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between shadow-md bg-white p-2 rounded-md mb-3">
      <div className="flex flex-col items-center  bg-orange-700 p-2 rounded-md md:w-1/3">
        <img
          src={user.profile_photo || '/profile.png'}
          alt="Profile"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300"
        />
        <h1 className="text-lg md:text-xl font-bold mt-1 text-center md:text-left">{`${user.first_name} ${user.last_name}`}</h1>
      </div>
      <div className="flex flex-col items-start md:items-end justify-between mt-2 md:mt-0 md:w-2/3">
        <p className="flex items-center space-x-2 text-sm md:text-base">
          <MdOutlineMailOutline className="text-black w-5 h-5" />
          <span className="text-gray-600">{user.email}</span>
        </p>
        {/* <p className="flex items-center space-x-2 text-sm md:text-base mt-1">
          <IoCallOutline className="text-black w-4 h-4" />
          <span className="text-gray-600">{`9399149268`}</span>
        </p> */}
        <div className="flex gap-2 mt-3">
          <div onClick={handleLogout}>
            <Button label="Logout" />
          </div>
          <div onClick={() => navigate('/profile/edit')}>
            <Button label="Edit" />
          </div>
        </div>
      </div>
    </div>
  );
}
