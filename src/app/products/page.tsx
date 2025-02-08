"use client";

import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // Import Cart Context
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sanity = sanityClient({
  projectId: "bf15x4y8",
  dataset: "production",
  apiVersion: "2025-01-15",
  token:"skfvmWgcxxRqqEggZKerzxgTH8KZ7uKDwMWwhSohuN4A32qWBHgu9mzQtsncqPBppV3oMQ9yNuyrdZdhtf5ADGNUtVXzzS6yx5syh3CaKVo4tkVsekj1jeVQPwkPZBzFAP5yz6DvXwJafyFAZoIj9SvwbBUptwGOm3OkPeg8SS7PwaQMbJNR",
  useCdn: false,
});

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  stockLevel: number;
  imageUrl?: string;
  category: string;
  isFeaturedProduct: boolean;
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Use global cart context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product"]{
            _id,
            name,
            price,
            description,
            discountPercentage,
            stockLevel,
            "imageUrl": image.asset->url,
            category,
            isFeaturedProduct
          }`;

        const data = await sanity.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-center my-6 font-extrabold text-4xl text-[#151875]">
        OUR EXCLUSIVE PRODUCTS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={250}
                className="w-full h-[240px] object-contain rounded-lg"
              />
            ) : (
              <Image
                src="/fallback-image.jpg"
                alt="Default product"
                width={300}
                height={250}
                className="w-full h-[240px] object-contain rounded-lg"
              />
            )}

            <div className="mt-4">
              <h2 className="text-lg font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-900 font-bold text-lg">
                    ${product.price}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-red-500 font-semibold">
                      {product.discountPercentage}% OFF
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: product._id, // Ensure the ID matches CartItem type
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl || "/fallback-image.jpg", // Ensure image exists
                      quantity: 1,
                    })
                  }
                  className="bg-[#151875] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#0f1255] transition"
                >
                  Add to Cart
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Stock Level: {product.stockLevel}</p>
                <p>Category: {product.category}</p>
                {product.isFeaturedProduct && (
                  <p className="text-green-600 font-semibold">
                    Featured Product
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductCards;
