import React from 'react';
import { Calendar, Pin, TicketPercent } from 'lucide-react';

const BookingHistoryItem = ({ booking }) => {
  const { id, date, items, totalAmount } = booking;

  // Format booking date from timestamp
  const bookingDate = new Date(date.seconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-green-50 border border-blue-200 rounded-xl shadow-sm p-4 mb-5 transition hover:shadow-md">
      
      {/* Booking header with ID and date */}
      <div className="flex justify-between items-center bg-sky-100 p-3 rounded-md border border-blue-300 mb-4">
        <div className="text-green-800 font-semibold text-sm">
          Booking ID: <span className="font-mono tracking-wide">{id.slice(0, 8)}</span>
        </div>
        <div className="flex items-center text-sky-700 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="font-medium mr-1">Purchased on:</span>
          <span>{bookingDate}</span>
        </div>
      </div>

      {/* Ticket items summary */}
      <div className="space-y-4">
        <h3 className="text-blue-800 text-md font-bold mb-1">Tickets Summary</h3>

        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start bg-white border border-blue-100 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-start">
              <TicketPercent className="h-5 w-5 text-green-600 mr-2 mt-1" />
              <div>
                <p className="text-green-900 font-semibold">{item.title}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Pin className="h-3 w-3 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium text-blue-700">
                {item.quantity} {item.quantity === 1 ? 'ticket' : 'tickets'}
              </p>
              <p className="text-sm text-gray-600">
                ${ (item.price * item.quantity).toFixed(2) }
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total amount section */}
      <div className="mt-5 flex justify-end items-center border-t border-blue-200 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-green-800 font-semibold text-base">Total:</span>
          <span className="text-sky-700 font-bold text-lg">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
    </div>
  );
};

export default BookingHistoryItem;
