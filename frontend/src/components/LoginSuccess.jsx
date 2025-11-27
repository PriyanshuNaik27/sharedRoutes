// components/LoginSuccess.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Create a new URLSearchParams object from the URL's search string
    const params = new URLSearchParams(location.search);
    
    // Get the 'token' parameter
    const token = params.get('token');

    if (token) {
      // Save the token to localStorage
      localStorage.setItem('authToken', token);
      
      // Redirect to the dashboard or home page
      navigate('/');
    } else {
      // Handle the case where there is no token (e.g., show an error)
      navigate('/login-failed');
    }
  }, [location, navigate]); // Dependencies

  return (
    <div>
      <p>Loading, please wait...</p>
    </div>
  );
}

export default LoginSuccess;