import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx'; // Import the LogoutButton component

const Home = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the user role from localStorage when the component mounts
    const role = localStorage.getItem('userRole');
    setUserRole(role); // Set user role to state
  }, []);

  const handleDashboard = () => {
    if (!userRole) {
      // If no role is found, redirect to the signup page
      navigate('/signup');
    } else if (userRole === 'owner') {
      navigate('/owner-dashboard');
    } else if (userRole === 'passenger') {
      navigate('/passenger-dashboard');
    } else {
      navigate('/signup'); // Default fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      {/* Logout Button positioned at the top-right */}
      <LogoutButton />

      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Welcome to Carpooling</h1>
        {/* <p className="text-gray-500 mb-6">Find your next carpool or create a travel plan</p> */}

        {/* Conditional Content Based on User Role */}
        {userRole === 'passenger' && (
          <div className="mb-6 mt-3">
            <h2 className="text-xl text-gray-700 mb-2">Welcome, Passenger!</h2>
            <p className="text-gray-500">As a passenger, you can find carpooling options to your destination.</p>
            <button
              onClick={handleDashboard}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Start Carpooling"
            >
              Start Carpooling
            </button>
          </div>
        )}

        {userRole === 'owner' && (
          <div className="mb-6 mt-3">
            <h2 className="text-xl text-gray-700 mb-2">Welcome, Owner!</h2>
            <p className="text-gray-500 mb-3">As an owner, you can offer carpooling rides and manage your travel plans.</p>
            <button
              onClick={handleDashboard}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Manage Rides"
            >
              Manage My Rides
            </button>
          </div>
        )}

        {userRole === null && (
          <div className="mb-6">
            <p className="text-gray-500">You need to sign up to use the platform.</p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


