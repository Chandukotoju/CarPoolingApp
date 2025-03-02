import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., token, role)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    
    // Redirect to the login page
    navigate('/signup');
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      aria-label="Logout"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
