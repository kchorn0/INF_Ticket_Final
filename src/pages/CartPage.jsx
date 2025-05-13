import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, UserLock, CornerDownLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

// Component to display the shopping cart page
const CartPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart(); // Access cart data and actions
  const { currentUser } = useAuth(); // Access user authentication status
  const navigate = useNavigate(); // Navigation hook
  const [isProcessing, setIsProcessing] = useState(false); // Track checkout state

  // Handle the checkout process
  const handleCheckout = () => {
    if (!currentUser) {
      // Redirect to login page if user is not logged in
      navigate('/login');
      return;
    }

    setIsProcessing(true); // Set checkout state
    setTimeout(() => {
      navigate('/success'); // Simulate checkout and redirect to success page
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 bg-teal-50">
      {/* Top section with navigation back to shopping and cart title */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-teal-600 hover:text-teal-800 flex items-center">
          <CornerDownLeft className="h-5 w-5 mr-2" />
          <span className="text-lg font-semibold">Back</span>
        </Link>
        <h1 className="text-2xl font-serif text-black-700">Your Cart</h1>
      </div>

      {/* Render different UI depending on whether the cart is empty */}
      {cartItems.length === 0 ? (
        // Empty cart message
        <div className="bg-white rounded-lg shadow-lg p-10 text-center">
          <div className="flex justify-center mb-6">
            <ShoppingBasket className="h-20 w-20 text-red-500" />
          </div>
          <h2 className="text-5xl font-serif text-black-700">Add Tickets</h2>
        </div>
      ) : (
        // Cart is not empty, show cart details and order summary
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Section displaying cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-300 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* List of individual cart items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section showing order summary and checkout options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg sticky top-6">
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Subtotal row */}
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-teal-700">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Static shipping cost */}
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping (Currently Free)</span>
                  <span className="font-medium text-gray-500">$0.00</span>
                </div>

                {/* Static tax */}
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-medium text-gray-500">$0.00</span>
                </div>

                {/* Final total */}
                <div className="border-t border-gray-300 pt-5 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-semibold text-xl text-teal-800">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Prompt user to log in if not authenticated */}
                {!currentUser && (
                  <div className="flex items-start p-4 bg-red-100 rounded-md">
                    <UserLock className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">*Account Required*</h3>
                      <p className="text-sm text-red-700">
                        Please <Link to="/login" className="underline font-semibold text-red-800 hover:text-red-600">login</Link> or <Link to="/signup" className="underline font-semibold text-red-800 hover:text-red-600">create an account</Link>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Button to proceed to checkout */}
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-md font-semibold text-white transition-all ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
