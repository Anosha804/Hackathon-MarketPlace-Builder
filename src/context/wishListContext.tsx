"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stockLevel: number;
  category: string;
  discountPercentage: number;
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void; // ✅ Added clearWishlist
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => [...prev, product]);
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
    toast.error("Product removed from wishlist.");
  };

  const clearWishlist = () => {
    setWishlist([]); // ✅ Clear wishlist functionality
    toast.error("Wishlist cleared.");
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
