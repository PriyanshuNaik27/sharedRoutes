import { useState, useEffect } from "react";
import axios from "axios";

export default function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocationSlug, setSelectedLocationSlug] = useState("");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation/allLocations`
        );
        setLocations(res.data.data || []);
      } catch (err) {
        console.error("Error fetching locations", err);
        setMessage("Could not load locations.");
      }
    };
    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    const filtered = locations.filter((loc) =>
      loc.locationName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (loc) => {
    setLocationInput(loc.locationName);
    setSelectedLocationSlug(loc.locationSlug);
    setFilteredLocations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!selectedLocationSlug) {
      setMessage("Please select a valid location from the list.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/toPlace/${selectedLocationSlug}/places`,
        { placeName },
        {
          // ❌ The entire headers object and token logic is removed.
          // The browser will now send the httpOnly cookie automatically.
          withCredentials: true,
        }
      );
      setMessage(res.data.message || "Place added successfully!");
      setPlaceName("");
      setLocationInput("");
      setSelectedLocationSlug("");
    } catch (err) {
      console.error(err.response || err);
      if (err.response?.status === 401) {
        setMessage("Your session has expired. Please log in again.");
      } else {
        setMessage(err.response?.data?.message || "Error adding place.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // ... rest of your JSX remains the same
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-gray-100">Add New Place</h2>
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-md flex flex-col gap-5"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Type location to search..."
              value={locationInput}
              onChange={handleLocationChange}
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            />
            {filteredLocations.length > 0 && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-900 border rounded shadow-lg max-h-48 overflow-auto z-10">
                {filteredLocations.map((loc) => (
                  <li
                    key={loc._id}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {loc.locationName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter new place name"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            required
            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            disabled={!selectedLocationSlug}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Place"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-700 dark:text-gray-300 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
