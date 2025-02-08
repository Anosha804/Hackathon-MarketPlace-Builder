"use client";
import { Heart, LucideShoppingCart, Menu, PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { useCart } from "@/context/CartContext"; 
import { useWishlist } from "@/context/wishListContext"; 

export function Header() {
  const { cartItems } = useCart(); 
  const { wishlist } = useWishlist();

  return (
    <header className="font-sans border-b relative">
      {/* Topbar */}
      <div className="bg-violet-600 text-white py-2">
        <div className="container mx-auto flex justify-between items-center text-sm px-6 lg:px-10">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CiMail />
              <p className="hidden sm:block">anoshafatima1995@gmail.com</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <PhoneCall size={16} />
              <p>(1234) 567890</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <select className="bg-blue-600 px-2 py-1 rounded">
              <option>English</option>
              <option>Spanish</option>
              <option>Urdu</option>
            </select>
            <select className="bg-blue-600 px-2 py-1 rounded">
              <option>USD</option>
              <option>EUR</option>
              <option>PKR</option>
            </select>
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-2 hover:bg-pink-600 px-2 py-1 rounded"
            >
              <p>Login</p>
              <User size={16} />
            </Link>
            <Link href="/wishList" className="relative flex items-center gap-2 hover:bg-pink-600 px-2 py-1 rounded">
              <p>Wishlist</p>
              <Heart size={30} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-red-500 text-xs rounded-full px-2">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <div className="flex gap-x-2 items-center relative">
              <Link href={"/cart"}>
                <LucideShoppingCart size={30} />
                <p className="absolute -top-2 -right-2 rounded-md text-white">
                  <span className="rounded-full py-[3px] px-2 bg-pink-700">
                    {cartItems.length} {/* ✅ Updated cart count */}
                  </span>
                </p>
              </Link>
            </div>

            <HiOutlineUser className="block sm:hidden" />
            <AiOutlineHeart className="block sm:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
