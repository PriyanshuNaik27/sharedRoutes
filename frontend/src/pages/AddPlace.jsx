// src/pages/AddPlace.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [normalizedName, setNormalizedName] = useState(""); // was locationSlug
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // fetch all locations for dropdown
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation`
        );
        setLocations(res.data.data || []);
      } catch (err) {
        console.error("Error fetching locations");
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation/${normalizedName}/places`,
        { placeName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setPlaceName("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding place");
    }
  };

  return (
    <div className="container">
      <h2>Add New Place</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={normalizedName}
          onChange={(e) => setNormalizedName(e.target.value)}
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc._id} value={loc.normalizedName}>
              {loc.locationName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter place name"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          required
        />
        <button type="submit">Add Place</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
