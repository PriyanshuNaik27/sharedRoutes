// src/pages/AddLocation.jsx
import { useState } from "react";
import axios from "axios";

export default function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage(''); // Clear any previous messages
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('locationName', locationName);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setMessage(res.data.message);
      setLocationName("");
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Location</h2>
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md flex flex-col gap-4">
          {/* Location Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <input
              type="text"
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Image (Optional)
            </label>
            
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" 
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Location"}
          </button>
        </form>
        
        {/* Message Display */}
        {message && (
          <p className={`mt-4 text-center ${
            message.includes('successfully') || message.includes('created') 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
