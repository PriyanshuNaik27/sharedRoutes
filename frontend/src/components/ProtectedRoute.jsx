import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This component checks if a user is logged in.
// If they are, it renders the child component (the protected page).
// If not, it redirects them to the login page.
const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back there after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
