import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// SignupPage handles user registration and account creation
const SignupPage = () => {
  // State variables to store form input and status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Destructure signup function from AuthContext for handling user registration
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Handle form submission and user registration logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    // Form validation checks
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true); // Set loading state while processing
      await signup(email, password); // Call signup function from context
      navigate('/'); // Redirect to homepage after successful signup
    } catch (err) {
      console.error(err);
      // Handle specific errors like email already in use
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    } finally {
      setIsLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif text-black-700">Create Account</h1>
          <p className="mt-2 text-white">Sign up to book tickets </p>
        </div>

        {/* Display error message if any */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form for user registration */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Enter your password"
              />
            </div>
            <p className="mt-1 text-xs text-white">Password must be at least 6 characters</p>
          </div>

          {/* Confirm Password input field */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-black" />
              </div>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'
              }`}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              ) : (
                <UserPlus className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Link to login page for existing users */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-yellow-400 hover:text-yellow-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
