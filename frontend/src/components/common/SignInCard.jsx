import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { Button2 } from "./Button2";
import { Input2 } from "./Input2";
import { AuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function SignInCard() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Retrieve form data
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/sign-in",
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/");
        updateUser(response.data);
        toast("Sign In Successfully");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input2
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input2
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button2 type="submit" variant="primary" isLoading={isLoading}>
            Sign In
          </Button2>
        </form>
        <p className="flex items-center justify-center text-center m-2">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="px-4 text-gray-600">or</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </p>
        <button className="flex w-full items-center justify-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
          <FcGoogle className="text-xl mr-2" />
          Sign In with Google
        </button>
      </div>
    </>
  );
}
