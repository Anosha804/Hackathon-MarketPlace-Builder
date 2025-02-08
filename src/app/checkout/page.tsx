"use client";

import { useShipping } from "@/context/ShippingContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { shippingCost } = useShipping();
  const [loading, setLoading] = useState(false);

  // Calculate total amount
  const totalPrice = getTotalPrice(); // Get total cart price
  const finalTotal = (totalPrice || 0) + (shippingCost || 0);

  // Dummy user data (replace with actual user info)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  // Function to send order details to Sanity
  const placeOrder = async () => {
    setLoading(true);
    
    const orderId = uuidv4();
    const orderData = {
      _type: "order",
      orderId,
      user,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: finalTotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    console.log("Sending Order Data:", orderData); // Debugging

    try {
      const response = await fetch(
        `https://bf15x4y8.api.sanity.io/v2025-01-15/data/production`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer "skfvmWgcxxRqqEggZKerzxgTH8KZ7uKDwMWwhSohuN4A32qWBHgu9mzQtsncqPBppV3oMQ9yNuyrdZdhtf5ADGNUtVXzzS6yx5syh3CaKVo4tkVsekj1jeVQPwkPZBzFAP5yz6DvXwJafyFAZoIj9SvwbBUptwGOm3OkPeg8SS7PwaQMbJNR"`,
          },
          body: JSON.stringify({ mutations: [{ create: orderData }] }),
        }
      );

      const data = await response.json();
      console.log("Sanity Response:", data); // Debugging

      if (!response.ok || data.error) {
        throw new Error(data.error?.message || "Failed to place order");
      }

      Swal.fire({
        title: "Order Placed Successfully",
        text: "Your order has been successfully recorded!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        clearCart(); // Clear cart after successful order
        window.location.href = "/order-completed"; // Redirect user
      });
    } catch (error) {
      console.error("Order Error:", error);
      Swal.fire("Error", "Failed to proceed with order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="w-full flex gap-4 mb-4 items-center">
              <Image src={item.image || "/fallback.jpg"} width={70} height={70} alt={item.name} />
              <div className="flex justify-between w-full">
                <div>
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <h5 className="text-tertiary pt-3">Qty: {item.quantity}</h5>
                </div>
                <div className="text-right">
                  <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Shipping Cost */}
        <div className="flex justify-between items-center py-4">
          <h3 className="text-lg font-semibold">Shipping Cost:</h3>
          <span className="text-lg font-bold">${shippingCost.toFixed(2)}</span>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center py-4 border-t">
          <h3 className="text-xl font-semibold">Total:</h3>
          <span className="text-xl font-bold">${finalTotal.toFixed(2)}</span>
        </div>

        {/* Payment Button */}
        <button
          onClick={placeOrder}
          className="w-full bg-blue-600 text-white py-3 mt-4 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
