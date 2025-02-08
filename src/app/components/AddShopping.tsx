"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useShoppingCart } from "use-shopping-cart"; 

export interface ProductsCart {
  _id: string;
  name: string;
  image: string;
  currency: string;
  discountPercentage: number;
  stockLevel: number;
}

function AddShopping({
  name,
  image,
  discountPercentage,
  currency,
  _id,
  stockLevel,
}: ProductsCart) {
  const { addItem } = useShoppingCart();
  const [currentStock, setCurrentStock] = useState(stockLevel);

  const products = {
    name,
    price: discountPercentage,
    currency,
    image,
    id: _id,
  };

  const handleAddToCart = async () => {
    if (currentStock <= 0) {
      toast.error("Out of stock!"); // Prevent adding when stock is zero
      return;
    }

    try {
      const payload = {
        productId: _id,
        quantity: 1,
      };

      const response = await fetch("/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentStock((prev) => prev - 1); // Decrement stock
        addItem(products); // Add product to cart
        toast.success(`${name} added to cart!`); // Success notification
        console.log("Stock updated:", result.updatedStockLevel);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update stock!"); // Error toast
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!"); // Error toast
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <button
        className={`bg-pink-700 text-white rounded-[9px] text-[15px] px-4 py-2
          hover:bg-pink-500 hover:scale-105 transition-all duration-300 ease-linear
          ${currentStock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleAddToCart}
        disabled={currentStock <= 0} // Disable button if stock is zero
      >
        {currentStock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default AddShopping;
