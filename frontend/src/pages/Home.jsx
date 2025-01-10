
import Input from "../components/common/SearchBar";
import Navbar from "../components/common/Navbar";


export default function Home() {
  
  return (
    <>
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/city-sunset_1127-4143.jpg?t=st=1734027260~exp=1734030860~hmac=8b3d25ff24e51db541dacb274ff4389fbe06de499e5409b09bdd295a3393847d&w=900')",
      }}
    >
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Content in front of the image */}
      <div className="relative z-10 flex flex-col justify-between h-full text-white">
        <div className="mt-4">
        <Navbar/>
        </div>
        <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-bold mb-4">Believe in finding it</h1>
        <p className="text-lg mb-6 text-center">
          Search properties for sell and to rent in the UK
        </p>
        <Input/>
        <p className="text-md mb-6 text-center">
          What are you looking for?
        </p>
        <h1 className="text-4xl text-center font-bold mb-4">Believe in finding it</h1>
        </div>
        {/* <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-6 text-center">
          Experience the best services and enjoy your journey with us.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition duration-300">
          Get Started
        </button> */}
      </div>
    </div>
    </>
  )
}
