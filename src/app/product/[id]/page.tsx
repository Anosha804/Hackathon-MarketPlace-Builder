"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stockLevel: number;
  category: string;
  discountPercentage: number;
  description: string;
  reviews: string[];
  details: string[];
}

interface ProductDetailsProps {
  description: string;
  reviews: string[];
  details: string[];
}

const ProductsDetails: React.FC<ProductDetailsProps> = ({ description, reviews, details }) => {
  return (
    <section className="my-20 py-20 bg-[#F9F8FE]">
      <div className="max-w-[84%] mx-auto">
        <div>
          <h2 className="text-lg font-bold text-blue-900 underline">Description</h2>
          <p className="text-sm font-semibold text-gray-900">{description}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-blue-900 underline">Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">No reviews yet.</p>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold text-blue-900 underline">Details</h2>
          <ul className="list-disc pl-6 text-sm text-slate-800">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          "image": image.asset->url,
          price,
          stockLevel,
          category,
          discountPercentage,
          description,
          reviews,
          details
        }`;
        const fetchedProduct = await client.fetch(query, { id });
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product from Sanity:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p className="text-center my-10">Loading...</p>;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 0
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-5 shadow-lg">
    <div className="bg-[#F6F5FF] py-8 text-start px-4 sm:px-8 lg:px-64">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101750]">
      Product Details
    </h1>
    <p className="text-sm mt-2 text-black">
      Home . Pages <span className="text-[#FB2E86]">. Product Details</span>
    </p>
  </div>
    
      <h1 className="text-2xl font-bold">{product.name}</h1>
       {/* Image Gallery */}
       <div className="w-full md:w-1/3">
          {product.image && (
            <div className="relative w-full h-50 md:h-96 mb-4">
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          )}

          {/* Additional Images (Placeholder logic for now) */}
          <div className="grid grid-cols-3 gap-2">
            {[product.image, product.image, product.image].map((img, index) => (
              <div
                key={index}
                className="relative w-full h-20 border rounded-md overflow-hidden"
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`Additional view ${index + 1} of ${product.name}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

      <p className="text-lg mt-2">Price: ${product.price}</p>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded"
      >
        Add to Cart
      </button>
      <ProductsDetails
        description={product.description || "No description available."}
        reviews={product.reviews || []}
        details={product.details || []}
      />
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
