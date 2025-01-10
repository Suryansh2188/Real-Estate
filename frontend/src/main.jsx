import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { BrowserRouter } from "react-router-dom"; // Keep only BrowserRouter here
import { AuthContextProvider } from "./contexts/AuthContext";
import App from "./App"; // Keep App as usual
import "./index.css";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./contexts/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Only wrap the App with BrowserRouter */}
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
      <ToastContainer />
    </AuthContextProvider>
  </StrictMode>
);
