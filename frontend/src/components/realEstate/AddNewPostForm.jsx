import { useState } from "react";
import axios from "axios";
import { Input2 } from "../common/Input2";
import { Textarea } from "../common/Textarea";
import { Button2 } from "../common/Button2";
import { toast } from "react-toastify";

export default function AddNewPostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user_id: "", // Replace with actual user ID
    property_type: "apartment", // Default selection
    type: "sale", // Default selection
    price: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
    features: {
      bedrooms: "",
      bathrooms: "",
      square_feet: "",
      year_built: "",
      parking_spaces: "",
      has_garage: false,
      has_pool: false,
    },
    photos: [],
    status: "available",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedInputChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: { ...formData[parentKey], [name]: value },
    });
  };

  const handleFeatureChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, photos: [...formData.photos, ...imageUrls] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/post/add-post",
        formData,
        { withCredentials: true }
      );
      toast.success("Post added successfully!");
      console.log("Post created successfully:", response.data);
    } catch (error) {
      toast.error("Error adding post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <Input2
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label htmlFor="property_type" className="font-semibold">
          Property Type
        </label>
        <select
          id="property_type"
          name="property_type"
          value={formData.property_type}
          onChange={handleInputChange}
          required
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="penthouse">Penthouse</option>
        </select>
      </div>

      {/* Type (Sale or Rent) */}
      <div className="space-y-2">
        <label htmlFor="type" className="font-semibold">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label htmlFor="price" className="font-semibold">
          Price
        </label>
        <Input2
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Location */}
      <fieldset className="border p-4 space-y-2">
        <legend className="font-semibold">Location</legend>
        <Input2
          id="address"
          name="address"
          placeholder="Address"
          value={formData.location.address}
          onChange={(e) => handleNestedInputChange(e, "location")}
          required
        />
        <Input2
          id="city"
          name="city"
          placeholder="City"
          value={formData.location.city}
          onChange={(e) => handleNestedInputChange(e, "location")}
          required
        />
        <Input2
          id="state"
          name="state"
          placeholder="State"
          value={formData.location.state}
          onChange={(e) => handleNestedInputChange(e, "location")}
          required
        />
        <Input2
          id="zipcode"
          name="zipcode"
          placeholder="Zip Code"
          value={formData.location.zipcode}
          onChange={(e) => handleNestedInputChange(e, "location")}
          required
        />
        {/* <Input2
          id="latitude"
          name="latitude"
          placeholder="Latitude"
          type="number"
          step="0.000001"
          min="-90"
          max="90"
          value={formData.location.coordinates.latitude}
          onChange={(e) => handleNestedInputChange(e, "location.coordinates")}
        />

        <Input2
          id="longitude"
          name="longitude"
          placeholder="Longitude"
          type="number"
          step="0.000001"
          min="-180"
          max="180"
          value={formData.location.coordinates.longitude}
          onChange={(e) => handleNestedInputChange(e, "location.coordinates")}
        /> */}
      </fieldset>

      {/* Features */}
      <fieldset className="border p-4 space-y-2">
        <legend className="font-semibold">Features</legend>
        <Input2
          id="bedrooms"
          name="bedrooms"
          placeholder="Bedrooms"
          type="number"
          value={formData.features.bedrooms}
          onChange={handleFeatureChange}
          required
        />
        <Input2
          id="bathrooms"
          name="bathrooms"
          placeholder="Bathrooms"
          type="number"
          value={formData.features.bathrooms}
          onChange={handleFeatureChange}
          required
        />
        <Input2
          id="square_feet"
          name="square_feet"
          placeholder="Square Feet"
          type="number"
          value={formData.features.square_feet}
          onChange={handleFeatureChange}
        />
        <Input2
          id="year_built"
          name="year_built"
          placeholder="Year Built"
          type="number"
          value={formData.features.year_built}
          onChange={handleFeatureChange}
        />
        <Input2
          id="parking_spaces"
          name="parking_spaces"
          placeholder="Parking Spaces"
          type="number"
          value={formData.features.parking_spaces}
          onChange={handleFeatureChange}
        />
        <label>
          <input
            type="checkbox"
            name="has_garage"
            checked={formData.features.has_garage}
            onChange={handleFeatureChange}
          />{" "}
          Has Garage
        </label>
        <label>
          <input
            type="checkbox"
            name="has_pool"
            checked={formData.features.has_pool}
            onChange={handleFeatureChange}
          />{" "}
          Has Pool
        </label>
      </fieldset>

      {/* Images */}
      <div className="space-y-2">
        <label htmlFor="photos" className="font-semibold">
          Photos
        </label>
        <input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="flex gap-2 mt-2">
          {formData.photos.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index + 1}`}
              className="w-16 h-16 rounded object-cover"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-1/5 ml-auto">
        <Button2 type="submit" isLoading={isLoading}>
          {isLoading ? "Adding..." : "Add Post"}
        </Button2>
      </div>
    </form>
  );
}