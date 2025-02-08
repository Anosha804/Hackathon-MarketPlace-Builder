"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Ensure this is correctly imported
import Swal from "sweetalert2";

const ShopGrid = [
  {
    id: 1,
    name: "Vel elit euismod",
    image: "/image-9.png",
    price: 26.0,
    oldPrice: 42.0,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 2,
    name: "Ultricies condimentum imperdiet",
    image: "/productimage-2.png",
    price: 26.0,
    oldPrice: 42.0,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 3,
    name: "Vitae suspendisse sed",
    image: "/productimage-3.png",
    price: 26.0,
    oldPrice: 42.0,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 4,
    name: "Sed at fermentum",
    image: "/productimage-4.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 5,
    name: "Fusce pellentesque at",
    image: "/productimage-5.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 6,
    name: "Vestibulum magna laoreet",
    image: "/productimage-6.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 7,
    name: "Sollicitudin amet orci",
    image: "/productimage-7.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 8,
    name: "Ultrices mauris sit",
    image: "/productimage-8.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 9,
    name: "Pellentesque condimentum ac",
    image: "/productimage-9.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 10,
    name: "Cras scelerisque velit",
    image: "/productimage-10.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 11,
    name: "Lectus vulputate faucibus",
    image: "/productimage-11.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
  {
    id: 12,
    name: "Purus risus, ut",
    image: "/productimage-4.png",
    price: 26.00,
    oldPrice: 42.00,
    colors: ["bg-[#DE9034]", "bg-[#EC42A2]", "bg-[#8568FF]"],
  },
];

const ShopGridDefault = () => {
  const { addToCart } = useCart(); // Use Cart Hook


const handleAddToCart = (product: any) => {
  addToCart({
    name: product.name,
    price: product.price,
    image: product.image,
    id:product.id,
    quantity: 0
  });

  // SweetAlert2 Notification
  Swal.fire({
    title: "Added to Cart",
    text: `${product.name} has been added to your cart.`,
    icon: "success",
    confirmButtonText: "OK",
  });
};

  return (
    <>
      <section className="bg-[#F6F5FF] py-8 mt-8">
        <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-4 py-10 px-4 md:px-8">
          <h1 className="text-[#101750] text-4xl md:text-4xl font-bold text-center md:text-left">
            Shop Grid Default
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-center md:text-left">
            <Link href="/" className="hover:text-[#FB2E86]">Home</Link>
            <span className="text-gray-400">.</span>
            <p>Pages</p>
            <span className="text-gray-400">.</span>
            <p className="text-[#FB2E86]">Shop Grid Default</p>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-16">
        {/* Filter and Sorting Section */}
        <div className="py-4 flex flex-col lg:flex-row justify-between">
          <div className="px-4 lg:px-14">
            <h1 className="text-xl sm:text-2xl text-[#101750] font-semibold font-[Josefin Sans] mb-2">
              Ecommerce Accessories & Fashion Items
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              About 9,620 results (0.62 seconds)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="perPage" className="text-sm font-medium text-blue-700">Per Page:</label>
              <input type="text" id="perPage" className="w-16 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]" />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-sm font-medium text-blue-700">Sort By:</label>
              <select id="sortBy" className="p-1 border rounded text-sm focus:outline-none text-gray-400 focus:ring-1 focus:ring-[#FB2E86]">
                <option value="bestMatch">Best Match</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {ShopGrid.map((product) => (
            <div key={product.id} className="bg-gray-100 text-[#101750] p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#F3F3F3]">
              <Image src={product.image} alt={product.name} width={300} height={250} className="w-full h-48 sm:h-64 object-contain rounded-lg" />
              
              <div className="mt-4">
                <h3 className="text-xs sm:text-xl font-semibold text-center">{product.name}</h3>
                <div className="flex gap-2 mt-2 justify-center">
                  {product.colors.map((color, index) => (
                    <span key={index} className={`w-4 h-4 ${color} rounded-full`}></span>
                  ))}
                </div>
                <div className="mt-4 flex items-center space-x-2 justify-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <span className="text-pink-600 line-through">${product.oldPrice}</span>
                </div>
                {/* Add to Cart Button */}
                <button
onClick={() =>
  addToCart({
    id: String(product.id), // ✅ Convert id to a string
    name: product.name,
    price: product.price,
    image: product.image || "/fallback-image.jpg", // Ensure image exists
    quantity: 1, // Default quantity
  })
}
  className="bg-[#151875] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#0f1255] transition"
>
  Add to Cart
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopGridDefault;
