
import { FaBus } from "react-icons/fa";
import { MdRestaurant, MdSchool } from "react-icons/md";
import InfoSection from "../common/InfoSection";

const NearbyPlaces = () => {
  const nearbyPlacesItems = [
    { icon: FaBus, text: "Bus Stop - 500m" },
    { icon: MdRestaurant, text: "Restaurant - 200m" },
    { icon: MdSchool, text: "School - 1km" },
  ];

  return <InfoSection title="Nearby Places" items={nearbyPlacesItems} />;
};

export default NearbyPlaces;
