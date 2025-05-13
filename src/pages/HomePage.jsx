import React, { useState, useEffect } from "react"; // Import necessary React hooks
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth state listener
import { auth } from "../firebase/config"; // Import Firebase auth configuration
import {
  FileSearch2,
  ArrowDown01,
  ArrowDown10,
  CalendarArrowDown,
  CalendarArrowUp,
  Receipt,
} from "lucide-react"; // Import icon components
import EventCard from "../components/EventCard"; // Import component to display individual events
import events from "../events/data"; // Import mock or static event data
import { Link } from "react-router-dom"; // Import Link for routing

const HomePage = () => {
  // State to hold events after filtering and sorting
  const [filteredEvents, setFilteredEvents] = useState(events);
  // State to hold the user's search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to hold the selected sort type
  const [sortType, setSortType] = useState("");
  // State to hold the authenticated user's name or email
  const [userName, setUserName] = useState(null);
  // State to toggle display of filter dropdown
  const [showFilters, setShowFilters] = useState(false);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If user is logged in, set display name or email
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        // If user is not logged in, clear userName
        setUserName(null);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Update filteredEvents when search term or sort type changes
  useEffect(() => {
    let results = [...events]; // Start with full list

    // Filter events based on search term (title or location)
    if (searchTerm) {
      results = results.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort events by selected criteria
    if (sortType === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortType === "date-asc") {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "date-desc") {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Update the filtered events state
    setFilteredEvents(results);
  }, [searchTerm, sortType]);

  return (
    // Main container for the homepage
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome message section */}
      <div className="mb-8 text-center">
        {/* Greeting user or guest */}
      
        <p className="text-5xl font-serif text-black-700" >
          {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
        </p>


        {/* Prompt guest to login or signup */}
        {!userName && (
          <div className="mt-2">
            <h3 className="font-medium text-red-800">*Account Required*</h3>
            <p className="text-sm text-red-700">
              Please{" "}
              <Link to="/login" className="underline font-semibold text-red-800 hover:text-red-600">
                login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="underline font-semibold text-red-800 hover:text-red-600">
                create an account
              </Link>.
            </p>
          </div>
        )}

        {/* Image below greeting */}
        <div className="mt-6">
          <img
            src="/images/buy_ticket.jpg"
            alt="Buy Tickets"
            className="mx-auto w-full max-w-2xl rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        {/* Search input */}
        <div className="relative w-full max-w-md">
          {/* Icon inside input */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileSearch2 className="h-5 w-5 text-gray-400" />
          </div>
          {/* Input field for search */}
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-black rounded-md leading-5 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Button to toggle filters dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="px-4 py-2 border border-black rounded-md bg-white hover:bg-green-100 transition"
          >
            Filters
          </button>

          {/* Filters dropdown menu */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {/* Map each filter option to a button */}
              {[
                {
                  type: "price-asc",
                  label: "Price Low to High",
                  icon1: <Receipt className="h-4 w-4 mr-2" />,
                  icon2: <ArrowDown01 className="h-4 w-4" />,
                },
                {
                  type: "price-desc",
                  label: "Price High to Low",
                  icon1: <Receipt className="h-4 w-4 mr-2" />,
                  icon2: <ArrowDown10 className="h-4 w-4" />,
                },
                {
                  type: "date-asc",
                  label: "Date Ascending",
                  icon1: <CalendarArrowUp className="h-4 w-4 mr-2" />,
                },
                {
                  type: "date-desc",
                  label: "Date Descending",
                  icon1: <CalendarArrowDown className="h-4 w-4 mr-2" />,
                },
              ].map(({ type, label, icon1, icon2 }) => (
                <button
                  key={type}
                  onClick={() => {
                    setSortType(type); // Set sort type when filter is clicked
                    setShowFilters(false); // Hide dropdown after selection
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-1 hover:bg-blue-100 ${
                    sortType === type ? "bg-blue-600 text-white" : "text-black"
                  }`}
                >
                  {icon1}
                  {icon2}
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Display message if no events match filters */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No events found.</p>
        </div>
      ) : (
        // Show grid of event cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage; // Export component
