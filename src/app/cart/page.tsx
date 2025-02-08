"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const ShoppingCart: React.FC = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "Card", // Default payment method
  });
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const placeOrder = async () => {
    if (!billingDetails.name || !billingDetails.email || !billingDetails.address) {
      return Swal.fire("Error", "Please fill in all billing details.", "error");
    }

    setLoading(true);
    const orderId = uuidv4();

    const orderData = {
      _type: "order",
      orderId,
      user: billingDetails,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://bf15x4y8.api.sanity.io/v2025-01-15/data/production",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer skfvmWgcxxRqqEggZKerzxgTH8KZ7uKDwMWwhSohuN4A32qWBHgu9mzQtsncqPBppV3oMQ9yNuyrdZdhtf5ADGNUtVXzzS6yx5syh3CaKVo4tkVsekj1jeVQPwkPZBzFAP5yz6DvXwJafyFAZoIj9SvwbBUptwGOm3OkPeg8SS7PwaQMbJNR",
          },
          body: JSON.stringify({ mutations: [{ create: orderData }] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      Swal.fire("Success", "Your order has been placed!", "success");
      clearCart();
    } catch (error) {
      Swal.fire("Error", "Failed to place order. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex items-center">
                    <Image src={item.image || "/fallback.jpg"} alt={item.name} width={50} height={50} />
                    {item.name}
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    {item.quantity}
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Billing Section */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Billing Information</h2>
            <input type="text" name="name" placeholder="Full Name" className="w-full border p-2 mt-2" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" className="w-full border p-2 mt-2" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" className="w-full border p-2 mt-2" onChange={handleChange} />
            <select name="paymentMethod" className="w-full border p-2 mt-2" onChange={handleChange}>
              <option value="Card">Credit/Debit Card</option>
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>

          {/* Order Summary & Place Order Button */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
            <button
              onClick={placeOrder}
              className="w-full bg-blue-600 text-white py-3 mt-4 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ShoppingCart;
