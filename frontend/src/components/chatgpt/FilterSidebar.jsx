

const FilterSidebar = () => {
  return (
    <div className="w-64 hidden md:block bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div>
        <h3 className="text-sm font-medium mb-2">Property Type</h3>
        <div className="space-y-2">
          {['House', 'Apartment', 'Commercial', 'Land Plot'].map((type) => (
            <button key={type} className="block w-full bg-gray-800 py-2 px-4 rounded hover:bg-gray-700">
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Location</h3>
        <select className="w-full bg-gray-800 py-2 px-4 rounded">
          <option>Oslo, Europe</option>
          <option>New York, USA</option>
          <option>Tokyo, Japan</option>
        </select>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Price</h3>
        <input type="range" className="w-full" min="700" max="5000" />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Rooms</h3>
        <div className="flex space-x-2">
          {Array(4)
            .fill()
            .map((_, i) => (
              <button key={i} className="bg-gray-800 w-10 py-2 rounded hover:bg-gray-700">
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
