

const PropertyDetails = () => {
  return (
    <div>
      <img
        src="https://source.unsplash.com/400x300/?villa"
        alt="Property"
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">Seaside Serenity Villa</h2>
      <p className="text-gray-600 mt-2">Wake up to the sound of waves in this luxurious villa.</p>
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>3 Beds</span>
        <span>2 Baths</span>
        <span>2,500 sqft</span>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Contact Agent
      </button>
    </div>
  );
};

export default PropertyDetails;
