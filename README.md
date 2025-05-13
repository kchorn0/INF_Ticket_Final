# Project Title
*Ticket Booking Website Final Project*

## Author
**Name:** Kyle Horn  
**Course:** Web Development II | FHSU

## Project Overview
Build a full frontend Event Ticket Booking Website using ReactJS, with user authentication and data persistence using Firebase.
The app must allow users to sign up, log in, browse events, view event details, add tickets to a cart, simulate a booking, and view their booking history through the Profile page.

Core Pages and Features
   Page---Requirements
   Home Page--- List all event cards dynamically (title, date, location, price, thumbnail). Fetch from static data.js.
   Event Details Page--- Display detailed event information: description, location map (optional Google Maps iframe), date/time, price per ticket. Include "Add to Cart" button.
   Cart Page--- Display selected events with quantity selectors. Allow users to update or remove tickets. Show total price dynamically.
   Booking Confirmation Page--- After clicking "Checkout," redirect to a thank you page and save the booking to Firebase.
   Login and Signup Pages--- Allow users to register and log in using Firebase Authentication (email/password).
   Profile Page--- Display user information (name, email) and their booking history pulled from Firebase.

Event Data Source
Use a provided data.js file that exports an array of event objects.
Fetch events dynamically inside your components.
Use Firebase Authentication for:
Signup and login with email/password
Logout
Use Firebase Firestore or Realtime Database to:
Save booking history under each user after successful checkout.
Retrieve past bookings for Profile page display.
Persist login session using Firebase Authentication observer.
Required Features
   Feature--- Description

     Event Listing--- Fetch and render events from data.js.

   Sort Events--- Sort events by price (ascending/descending) and by date.

   Search Events--- Implement a search bar to find events by title.

   Add to Cart--- Add selected tickets to the shopping cart.

   Cart Management--- Update ticket quantities or remove items.

   Checkout Flow--- Complete checkout process and store booking data to Firebase.

   Profile Display--- Show user information and booking history from Firebase.

   Responsive Design--- Ensure app works on both mobile and desktop.
   Notes
No backend server is needed beyond Firebase.
Follow React best practices: reusable components, clear props usage, proper state handling.
Ensure code is readable and well-commented.
## Helpful Video / Resource

[In Blackboard..In my video I presented my code and explained it with the rubric]


## Database Keys

Did not push to GitHub
