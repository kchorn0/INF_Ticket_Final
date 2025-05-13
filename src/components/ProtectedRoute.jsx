import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// A route wrapper that only allows access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show a loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Redirect to login if the user is not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, show the protected content
  return children;
};

export default ProtectedRoute;
