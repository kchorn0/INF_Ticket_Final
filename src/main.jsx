import React from 'react'; // Import React to use JSX syntax and React features
import ReactDOM from 'react-dom/client'; // Import ReactDOM to render the app to the DOM
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import necessary React Router components
import './index.css'; // Import global CSS styles

import App from './App.jsx'; // Import the App component
import HomePage from './pages/HomePage'; // Import HomePage component
import EventDetailsPage from './pages/EventDetailsPage'; // Import EventDetailsPage component
import CartPage from './pages/CartPage'; // Import CartPage component
import SuccessPage from './pages/SuccessPage'; // Import SuccessPage component
import LoginPage from './pages/LoginPage'; // Import LoginPage component
import SignupPage from './pages/SignupPage'; // Import SignupPage component
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component to wrap protected pages

import { AuthProvider } from './context/AuthContext'; // Import AuthProvider context for authentication state
import { CartProvider } from './context/CartContext'; // Import CartProvider context for managing cart state

// Create the browser router and define routes and their respective components
const router = createBrowserRouter(
  [
    {
      path: '/', // Define the root path
      element: <App />, // Main component for the app layout
      children: [
        { path: '', element: <HomePage /> }, // Default route for the home page
        { path: 'event/:eventId', element: <EventDetailsPage /> }, // Route for event details page with dynamic eventId parameter
        { path: 'cart', element: <CartPage /> }, // Route for the cart page
        { path: 'login', element: <LoginPage /> }, // Route for the login page
        { path: 'signup', element: <SignupPage /> }, // Route for the signup page
        {
          path: 'success', // Route for success page after booking
          element: (
            <ProtectedRoute> {/* Wrap SuccessPage component with ProtectedRoute to ensure only authenticated users can access it */}
              <SuccessPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile', // Route for profile page
          element: (
            <ProtectedRoute> {/* Wrap ProfilePage component with ProtectedRoute to ensure only authenticated users can access it */}
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enable transition support for future React Router v7
      v7_relativeSplatPath: true, // Enable relative splat path support for React Router v7
    },
  }
);

// Render the app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Enables additional checks and warnings during development */}
    <AuthProvider> {/* Provide authentication context to the app */}
      <CartProvider> {/* Provide cart context to the app */}
        <RouterProvider router={router} /> {/* Provide the router configuration to the app */}
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
