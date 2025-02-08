"use client";

import { ReactNode } from "react";
import { CartProvider as CustomCartProvider } from "@/context/CartContext"; // Ensure the path is correct

const CartProvider = ({ children }: { children: ReactNode }) => {
  return <CustomCartProvider>{children}</CustomCartProvider>;
};

export default CartProvider;
