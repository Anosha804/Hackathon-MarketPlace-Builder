import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image"; 

interface ProductListingProps {
  product: Product;
  addToCart: (product: Product) => void;
  cart: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  return (
    
    <div className="bg-slate-100 shadow-md rounded-lg p-4 border border-slate-400 hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
      <Link href={`/product/${product.slug.current}`}>
        <Image
          src={
            product.image?.asset
              ? urlFor(product.image.asset).url() // Resolve the URL
              : "/placeholder.jpg" // Fallback placeholder
          }
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-contain rounded-md"
        />
        <div className="mt-4">
          <h2 className="text-lg text-center font-bold text-purple-800">
            {product.name}
          </h2>
          <p className="text-pink-600 text-center mt-2 text-sm font-semibold">
            {product.description}
          </p>
          <div className="flex justify-center items-center mt-4">
            <div>
            <p className="text-blue-900 font-bold text-2xl">${product.price}</p>
{product.discountPercentage ? (
  <p className="text-sm text-orange-500 font-bold animate-bounce">
    {product.discountPercentage}% OFF
  </p>
) : null}

              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductListing;
