"use client";

import { useWishlist } from "@/context/wishListContext";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/clerk-react"; // Clerk's hook to check user status
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Import Product type from WishlistContext
import { Product } from "@/context/wishListContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart(); // Added cartItems for better UX
  const { isSignedIn } = useUser(); // Clerk hook to check if user is signed in

  const handleAddToCart = (item: Product) => {
    // Check if item already exists in cart
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item._id);

    if (isItemInCart) {
      toast.error(`${item.name} is already in the cart.`);
      return;
    }

    // Add item to cart
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });

    removeFromWishlist(item._id);
    toast.success(`${item.name} added to cart`);
  };

  if (!isSignedIn) {
    return (
      <>
        <section className="bg-[#F6F5FF] py-8 mt-8">
          <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-4 py-1 px-4 md:px-8">
            <h1 className="text-[#101750] text-4xl font-bold text-center md:text-left">
              WishList
            </h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link href="/" className="hover:text-[#FB2E86]">Home</Link>
              <span className="text-gray-400">.</span>
              <p>Pages</p>
              <span className="text-gray-400">.</span>
              <p className="text-[#FB2E86]">Wishlist</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center items-center mt-6 mb-6">
          <div className="text-center">
            <p className="text-lg text-blue-900 underline font-bold mb-4">
              You need to sign in to view your wishlist.
            </p>
            <Link href="/sign-in">
              <button className="bg-blue-600 text-white py-2 px-6 rounded">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="bg-[#F6F5FF] py-8 mt-8">
        <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-4 py-1 px-4 md:px-8">
          <h1 className="text-[#101750] text-4xl font-bold text-center md:text-left">
            WishList
          </h1>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href="/" className="hover:text-[#FB2E86]">Home</Link>
            <span className="text-gray-400">.</span>
            <p>Pages</p>
            <span className="text-gray-400">.</span>
            <p className="text-[#FB2E86]">Wishlist</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-6 font-bold text-center text-gray-800">
        {wishlist.length === 0 ? (
          <p className="text-lg text-gray-600">Your wishlist is empty!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item._id} className="border ring-gray-300 ring-2 p-4 rounded-lg shadow bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-purple-800 text-white font-bold px-4 py-2 rounded"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="inline mr-2" size={16} /> Add to Cart
                  </button>
                  <button
                    className="bg-red-600 font-bold text-white px-4 py-2 rounded"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    <Trash2 className="inline mr-2" size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons for clearing wishlist and going back to home */}
        <div className="flex justify-center gap-4 mt-6">
          {wishlist.length > 0 && (
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          )}
          <Link href="/">
            <button className="px-6 py-2 text-white bg-cyan-600 font-bold rounded">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
