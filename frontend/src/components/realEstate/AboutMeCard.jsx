import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function AboutMeCard() {
  const {user} = useContext(AuthContext);
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6">
      <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
        About Me
      </h1>
      <p className="leading-relaxed mb-4">
        {user.about || <p className="text-center text-gray-500">Add About</p>}
      </p>
    </div>
  );
}
