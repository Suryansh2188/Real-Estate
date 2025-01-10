import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button";
import logo from "../../assets/logo.webp";
import Profile from "./Profile";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setAuthModeDirectly, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignUp = () => {
    setAuthModeDirectly("sign-up")
    navigate("/auth/sign-up");
  }

  const handleSignIn = () => {
    setAuthModeDirectly("sign-in")
    navigate("/auth/sign-in");
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "Listing", href: "/post" },
    { name: "Members", href: "/" },
    { name: "Contact", href: "/" },
  ];

  return (
    <header className="text-gray-600 body-font">
      <div className="flex bg-white flex-wrap p-4 md:flex-row items-center rounded-full">
        <a className="flex title-font font-medium items-center text-gray-900">
          <img
            className="w-10 h-10 text-white rounded-full"
            src={logo}
            alt=""
          />
          <span className="ml-3 text-xl">PropertyPulse</span>
        </a>
        <button
          className="md:hidden text-gray-900 focus:outline-none ml-auto"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <nav
          className={`${
            isOpen
              ? "absolute top-24 bg-slate-300 left-0 w-full z-10 flex gap-3 flex-col items-center"
              : "hidden"
          } md:flex md:ml-auto md:mr-auto items-center text-base justify-center transition-all duration-300 ease-in-out`}
        >
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className=" mr-5 font-semibold cursor-pointer relative text-black group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </nav>
        <div className="hidden  sm:flex">
          {user ? (
            <Profile />
          ) : (
            <div className="flex  gap-2">
              <div onClick={() => handleSignUp()}>
                <Button label="Sign Up" />
              </div>
              <div onClick={() => handleSignIn()}>
                <Button label="Sign In" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
