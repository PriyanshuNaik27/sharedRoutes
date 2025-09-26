// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken"); // check if user is logged in

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login
  }

  return children; // allow access if logged in
}
