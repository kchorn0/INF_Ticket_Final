import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context for the shopping cart
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Component that provides the cart context to its children
export const CartProvider = ({ children }) => {
  // State to store the items currently in the cart
  const [cartItems, setCartItems] = useState([]);
  // State to store the total price of the cart
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage and recalculate total when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems]);

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalPrice(total);
  };

  // Add an item to the cart or increase its quantity if it already exists
  const addToCart = (event, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === event.id);
    
    if (existingItemIndex >= 0) {
      // If the item is already in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // If the item is not in the cart, add it as a new item
      setCartItems([...cartItems, { ...event, quantity }]);
    }
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      // If quantity is zero or less, remove the item from the cart
      removeFromCart(id);
      return;
    }

    // Update the item with the new quantity
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });

    setCartItems(updatedCart);
  };

  // Remove an item from the cart by its ID
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Remove all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Value object containing cart data and functions
  const value = {
    cartItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  // Provide the cart context to child components
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
