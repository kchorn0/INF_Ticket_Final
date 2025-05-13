import React, { createContext, useContext, useState, useEffect } from 'react';
// Import Firebase authentication functions
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
// Import Firebase auth instance
import { auth } from '../firebase/config';

// Create a new context for authentication
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Component that provides authentication context to children
export const AuthProvider = ({ children }) => {
  // State to store the current logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  // State to track whether authentication check is still loading
  const [loading, setLoading] = useState(true);

  // Function to sign up a new user with email and password
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Effect to listen for authentication state changes when component mounts
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);   // Update the user state
      setLoading(false);      // Set loading to false when auth check is complete
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  // Value object containing the auth state and functions
  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  // Render the children only when not loading and provide context value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
