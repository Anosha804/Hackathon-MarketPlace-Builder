"use client";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast"; 

export interface ProductsCart {
  _id: string;
  name: string;
  image: string;
  currency: string;
  discountPercentage: number;
  stockLevel: number; 
}

function AddtoBag({
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
    name: name,
    price: discountPercentage,
    currency: currency,
    image: image,
    id: _id,
  };

  const handleAddToCart = async () => {
    try {
      const payload = {
        productId: _id, // Ensure productId is included
        quantity: 1, // Hardcoded quantity for adding 1 item
      };

      const response = await fetch("/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentStock((prev) => prev - 1); 
        addItem(products); // Add to cart
        toast.success(`${name} added to cart!`); 
        console.log("Stock updated:", result.updatedStockLevel);
        console.log(currentStock);
        
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to add to cart!"); // Error toast
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!"); // Error toast
    }
  };

  return (
    <Button
      className="bg-purple-700 text-white font-bold rounded-[9px] text-[15px]
       hover:bg-pink-600 hover:scale-105 transition-all duration-300 ease-linear"
      onClick={handleAddToCart} 
    >
      Add to Cart
    </Button>
  );
}

export default AddtoBag;
