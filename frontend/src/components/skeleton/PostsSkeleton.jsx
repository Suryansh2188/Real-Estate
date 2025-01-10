export default function PostsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="relative w-full h-52 md:w-1/3">
        <div className="w-full h-full bg-gray-200"></div>
      </div>

      <div className="flex flex-col p-4 md:w-2/3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>

        <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>

        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-3">
          <div className="h-4 bg-gray-200 rounded w-8"></div>
          <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
          <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4 ml-4"></div>
        </div>
      </div>
    </div>
  );
}
