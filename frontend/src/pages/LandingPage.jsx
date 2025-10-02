import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [recentLocations, setRecentLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/fromLocation/recentLocation`
        );
        setRecentLocations(res.data.data || []);
      } catch (err) {
        console.error("Error fetching recent locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentLocations();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    // normalize input: lowercase + remove spaces
    const normalized = search.toLowerCase().replace(/\s+/g, '');
    console.log("Navigating to:", `/location/${normalized}`);
    navigate(`/location/${normalized}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Discover Travel Spots</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Recent Locations Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Recent Locations</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading recent locations...</div>
          </div>
        ) : recentLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentLocations.slice(0, 6).map((location) => (
              <Link
                key={location._id}
                to={`/location/${location.locationSlug}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border hover:border-blue-300"
              >
                <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                  {location.locationName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Added {new Date(location.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No recent locations found.</p>
            <p className="text-sm mt-2">Be the first to add a location!</p>
          </div>
        )}
      </div>
    </div>
  );
}
