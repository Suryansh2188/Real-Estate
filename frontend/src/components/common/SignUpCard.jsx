import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { Button2 } from "./Button2";
import { Input2 } from "./Input2";
import { FcGoogle } from "react-icons/fc";

export default function SignUpCard() {
  const { setAuthModeDirectly } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler
  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Retrieve form data
    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Make the API request
      const response = await axios.post("http://localhost:5000/auth/sign-up", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        // Navigate to sign-in mode on successful sign-up
        setAuthModeDirectly("sign-in");
        toast.success("Sign-Up Successful! Please log in.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      // Display error message if the request fails
      if (err.response?.data?.message) {
        toast.error(err.response.data.message); // Use server-provided error message
      } else {
        toast.error("Unable to Sign Up. Please try again.");
      }
      // console.error(err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-6 w-96">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-4">Create an account</h2>

      {/* Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </label>
          <Input2
            type="text"
            id="firstName"
            name="firstName" // Added name for FormData compatibility
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </label>
          <Input2
            type="text"
            id="lastName"
            name="lastName" // Added name for FormData compatibility
            placeholder="Last Name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input2
            type="email"
            id="email"
            name="email" // Added name for FormData compatibility
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input2
            type="password"
            id="password"
            name="password" // Added name for FormData compatibility
            placeholder="Create password"
            required
          />
        </div>

        {/* Submit Button */}
        <Button2 type="submit" variant="primary" isLoading={isLoading}>
          Sign Up
        </Button2>
      </form>

      {/* Divider */}
      <p className="flex items-center justify-center text-center m-2">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-4 text-gray-600">or</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </p>

      {/* Google Sign-Up Button */}
      <button className="flex w-full items-center justify-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
        <FcGoogle className="text-xl mr-2" />
        Sign Up with Google
      </button>
    </div>
  );
}
