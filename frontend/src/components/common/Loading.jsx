import { RotatingLines } from "react-loader-spinner";


const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-fit">
      <div className="relative flex flex-col items-center">
        {/* Animated Dots */}
        {/* <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-400"></div>
        </div> */}
        <RotatingLines
  visible={true}
  height="96"
  width="96"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        {/* Text */}
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
