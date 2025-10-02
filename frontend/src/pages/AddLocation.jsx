// src/pages/AddLocation.jsx
import { useState } from "react";
import axios from "axios";

export default function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation`,
        { locationName },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message);
      setLocationName("");
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
          <input
            type="text"
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Location"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
