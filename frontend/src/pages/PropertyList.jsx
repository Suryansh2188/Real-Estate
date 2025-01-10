
import PropertyDetails from '../components/chatgpt/PropertyDetails'
import PropertyList2 from '../components/chatgpt/PropertyList2'
import FilterSidebar from '../components/chatgpt/FilterSidebar'

export default function PropertyList() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <FilterSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Property List */}
        <div className="flex-1 overflow-auto p-4">
          <PropertyList2 />
        </div>

        {/* Property Details */}
        <div className="flex-1 hidden lg:block bg-white shadow-lg p-4">
          <PropertyDetails />
        </div>
      </div>
    </div>
  )
}
