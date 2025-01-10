import  { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function ProfilePicture() {
  const [profileImage, setProfileImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="relative w-24 h-24">
      {/* Profile Image */}
      <img
        src={profileImage || '/profile.png'}
        alt="Agent profile"
        className="w-full h-full rounded-full object-cover border-2 border-gray-300"
      />

      {/* Upload Button */}
      <label
        htmlFor="profileUpload"
        className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg cursor-pointer"
        aria-label="Change profile picture"
      >
        <FaCamera className="h-5 w-5" />
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
