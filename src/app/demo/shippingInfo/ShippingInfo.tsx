'use client';

import { useShipping } from "@/context/ShippingContext";
import React, { useState } from "react";

const shippingRates: { [key: string]: number } = {
  USA: 10.99,
  Canada: 12.99,
  UK: 15.50,
  Germany: 14.00,
  Australia: 18.75,
  Bangladesh: 5.00,
  India: 7.50,
  Japan: 20.00,
  France: 16.00,
  UAE: 22.00,
};

const ShippingInfo = () => {
  const [customer, setCustomer] = useState({ firstName: "", lastName: "", city: "", postalCode: "" });
  const [country, setCountry] = useState<string>("Canada");
  const { setShippingCost } = useShipping(); // Get the function to update shipping cost

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setShippingCost(shippingRates[selectedCountry]); // Update context
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="mt-9">
        <h1 className="text-[#1D3178] text-[24px] font-extrabold">Hekto Demo</h1>
        <p className="text-[#1D3178] text-[15px] set_lato font-bold mt-4 mb-5">
          Cart/ Information/ Shipping/ Payment
        </p>
      </div>
      <div className="bg-[#F8F8FD] md:p-8 p-2 pb-16">
        <div className="md:mt-28 mt-12">
          <h3 className="md:mb-12 mb-6 text-[18px] font-extrabold text-[#1D3178]">Shipping Address</h3>

          <div className="md:flex justify-between">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={customer.firstName}
              onChange={handleInputChange}
              className="border-b-[2px] focus:border-b-green-700 bg-[#F8F8FD] w-full text-[#272729] outline-none set_lato mb-4 p-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={customer.lastName}
              onChange={handleInputChange}
              className="border-b-[2px] bg-[#F8F8FD] focus:border-b-green-700 w-full text-[#252627] outline-none set_lato mb-4 p-2 md:ml-4"
            />
          </div>

          <div className="md:mt-6">
            <label className="block text-[#1D3178] font-semibold mb-2">Select Country</label>
            <select
              value={country}
              onChange={handleCountryChange}
              className="w-full border-b-[2px] focus:border-b-green-700 bg-[#F8F8FD] text-[#141414] outline-none set_lato mb-4 p-2"
            >
              {Object.keys(shippingRates).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="md:flex justify-between">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleInputChange}
              className="border-b-[2px] focus:border-b-green-700 bg-[#F8F8FD] w-full text-[#141414] outline-none set_lato mb-4 p-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={customer.postalCode}
              onChange={handleInputChange}
              className="border-b-[2px] focus:border-b-green-700 bg-[#F8F8FD] w-full text-[#141414] outline-none set_lato mb-4 p-2 md:ml-4"
            />
          </div>

          <div className="mt-4 text-lg font-semibold text-[#1D3178]">
            Shipping Cost: <span className="text-[#FB2E86]">${shippingRates[country].toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
