import BlogSection from "./components/HomePage/BlogSection";
import Discount from "./components/HomePage/Discount";
import Features from "./components/HomePage/Features";
import Hero from "./components/HomePage/Hero";
import LatestProducts from "./components/HomePage/LatestProducts";
import Newsletter from "./components/HomePage/NewsLetter";
import Offer from "./components/HomePage/Offers";
import TopCategories from "./components/HomePage/TopCategories";
import TrendingProducts from "./components/HomePage/TrendingProducts";
import Unique from "./components/HomePage/Unique";
import { client } from "@/sanity/lib/client";
import CartProvider from "./components/Provider";

export default async function Home() {
  const query1 = ` *[_type == "product"]{
    _id,
    name,
    "image":image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
}[0...6]`;

  const featuredData = await client.fetch(query1);

  const query2 = ` *[_type == "product"]{
    _id,
    name,
    "image":image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
}[0...6]`;
  const latestProduct = await client.fetch(query2);

  return (
    <div>
      <CartProvider>
        <Hero />
        <Features data={featuredData} />
        <LatestProducts data={latestProduct} />
        <Offer />
        <Unique />
        <TrendingProducts />
        <Discount />
        <TopCategories />
        <Newsletter />
        <BlogSection />
        </CartProvider>
    </div>
  )
}

