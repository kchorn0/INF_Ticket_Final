import React from 'react';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation bar that appears at the top of the page */}
      <Navbar />
      
      {/* Main content area where the children routes will be rendered */}
      <main className="flex-grow">
        <Outlet /> {/* Renders the current route's component */}
      </main>

      {/* Footer that appears at the bottom of the page */}
      <footer className="bg-black text-yellow-400 py-4 mt-8 text-center">
        <div className="text-center">
          {/* Copyright information */}
          <p className="text-sm">
            Ticket Master Event Booking &copy; {new Date().getFullYear()}.
          </p>
          
          {/* Disclaimer about personal information */}
          <p className="text-xs mt-2">
            *Please do not put your personal information into this website as it is just for project purposes.*
          </p>

          {/* Information about the course project */}
          <p className="text-xs mt-2">
            INF655_VA_S2025 Front End Web Dev built with React, Firebase, and TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Outlet } from 'react-router-dom'; // Import Outlet component from React Router

export default App; // Export the App component
