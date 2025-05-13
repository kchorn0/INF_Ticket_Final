import React, { useState, useEffect } from 'react';
import { ShieldUser, Tag, TriangleAlert, UserPen, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import BookingHistoryItem from '../components/BookingHistoryItem';

// ProfilePage component to manage user's profile and booking history
const ProfilePage = () => {
  // Auth context to manage current user and logout
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State to manage bookings data and loading status
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage editing of user display name
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [nameUpdateMessage, setNameUpdateMessage] = useState(null);

  // State for greeting language (multi-language support)
  const [greeting, setGreeting] = useState("Hello");

  // Function to change greeting language
  const changeGreeting = () => {
    setGreeting((prev) =>
      prev === "Hello" ? "Bienvenido" : prev === "Bienvenido" ? "欢迎" : "Hello"
    );
  };

  // useEffect hook to fetch bookings when the component is mounted or user changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!currentUser) return;

        // Set loading to true before fetching data
        setIsLoading(true);
        const bookingsRef = collection(db, 'bookings');
        let q;

        try {
          // Fetch bookings for the current user, ordered by date
          q = query(
            bookingsRef,
            where('userId', '==', currentUser.uid),
            orderBy('date', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const bookingsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBookings(bookingsList); // Set bookings state with fetched data
        } catch (firestoreError) {
          // If there is an error with the query (e.g., missing index), try a different query
          if (
            firestoreError.code === 'failed-precondition' ||
            firestoreError.message?.includes('index')
          ) {
            q = query(bookingsRef, where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const bookingsList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setBookings(bookingsList); // Set bookings state with fetched data
          } else {
            throw firestoreError; // Rethrow any other errors
          }
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load booking history'); // Set error message if fetching fails
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBookings(); // Call fetchBookings function on mount or when currentUser changes
  }, [currentUser]);

  // Logout function to sign out the current user
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logging out
    } catch (error) {
      console.error('Failed to log out', error); // Log error if logout fails
    }
  };

  // Function to save updated display name to Firebase
  const handleSaveName = async () => {
    try {
      if (currentUser && displayName.trim() !== '') {
        await updateProfile(currentUser, { displayName }); // Update display name in Firebase
        setEditingName(false); // Stop editing mode after saving
        setNameUpdateMessage('Name updated successfully.'); // Show success message
        setTimeout(() => setNameUpdateMessage(null), 3000); // Hide success message after 3 seconds
      }
    } catch (err) {
      console.error('Failed to update name:', err);
      setNameUpdateMessage('Failed to update name.'); // Show error message if update fails
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Header Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 flex flex-col items-center text-center space-y-4">
        <div className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
          {/* Display personalized greeting based on user's display name */}
          {currentUser?.displayName ? (
            <p>{greeting}, {currentUser.displayName}!</p>
          ) : (
            <p>{greeting}, Guest!</p>
          )}
        </div>

        {/* Button to change greeting language */}
        <div className="space-y-2">
          <button
            onClick={changeGreeting}
            className="mt-4 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md"
          >
            Change Language
          </button>
        </div>

        {/* Description text */}
        <p className="text-gray-700 text-lg">
          Browse our tickets to reserve your spot at events!
        </p>

        {/* Link to browse more events */}
        <Link
          to="/"
          className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition-colors"
        >
          Browse More Events
        </Link>
      </div>

      {/* Profile Card Section */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 flex flex-col items-center text-center">
            {/* Profile icon */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white mb-4">
              <ShieldUser className="h-16 w-16" />
            </div>
            {/* Display name editing or viewing */}
            <div className="w-full max-w-xs space-y-2">
              {editingName ? (
                // Input for editing display name
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)} // Update display name on change
                    className="border px-2 py-1 rounded-md text-sm w-32"
                  />
                  <button
                    onClick={handleSaveName} // Save updated name
                    className="text-green-600 hover:text-green-800"
                    title="Save"
                  >
                    <Save className="h-8 w-8" />
                  </button>
                </div>
              ) : (
                // Display name with edit button
                <div className="flex items-center justify-center space-x-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentUser?.displayName || currentUser?.email.split('@')[0]}
                  </h2>
                  <button
                    onClick={() => setEditingName(true)} // Enable name editing
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit"
                  >
                    <UserPen className="h-8 w-8" />
                  </button>
                </div>
              )}
              {/* Show name update message if any */}
              {nameUpdateMessage && (
                <p className="text-xs mt-1 text-blue-600">{nameUpdateMessage}</p>
              )}

              {/* Display user's email and display name */}
              <div className="mt-4 text-left space-y-1">
                <p><span className="font-medium text-gray-700">Display name:</span> {currentUser?.displayName || 'Not set'}</p>
                <p><span className="font-medium text-gray-700">User email:</span> {currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-5 order-last lg:order-first">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Section title */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center">
              <Tag className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Past Booking History</h2>
            </div>
            {/* Booking history content */}
            <div className="px-6 py-5">
              {isLoading ? (
                // Loading spinner while fetching bookings
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                // Error message if fetching bookings fails
                <div className="bg-red-50 p-4 rounded-md flex items-start">
                  <TriangleAlert className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              ) : bookings.length === 0 ? (
                // Message if no bookings are found
                <div className="text-center py-12">
                  <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-red-600 mb-2">No Past Bookings</h3>
                  <Link 
                    to="/"
                    className="inline-block mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md py-2 px-6 transition-colors"
                  >
                    Browse Available Events
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <BookingHistoryItem key={booking.id} booking={booking} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
