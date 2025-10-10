
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      onLogout?.();
      navigate("/login");
    }
  };

  const handleProtected = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={`sticky top-0 z-50 shadow-sm ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className={`text-xl font-bold tracking-tight hover:text-blue-600 ${darkMode ? 'text-white' : 'text-gray-900'}`} to="/">
              TravelApp
            </Link>

            <button
              className={`hidden sm:inline-flex transition-colors ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => handleProtected("/add-location")}
            >
              Add Location
            </button>
            <button
              className={`hidden sm:inline-flex transition-colors ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => handleProtected("/add-place")}
            >
              Add Place
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`px-2 py-1 rounded transition-colors border ${darkMode ? 'bg-gray-800 text-yellow-300 border-gray-700 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'}`}
              title="Toggle dark mode"
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
            {!isLoggedIn ? (
              <>
                <Link
                  className={`px-3 py-2 rounded-md transition-colors ${darkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md transition-colors ${darkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className={`px-4 py-2 rounded-md transition-colors ${darkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-500 text-white hover:bg-red-600'}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

