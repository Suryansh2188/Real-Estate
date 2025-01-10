import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Button2 } from "../common/Button2";

export default function AddPost() {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("", data);
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/post/add-post", data, { withCredentials: true });
      toast.success("Post created successfully!");
      reset();
    } catch (error) {
      toast.error("Error creating post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const photos = watch("photos");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded shadow-md  mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className="block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className=" w-full flex justify-between">

      {/* Property Type */}
      <div className="space-y-2">
        <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">Property Type</label>
        <select
          id="property_type"
          {...register("property_type", { required: "Property type is required" })}
          className="block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a property type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="penthouse">Penthouse</option>
        </select>
        {errors.property_type && <p className="text-sm text-red-600">{errors.property_type.message}</p>}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          {...register("type", { required: "Type is required" })}
          className="block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select type</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        {errors.type && <p className="text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          {...register("price", { required: "Price is required" })}
          className="block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
      </div>
      </div>

      <div className="w-full flex gap-3">

      {/* Location */}
      <fieldset className="border p-4 space-y-4 w-1/2 rounded-md">
        <legend className="text-sm font-medium text-gray-700">Location</legend>
        {["address", "city", "state", "zipcode"].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              id={field}
              type="text"
              {...register(`location.${field}`, { required: `${field} is required` })}
            />
            {errors.location?.[field] && <p className="text-sm text-red-600">{errors.location[field]?.message}</p>}
          </div>
        ))}
      </fieldset>

      {/* Features */}
      <fieldset className="border p-4 space-y-4 w-1/2 rounded-md">
        <legend className="text-sm font-medium text-gray-700">Features</legend>
        {["bedrooms", "bathrooms", "square_feet", "year_built", "parking_spaces"].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field.replace("_", " ")}</label>
            <input
              id={field}
              type="number"
              {...register(`features.${field}`, { required: `${field} is required` })}
              
            />
            {errors.features?.[field] && <p className="text-sm text-red-600">{errors.features[field]?.message}</p>}
          </div>
        ))}
        {["has_garage", "has_pool"].map((field) => (
          <div key={field} className="flex items-center space-x-2">
            <input
              id={field}
              type="checkbox"
              {...register(`features.${field}`)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">{field.replace("_", " ")}</label>
          </div>
        ))}
      </fieldset>
      </div>

      {/* Photos */}
      <div className="space-y-2">
        <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</label>
        <input
          id="photos"
          type="file"
          multiple
          {...register("photos")}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        <div className="mt-2 flex gap-2 flex-wrap">
          {photos && [...photos].map((photo, index) => (
            <div key={index} className="w-16 h-16 overflow-hidden rounded-md">
              <img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
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
