// src/pages/AddLocation.jsx
import { useState } from "react";
import axios from "axios";

export default function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation`,
        { locationName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setLocationName("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding location");
    }
  };

  return (
    <div className="container">
      <h2>Add New Location</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
        />
        <button type="submit">Add Location</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
