import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import { DarkModeProvider } from "./context/DarkModeContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLocation from "./pages/AddLocation";
import AddPlace from "./pages/AddPlace";
import ProtectedRoute from "./components/ProtectedRoute";
import ToPlaces from "./pages/ToPlace";
import PlaceDetails from "./pages/PlaceDetails";
import LoginSuccess from "./components/LoginSuccess";
import LoginFailed from "./components/LoginFailed";

function App() {
  // 1. Manage login state here, in the top-level component.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 2. Check user status when the app first loads.
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkUserStatus();
  }, []);

  // 3. Create a function to handle successful login.
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
  try {
    // Call a backend route to clear the cookie
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {}, {
      withCredentials: true
    });
    setIsLoggedIn(false);
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <DarkModeProvider>
      <Router>
        {/* 4. Pass login state and handlers down to the Navbar */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* 5. Pass the handleLogin function down to the Login component */}
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/register" element={<Register onLoginSuccess={handleLogin} />} />
          <Route path="/location/:locationSlug/:placeSlug" element={<PlaceDetails />} />
          <Route path="/location/:locationSlug" element={<ToPlaces />} />


          {/* google auth */}

    

          {/* 6. Protected pages now use the reliable isLoggedIn state */}
          <Route
            path="/add-location"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-place"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddPlace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
