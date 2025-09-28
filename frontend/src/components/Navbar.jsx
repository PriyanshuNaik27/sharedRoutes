import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      setIsChecking(true);
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
          { withCredentials: true }
        );
        setIsLoggedIn(true);
      } catch (error) {
        // 👇 THIS IS THE NEW LINE
        console.error("Error checking user status on frontend:", error.response || error);
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkUserStatus();
  }, [location.pathname]);

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
      setIsLoggedIn(false);
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
      {/* Left side */}
      <div className="flex items-center space-x-6">
        <Link className="text-xl font-bold text-gray-800 hover:text-blue-500" to="/">
          TravelApp
        </Link>

        <button
          className="text-gray-700 hover:text-blue-500 cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleProtected("/add-location")}
          disabled={isChecking}
        >
          Add Location
        </button>
        <button
          className="text-gray-700 hover:text-blue-500 cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleProtected("/add-place")}
          disabled={isChecking}
        >
          Add Place
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {isChecking ? (
          <p className="text-gray-500">Loading...</p>
        ) : !isLoggedIn ? (
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

