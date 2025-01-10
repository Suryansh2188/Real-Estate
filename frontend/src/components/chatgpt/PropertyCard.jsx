/* eslint-disable react/prop-types */


const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="mt-2 text-lg font-bold">{property.title}</h3>
      <p className="text-gray-500">{property.price}</p>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>{property.bedrooms} Beds</span>
        <span>{property.bathrooms} Baths</span>
        <span>{property.area}</span>
      </div>
    </div>
  );
};

export default PropertyCard;
