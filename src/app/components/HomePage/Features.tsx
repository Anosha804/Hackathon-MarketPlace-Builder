"use client";
import Image from "next/image";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart, FaHeart, FaSearchPlus } from "react-icons/fa";
import { useWishlist } from "@/context/wishListContext";
import { useCart } from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stockLevel: number;
  category: string;
  discountPercentage: number;
}

interface Props {
  data: Product[];
}

function Featured({ data }: Props) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const featuredProducts = data ? data.slice(0, 4) : [];

  // Function to handle adding item to cart
  const handleAddToCart = useCallback(
    (item: Product) => {
      addToCart({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 0
      });

      toast.success(`${item.name} added to cart!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [addToCart]
  );

  return (
    <div className="max-w-[1920px] px-2 sm:mx-10 lg:mx-32 xl:mx-auto my-20">
      <h1 className="text-center text-[32px] sm:text-[36px] lg:text-[42px] font-semibold py-6 leading-tight text-[#1A0B5B]">
        Featured Products
      </h1>

      <div className="grid items-center sm:w-fit w-full px-10 grid-cols-1 gap-16 sm:grid-cols-2 xl:grid-cols-4 mx-auto">
        {featuredProducts.map((item: Product) => {
          const isWishlisted = wishlist.some(
            (product) => product._id === item._id
          );

          return (
            <div
              key={item._id}
              className="relative group w-full sm:w-[270px] flex justify-center items-center flex-col shadow-lg shadow-[#e1dfdf] transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/product/${item._id}`} className="w-full">
                <div className="bg-[#F6F7FB] w-full sm:w-[270px] h-[236px] flex justify-center items-center mx-auto relative">
                  <div className="absolute top-4 left-3 flex gap-x-4">
                    {/* Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(item);
                      }}
                      aria-label="Add to Cart"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <BsCart2
                        size={20}
                        className="text-[#2F1AC4] cursor-pointer"
                      />
                    </button>

                    <FaSearchPlus
                      size={20}
                      className="text-[#4a8ba0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      isWishlisted
                        ? removeFromWishlist(item._id)
                        : addToWishlist(item);
                    }}
                    aria-label={
                      isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                    }
                    className="absolute top-4 right-3 text-[#5ca3bb] hover:text-[#ff0000] transition-colors duration-300"
                  >
                    {isWishlisted ? (
                      <FaHeart size={20} className="text-red-500" />
                    ) : (
                      <FaRegHeart size={20} />
                    )}
                  </button>

                  <Image
                    src={item.image}
                    width={200}
                    height={200}
                    alt={item.name}
                    className="w-[178px] object-cover"
                  />
                </div>
              </Link>

              <div className="bg-opacity-0 group-hover:bg-[#2F1AC4] w-full text-white transition-colors duration-300">
                <div className="py-4 px-3 text-center">
                  <p className="set_lato py-2 text-[#FB2E86] group-hover:text-white font-bold text-lg">
                    {item.name}
                  </p>

                  <p className="set_lato text-[#2F1AC4] group-hover:text-white py-2 text-lg">
                    ${item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Featured;
