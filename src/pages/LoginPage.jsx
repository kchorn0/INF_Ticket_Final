import React, { useState } from 'react'; // Import necessary hooks and components from React
import { Link, useNavigate } from 'react-router-dom'; // Import routing components from React Router
import { Inbox, KeySquare, MailQuestion } from 'lucide-react'; // Import icons from Lucide React library
import { useAuth } from '../context/AuthContext'; // Import the custom AuthContext for authentication functionality

// LoginPage component handles user login functionality
const LoginPage = () => {
  // State hooks for managing form inputs and loading/error states
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous error message

    // Check if email or password is missing, set an error if true
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true); // Set loading to true during the login process
      await login(email, password); // Call login function from AuthContext with email and password
      navigate('/'); // Redirect to homepage if login is successful
    } catch (err) {
      console.error(err); // Log any errors that occur during login
      setError('Failed to log in. Please enter your credentials.'); // Set error message if login fails
    } finally {
      setIsLoading(false); // Set loading to false after the login attempt is completed
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      {/* Main container with gradient background */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        {/* Card container for login form */}
        <div className="text-center mb-6">
          {/* Header section */}
          <h1 className="text-5xl font-serif text-black-700">Welcome, Again!</h1>
          <p className="mt-2 text-gray-600 text-lg">Please Sign in</p>
        </div>

        {/* Display error message if there is any */}
        {error && (
          <div className="mb-6 p-4 bg-green-100 rounded-md flex items-center">
            <MailQuestion className="h-6 w-6 text-orange-600 mr-3" /> {/* Error icon */}
            <p className="text-sm text-green-700">{error}</p> {/* Error message */}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email input field */}
          <div className="relative">
            <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-2">Email Address</label>
            <div className="relative">
              <Inbox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" /> {/* Email icon */}
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="relative">
            <label htmlFor="password" className="block text-lg font-medium text-gray-800 mb-2">Password</label>
            <div className="relative">
              <KeySquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" /> {/* Password icon */}
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••••"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading} // Disable the button while loading
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 ${ // Style the button
              isLoading
                ? 'bg-gray-500 cursor-not-allowed' // Change style when loading
                : 'bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800' // Style when not loading
            }`}
          >
            {isLoading ? ( // Show loading state if isLoading is true
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in' // Display "Sign in" text when not loading
            )}
          </button>

          {/* Link to the Sign up page if the user doesn't have an account */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Need an account?{' '}
              <Link to="/signup" className="text-green-600 font-medium hover:text-green-700">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; // Export the LoginPage component for use in other parts of the app
