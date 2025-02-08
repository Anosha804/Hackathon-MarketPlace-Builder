'use client';

import { createContext, useContext, useState } from "react";

interface ShippingContextType {
  shippingCost: number;
  setShippingCost: (cost: number) => void;
}

const ShippingContext = createContext<ShippingContextType | undefined>(undefined);

export const ShippingProvider = ({ children }: { children: React.ReactNode }) => {
  const [shippingCost, setShippingCost] = useState<number>(5.00); // Default value

  return (
    <ShippingContext.Provider value={{ shippingCost, setShippingCost }}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within a ShippingProvider");
  }
  return context;
};
