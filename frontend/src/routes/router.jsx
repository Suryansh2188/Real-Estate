import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import ProfilePage from "../pages/ProfilePage";
import AddNewPost from "../pages/AddNewPost";
import ProfileEdit from "../pages/ProfileEdit";
import Listings from "../pages/Listings";
import ProtectedRoute from "../routes/Protected";
import PropertyDetails from "../pages/PropertyDetails"
import EditPostForm from "../components/realEstate/EditPostForm";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <Auth />,
  },
  {
    path: "/auth/sign-up",
    element: <Auth />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute />, // Directly use ProtectedRoute
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
      {
        path: "edit",
        element: <ProfileEdit />,
      },
      {
        path: "add-post",
        element: <AddNewPost />,
      },
      {
        path:"edit-post/:id",
        element:<EditPostForm />
      }
    ],
  },
  {
    path: "/post",
    element: <Listings />
  },
  {
    path: "/post/:id",
    element: <PropertyDetails />
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
