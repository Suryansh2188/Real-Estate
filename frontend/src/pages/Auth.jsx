import { useContext, useEffect } from "react";
import SignUpCard from "../components/common/SignUpCard";
import logo from "../assets/logo.webp";
import { Button2 } from "../components/common/Button2";
import SignInCard from "../components/common/SignInCard";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authMode, toggleAuthMode, setAuthModeDirectly } =
    useContext(AuthContext);

  // Sync `authMode` with the URL path
  useEffect(() => {
    const path = location.pathname.split("/").pop(); // Get the last segment of the URL
    if (path === "sign-in" || path === "sign-up") {
      setAuthModeDirectly(path);
    }
  }, [location, setAuthModeDirectly]);

  const toggle = () => {
    if (authMode === "sign-in") {
      navigate("/auth/sign-up");
      toggleAuthMode();
    } else {
      navigate("/auth/sign-in");
      toggleAuthMode();
    }
  };
  return (
    <>
      <div className=" min-h-screen flex items-center justify-between">
        {/* <SignUpCard /> */}
        <div className="w-full h-screen  overflow-hidden relative">
          {/* Background Image */}
          <img
            src="https://img.freepik.com/premium-photo/background-modern-city_156719-1273.jpg?ga=GA1.1.50433606.1734027235&semt=ais_hybrid"
            alt="Modern City Background"
            className="h-full w-full object-cover"
          />

          {/* Centered Overlay */}
          <div className="absolute inset-0 flex flex-col items-center bg-black bg-opacity-30 text-white">
            <div className="w-full flex justify-between p-3">
              <div onClick={() => navigate("/")}>
                <a className="flex title-font font-medium items-center text-gray-900 cursor-pointer">
                  <img
                    className="w-10 h-10 text-white rounded-full"
                    src={logo}
                    alt=""
                  />
                  <span className="ml-3 text-xl cursor-default">
                    PropertyPulse
                  </span>
                </a>
              </div>
              <div>
                <Button2 onClick={() => toggle()}>
                  {authMode === "sign-up" ? "Sign In" : "Sign Up"}
                </Button2>
              </div>
            </div>
            {authMode === "sign-up" ? <SignUpCard /> : <SignInCard />}
          </div>
        </div>
      </div>
    </>
  );
}
