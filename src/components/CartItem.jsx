import React from 'react';
import { SquareMinus, SquarePlus, Calendar, Clock, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, price, quantity, thumbnail, date, location } = item;

  // Handle increasing item quantity
  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  // Handle decreasing item quantity or removing item if quantity is 1
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  // Format event date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Static event time (could be dynamic if needed)
  const formattedTime = '7:00 PM – 10:00 PM';

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 border border-sky-200 bg-blue-50 p-4 rounded-xl shadow-md transition hover:shadow-lg mb-4">
      
      {/* Event image thumbnail */}
      <div className="w-full md:w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg border border-sky-300">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content section: event details and actions */}
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
          
          {/* Event info and meta details */}
          <div>
            <h3 className="text-xl font-semibold text-green-800">{title}</h3>
            <div className="mt-1 text-gray-600 text-sm flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formattedTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            </div>
            <p className="text-blue-700 font-medium mt-2">${price.toFixed(2)} per ticket</p>
          </div>

          {/* Quantity control buttons */}
          <div className="flex items-center mt-3 sm:mt-0 bg-white border border-green-300 rounded-md overflow-hidden">
            <button
              onClick={handleDecrement}
              className="p-2 bg-green-100 hover:bg-green-200"
              aria-label="Decrease quantity"
            >
              <SquareMinus className="h-4 w-4 text-green-700" />
            </button>
            <span className="px-4 font-semibold text-green-800">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-2 bg-green-100 hover:bg-green-200"
              aria-label="Increase quantity"
            >
              <SquarePlus className="h-4 w-4 text-green-700" />
            </button>
          </div>
        </div>

        {/* Total price and remove button */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-sky-700">
            Total: ${(price * quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(id)}
            className="flex items-center text-red-600 hover:text-red-800"
            aria-label="Remove from cart"
          >
            <span className="text-sm font-medium">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
