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
    <nav className={`sticky top-0 z-50 ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              className={`text-xl font-bold tracking-tight hover:text-blue-600 ${darkMode ? "text-white" : "text-gray-900"}`}
              to="/"
            >
              SharedRoutes
            </Link>

            <button
              className="hidden sm:inline-flex text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => handleProtected("/add-location")}
            >
              Add Location
            </button>
            <button
              className="hidden sm:inline-flex text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => handleProtected("/add-place")}
            >
              Add Place
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md mr-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            {!isLoggedIn ? (
              <>
                <Link
                  className="px-3 py-2 rounded-md text-gray-800 hover:text-blue-600 transition-colors"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
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

