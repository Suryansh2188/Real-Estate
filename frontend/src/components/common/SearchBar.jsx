import {useState} from 'react'
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    return (
      <div className="flex items-center justify-center w-full p-4">
        <div className="flex w-full max-w-sm space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter city"
            className="w-full py-2 px-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out text-black"
          />
          <Link to={`/list?city=${inputValue}`}>
          <button
            className="py-2 px-6 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 focus:outline-none transition ease-in-out"
          >
            Search
          </button>
          </Link>
        </div>
      </div>
  );
}
