import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLocation from "./pages/AddLocation";
import AddPlace from "./pages/AddPlace";
import ProtectedRoute from "./components/ProtectedRoute";
import ToPlaces from "./pages/ToPlace";

function App() {
  return (
    <Router>
      {/* Navbar will always show */}
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages */}
        <Route
          path="/add-location"
          element={
            <ProtectedRoute>
              <AddLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-place"
          element={
            <ProtectedRoute>
              <AddPlace />
            </ProtectedRoute>
          }
        />
        <Route path="/location/:locationSlug" element={<ToPlaces />} />
      </Routes>
      
    </Router>
  );
}

export default App;
