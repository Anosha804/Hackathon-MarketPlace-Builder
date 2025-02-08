"use client"; // Required for context in Next.js App Router

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Define the Cart Context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number; 
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Function to calculate total price
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    
  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity of an item
  const incrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of an item
  const decrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
