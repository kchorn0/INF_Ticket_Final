import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Clock, Ticket, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import events from '../events/data';

const EventDetailsPage = () => {
  const { eventId } = useParams(); // Get event ID from the route parameters
  const navigate = useNavigate(); // For programmatic navigation
  const { addToCart } = useCart(); // Access cart context to add items
  const { currentUser } = useAuth(); // Access authentication context
  const [event, setEvent] = useState(null); // Store the event data
  const [quantity, setQuantity] = useState(1); // Track ticket quantity
  const [isAdding, setIsAdding] = useState(false); // Track add-to-cart animation state

  // Find event by ID when component mounts or eventId changes
  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      setEvent(foundEvent);
      document.title = `${foundEvent.title} - Ticket Master`;
    } else {
      navigate('/'); // Redirect if event not found
    }

    return () => {
      document.title = 'Ticket Master'; // Reset title on unmount
    };
  }, [eventId, navigate]);

  // Show a loading spinner if event data is not yet available
  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Handlers for quantity adjustment
  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(q => q - 1);

  // Simulate add to cart and apply animation effect
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(event, quantity);
      setIsAdding(false);
    }, 600);
  };

  // Format date and time display
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = '7:00 PM – 10:00 PM';

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Event Title and Metadata */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-serif text-black-700">{event.title}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-gray-600">
          <span className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            {formattedTime}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
        </div>
      </div>

      {/* Event Thumbnail Image */}
      <div className="relative overflow-hidden rounded-xl shadow-lg mb-8 h-100">
        <img src={event.thumbnail} alt={event.title} className="object-cover w-full h-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-serif text-black-700">About</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Seating Image */}
          <div className="my-8">
            <img src="/images/seating_img.jpg" alt="Seating" className="w-full h-auto rounded-lg mb-4" />
            <p className="text-gray-600 text-center">Seating is first come, first serve basis.</p>
          </div>

          {/* Location Section with Embedded Map */}
          <div>
            <h2 className="text-2xl font-serif text-black-700">Location</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-800 font-medium">{event.location} Convention Center</p>
                  <p className="text-gray-500">123 Event Street, {event.location}, USA</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-md h-48">
                <iframe
                  title="Event Location Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar for Purchasing Tickets */}
        <div className="space-y-6 sticky top-6">
          <div className="border border-gray-200 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-serif text-black-700">Purchase Tickets</h3>

            {/* Price Section */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price</span>
              <span className="flex items-center text-teal-700 font-bold">
                <DollarSign className="h-4 w-4 mr-1" />
                {event.price.toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center space-x-2">
                <button onClick={handleDecrement} className="p-1 rounded bg-gray-200 hover:bg-gray-300">
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button onClick={handleIncrement} className="p-1 rounded bg-gray-200 hover:bg-gray-300">
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between border-t pt-4 mb-4 text-gray-800 font-semibold">
              <span>Total</span>
              <span className="flex items-center text-teal-700 text-lg">
                <DollarSign className="h-5 w-5 mr-1" />
                {(event.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white ${
                isAdding
                  ? 'bg-green-600'
                  : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700'
              } transition-all`}
            >
              {isAdding ? (
                <>
                  <Ticket className="h-5 w-5 animate-bounce" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Login Notice */}
            {!currentUser && (
              <p className="text-sm text-center mt-3 text-gray-500">
                You must <a href="/login" className="text-teal-600 hover:underline">log in</a> to complete your order.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
