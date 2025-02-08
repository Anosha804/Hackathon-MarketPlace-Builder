"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  description: string;
  reviews?: string[];
  details?: string[];
}

const ProductsDetails: React.FC = () => {
  const params = useParams();
  const productId = params?.productId; 

  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    client
      .fetch(
        `*[_type == "product" && _id == $productId][0] {
          _id,
          description,
          reviews,
          details
        }`,
        { productId }
      )
      .then((data) => {
        if (!data) {
          setError("Product not found");
        }
        setProduct(data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <section className="my-20 py-20 bg-[#F9F8FE]">
      <div className="max-w-[84%] mx-auto">
        {/* Tab List */}
        <div className="flex mb-6 ml-6 space-x-4">
          {["description", "reviews", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-lg ${
                activeTab === tab
                  ? "bg-purple-800 text-white"
                  : "bg-white text-slate-600 border border-[#3F509E]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full flex flex-col gap-4">
          {activeTab === "description" && (
            <>
              <span className="text-lg font-bold text-blue-900 underline">
                Varius tempor.
              </span>
              <p className="text-sm font-semibold text-gray-900">
                {product.description} {/* ✅ Fix description field */}
              </p>
            </>
          )}

          {activeTab === "reviews" && (
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                <ul className="list-disc pl-6 text-sm text-slate-800">
                  {product.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">
                  No reviews yet. Be the first to leave a review!
                </p>
              )}
            </div>
          )}

          {activeTab === "details" && (
            <ul className="list-disc pl-6 text-sm text-slate-800">
              {product.details && product.details.length > 0 ? (
                product.details.map((detail, index) => <li key={index}>{detail}</li>)
              ) : (
                <p>No additional details available.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
