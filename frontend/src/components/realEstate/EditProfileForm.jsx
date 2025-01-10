import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Input2 } from '../common/Input2';
import { Textarea } from '../common/Textarea';
import { Button2 } from '../common/Button2';
import ProfilePicture from './ProfilePicture';
import { AuthContext } from '../../contexts/AuthContext';

export default function EditProfileForm() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name, // Handles middle names if present
    email: user.email,
    about:user.about
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    about: formData.about
    // phone: formData.phone,
    // about: formData.about,
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make the API request
      const response = await axios.put(`http://localhost:5000/user/${user._id}`, data, {withCredentials:true});

      if (response.status === 200 || response.status === 201) {
        // Navigate to sign-in mode on successful sign-up
        updateUser(response.data);
        navigate("/profile")
        toast.success("Profile Updated");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      // Display error message if the request fails
      if (err.response?.data?.message) {
        toast.error(err.response.data.message); // Use server-provided error message
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
      // console.error(err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center space-x-4">
        {/* Replace with your Profile Picture component */}
        <ProfilePicture />
        <div>
          <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
          <p className="text-sm text-gray-500">{formData.specialization}</p>
        </div>
      </div>

      {/* First and Last Name */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </label>
          <Input2
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </label>
          <Input2
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input2
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* About Me */}
      <div>
        <label htmlFor="about" className="block text-sm font-medium">
          About
        </label>
        <Textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Write about yourself"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex w-1/3 ml-auto justify-end space-x-4">
        <Button2
          type="button"
          onClick={() => navigate("/profile")}
          variant="secondary"
        >
          Cancel
        </Button2>
        <Button2 type="submit" isLoading={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button2>
      </div>
    </form>
  );
}
