/* eslint-disable react/prop-types */
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaBath, FaBed } from "react-icons/fa";
import InfoSection from "../common/InfoSection";

export default function Overview({data}) {
    const overviewItems = [
        { icon: FaBed, text: `${data.bedrooms} Bedrooms` },
        { icon: FaBath, text: `${data.bathrooms} Bathrooms` },
        { icon: BsArrowsFullscreen, text: `${data.square_feet} sq.ft` },
      ];
  return (
    <InfoSection title="Overview" items={overviewItems} />
  )
}
