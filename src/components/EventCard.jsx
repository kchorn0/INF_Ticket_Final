import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, LocateFixed, Receipt, TicketCheck } from 'lucide-react';

const EventCard = ({ event }) => {
  const { id, title, date, location, price, thumbnail } = event;

  // Format date into a readable format (e.g., January 1, 2025)
  const formatEventDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    // Container for the entire event card
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 border border-gray-200">

      {/* Event image with a price tag overlay */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-green-200 text-green-800 font-semibold px-2 py-1 m-2 rounded">
          <Receipt className="h-4 w-4 inline-block mr-1" />
          {price}
        </div>
      </div>

      {/* Event details section */}
      <div className="p-4 flex flex-col items-center text-center text-gray-800">
        <h3 className="text-base font-semibold mb-2 flex items-center gap-1">
          <TicketCheck className="h-4 w-4 text-green-600" />
          {title}
        </h3>

        {/* Formatted event date */}
        <div className="flex items-center text-sm mb-1 text-gray-600">
          <CalendarRange className="h-4 w-4 mr-2 text-green-600" />
          {formatEventDate(date)}
        </div>

        {/* Event location */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <LocateFixed className="h-4 w-4 mr-2 text-green-600" />
          {location}
        </div>

        {/* Link to detailed event page */}
        <Link
          to={`/event/${id}`}
          className="bg-green-500 text-white font-medium py-1.5 px-4 rounded hover:bg-green-600 transition"
        >
          Find Tickets!
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
