import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        
        {/* Error Icon (Optional, adds a nice touch) */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Login Failed
        </h1>
        
        <p className="text-gray-600 mb-6">
          Oops! We couldn't sign you in with Google. You might have cancelled the process or there was a connection error.
        </p>
        
        <button 
          onClick={() => navigate('/login')} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default LoginFailed;