import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBasket, ShieldUser, SquareMenu, LockKeyhole, PanelLeftOpen } from 'lucide-react';

// Renders the main navigation bar at the top of the application
const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Access authentication context
  const { cartItems } = useCart(); // Access cart context
  const navigate = useNavigate(); // Used for page navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu open/closed state

  // Logs out the user and redirects to homepage
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
      alert('You have been logged out successfully!');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo and tagline section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-1xl font-serif text-yellow-400 border-2 border-green-600 px-4 py-2 rounded-md">• TicketMaster •</span>
            </Link>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className="text-1xl font-serif text-yellow-400">
              Reserve with us!
            </p>
          </div>

          {/* Menu for medium and larger screens */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Link to Events page */}
            <Link to="/" className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors">
              Events
            </Link>

            {/* Link to Cart page with item count */}
            <Link to="/cart" className="relative px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors">
              <ShoppingBasket className="h-5 w-5 inline-block mr-1" />
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Show profile and logout if user is logged in, otherwise show login link */}
            {currentUser ? (
              <>
                <Link to="/profile" className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors">
                  <ShieldUser className="h-5 w-5 inline-block mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <LockKeyhole className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Button to toggle mobile menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {isMenuOpen ? <PanelLeftOpen className="h-6 w-6" /> : <SquareMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content when open */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">

            {/* Mobile Events link */}
            <Link 
              to="/" 
              className="block px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>

            {/* Mobile Cart link with item count */}
            <Link 
              to="/cart" 
              className="block px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBasket className="h-5 w-5 inline-block mr-2" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs rounded-full px-2 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile profile and logout links for logged-in users */}
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShieldUser className="h-5 w-5 inline-block mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
