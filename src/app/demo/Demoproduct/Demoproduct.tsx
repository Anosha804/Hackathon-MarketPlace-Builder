"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useShipping } from "@/context/ShippingContext";

const DemoProduct = () => {
  const { cartItems, getTotalPrice } = useCart();
  const { shippingCost } = useShipping();

  // Calculate Total with Shipping
  const totalWithShipping = getTotalPrice() + (shippingCost || 0);

  return (
    <div className="md:mt-44 mt-12">
      <div className="lg:w-[400px]">
        {cartItems.map((item, i) => (
          <div key={i}>
            <div className="w-full flex md:gap-4 gap-2 mb-4 items-center">
              <div className="w-[70px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  height={1000}
                  width={1000}
                />
              </div>
              <div className="flex items-center md:justify-between">
                <div>
                  <h4 className="text-[14px] font-semibold">{item.name}</h4>
                  <h5 className="text-tertiary">Quantity: {item.quantity}</h5>
                </div>
                <div className="w-[160px] text-right">
                  <h4>${item.price.toFixed(2)}</h4>
                </div>
              </div>
            </div>
            <div className="border-[1px] mb-4"></div>
          </div>
        ))}
      </div>

      <div className="py-9 px-6 mt-6 mb-12 bg-[#E8E6F1]">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] text-[#1D3178] font-bold">Subtotals:</h3>
          <h4 className="text-[12px] text-[#1D3178] font-bold">
            ${getTotalPrice().toFixed(2)}
          </h4>
        </div>
        <div className="md:w-[350px] border-[1px] mt-2"></div>

        {/* Shipping Cost */}
        <div className="flex items-center justify-between mt-4">
          <h3 className="text-[12px] text-[#1D3178] font-bold">Shipping:</h3>
          <h4 className="text-[12px] text-[#1D3178] font-bold">
            ${shippingCost.toFixed(2)}
          </h4>
        </div>
        <div className="md:w-[350px] border-[1px] mt-2"></div>

        {/* Total */}
        <div className="mt-9">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] text-[#1D3178] font-bold">Total:</h3>
            <h4 className="text-[18px] text-[#1D3178] font-bold">
              ${totalWithShipping.toFixed(2)}
            </h4>
          </div>
          <div className="md:w-[350px] border-[1px] mt-2"></div>
        </div>

        <div className="flex items-center mt-7 gap-1">
          <input className="w-[8px] h-[8px]" type="checkbox" />
          <h6 className="text-[12px] text-[#8A91AB]">
            Shipping & taxes calculated at checkout
          </h6>
        </div>

        <button className="w-full mt-11 h-[40px] rounded-[3px] bg-[#19D16F] text-white">
          <Link href={"/checkout"}>Proceed To Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default DemoProduct;
