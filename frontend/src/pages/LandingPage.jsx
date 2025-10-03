import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../assets/hero.png";

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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100">
      {/* Hero section with navbar overlay: pull up behind the sticky navbar */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="relative h-[22rem] md:h-[28rem] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white font-extrabold tracking-tight text-3xl sm:text-4xl md:text-6xl drop-shadow">
                Discover & Review
                <br className="hidden sm:block" />
                Hidden Gems Near You
              </h1>

              <form onSubmit={handleSearch} className="mt-6 w-full max-w-2xl">
                <div className="flex items-stretch bg-white/95 backdrop-blur rounded-full shadow-lg ring-1 ring-black/5">
                  <input
                    type="text"
                    placeholder="Enter a location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-l-full focus:outline-none text-gray-800"
                  />
                  <button
                    type="submit"
                    className="px-5 md:px-6 rounded-r-full bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.018 12.25l3.741 3.741a.75.75 0 1 0 1.06-1.06l-3.741-3.742A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </form>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => navigate("/add-location")}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow"
                >
                  Add Locations
                </button>
                <button
                  onClick={() => navigate("/add-place")}
                  className="px-5 py-2 rounded-full bg-white/90 text-gray-900 hover:bg-white shadow"
                >
                  Add a Place
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Locations Section */}
      <div className="w-full max-w-6xl px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Featured Locations</h2>
        
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading recent locations...</div>
            </div>
          ) : recentLocations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLocations.slice(0, 6).map((location) => (
                <Link
                  key={location._id}
                  to={`/location/${location.locationSlug}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow border border-transparent hover:border-blue-200"
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
    </div>
  );
}
