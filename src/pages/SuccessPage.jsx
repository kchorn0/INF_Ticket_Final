import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCopy } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// SuccessPage component displays a success message after a booking is made
const SuccessPage = () => {
  // States for managing booking data and UI
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // States for managing booking confirmation
  const [bookingSaved, setBookingSaved] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [copied, setCopied] = useState(false);

  // Reference to ensure booking is attempted only once
  const bookingAttempted = useRef(false);

  useEffect(() => {
    // If cart is empty or user is not logged in, navigate to the home page
    if ((cartItems.length === 0 || !currentUser) && !bookingSaved) {
      navigate('/');
      return;
    }

    // If the booking hasn't been attempted yet and there are cart items and a user, attempt the booking
    if (!bookingAttempted.current && cartItems.length > 0 && currentUser) {
      bookingAttempted.current = true;

      // Function to save booking data to Firestore
      const saveBooking = async () => {
        try {
          // Create booking data object
          const bookingData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            items: cartItems,
            totalAmount: totalPrice,
            date: serverTimestamp(),
          };

          // Save booking to Firestore
          const docRef = await addDoc(collection(db, 'bookings'), bookingData);

          // Set confirmation ID and clear the cart
          setConfirmationId(docRef.id);
          clearCart();
          setBookingSaved(true);
        } catch (error) {
          // Handle any errors during booking process
          console.error('Error saving booking:', error);
        }
      };

      // Call saveBooking to save the booking data
      saveBooking();
    }
  }, [cartItems, totalPrice, clearCart, currentUser, navigate, bookingSaved]);

  // Handle copying the confirmation ID to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(confirmationId);  // Copy the ID to clipboard
    setCopied(true);  // Set copied state to true
    setTimeout(() => setCopied(false), 2000);  // Reset copied state after 2 seconds
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        
        {/* Heading and message to the user */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-blue-700 mb-4">
          Thank you!
        </p>

        {/* Display confirmation ID if available */}
        {confirmationId && (
          <div className="mb-6">
            <p className="text-blue-700 text-lg">
              Here is your confirmation code:
              <span className="font-mono text-sky-700 ml-2 underline">
                {confirmationId.slice(0, 10)}  {/* Display first 10 characters of confirmation ID */}
              </span>
            </p>

            {/* Button to copy the confirmation ID */}
            <button
              onClick={handleCopy}
              className="mt-2 inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md shadow transition"
            >
              <ClipboardCopy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}  {/* Change text when confirmation ID is copied */}
            </button>
          </div>
        )}
      </div>

      {/* Note about not sharing the confirmation code */}
      <div className="mt-8 text-center text-gray-500">
        <p>Please do not share your confirmation code with anyone.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
