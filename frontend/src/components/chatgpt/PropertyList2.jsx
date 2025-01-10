
import PropertyCard from './PropertyCard';

const properties = [
  {
    id: 1,
    image: 'https://source.unsplash.com/400x300/?house',
    title: 'Seaside Serenity Villa',
    price: '$1,250,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,500 sqft',
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/400x300/?apartment',
    title: 'Urban Studio',
    price: '$3,200,000',
    bedrooms: 1,
    bathrooms: 1,
    area: '1,200 sqft',
  },
];

const PropertyList2 = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList2;
