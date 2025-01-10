/* eslint-disable react/prop-types */
// src/contexts/AuthContext.jsx
//import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import {io} from "socket.io-client";
//import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(
     null
  )

   useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
