// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleProtected = (path) => {
    if (!token) {
      navigate("/login"); // redirect to login if not logged in
    } else {
      navigate(path); // go to the protected page
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-6">
        <Link className="text-xl font-bold text-gray-800 hover:text-blue-500" to="/">
          TravelApp
        </Link>

        {/* Protected buttons */}
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

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {!token && (
          <>
            <Link
              className="text-gray-700 hover:text-blue-500 transition"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-gray-700 hover:text-blue-500 transition"
              to="/register"
            >
              Register
            </Link>
          </>
        )}

        {token && (
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
