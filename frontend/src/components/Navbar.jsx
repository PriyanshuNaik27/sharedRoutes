import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

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
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link className="text-xl font-bold text-gray-800 hover:text-blue-500" to="/">
          TravelApp
        </Link>

        <button
          className="text-gray-700 hover:text-blue-500 cursor-pointer transition"
          onClick={() => handleProtected("/add-location")}
        >
          Add Location
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 cursor-pointer transition"
          onClick={() => handleProtected("/add-place")}
        >
          Add Place
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link className="text-gray-700 hover:text-blue-500 transition" to="/login">
              Login
            </Link>
            <Link className="text-gray-700 hover:text-blue-500 transition" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

