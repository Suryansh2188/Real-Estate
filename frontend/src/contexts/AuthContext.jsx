/* eslint-disable react/prop-types */
// src/contexts/AuthContext.jsx
//import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
//import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  //const location = useLocation();
  const [authMode, setAuthMode] = useState("sign-in"); // "sign-in" or "sign-up"
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )


  const updateUser = (data) => {
    setUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Sync `authMode` with the URL path
  // useEffect(() => {
  //   const path = location.pathname.split("/").pop(); // Get the last segment of the URL
  //   if (path === "sign-in" || path === "sign-up") {
  //     setAuthMode(path);
  //   }
  // }, [location]);

  const toggleAuthMode = () => {
    const newMode = authMode === "sign-in" ? "sign-up" : "sign-in";
    setAuthMode(newMode);
    // navigate(`/auth/${newMode}`);
  };

  const setAuthModeDirectly = (mode) => {
    setAuthMode(mode);
    // navigate(`/auth/${mode}`);
    // if (mode !== authMode) {
    //   }
  };



  return (
    <AuthContext.Provider
      value={{ authMode, toggleAuthMode, setAuthModeDirectly, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
