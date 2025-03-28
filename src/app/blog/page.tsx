"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

// Define TypeScript types for blog
type Blog = {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Blog Post 1",
    author: "Author 1",
    date: "December 9, 2024",
    category: "Design",
    excerpt: "This is a brief excerpt from the blog post.",
    image: "/blog1.png",
  },
  {
    id: 2,
    title: "Blog Post 2",
    author: "Author 2",
    date: "December 8, 2024",
    category: "Technology",
    excerpt: "This is another brief excerpt from the second blog post.",
    image: "/blog2.png",
  },
  {
    id: 3,
    title: "Blog Post 3",
    author: "Author 3",
    date: "December 7, 2024",
    category: "Travel",
    excerpt: "An excerpt from the third blog post about travel.",
    image: "/blog3.png",
  },
];

const BlogPage = () => {
  return (
    <>
      <div>
        {/* Header Section */}
        <div className="py-16 ml-8 lg:ml-36 space-y-2">
          <h1 className="text-4xl font-bold text-[#001F54]">Blog</h1>{" "}
          {/* Dark blue */}
          <div className="flex items-center gap-2">
            <Link href={"/"}>Home</Link>
            <span className="text-black mx-2">.</span>
            <span className="text-[#FB2E86]">Latest Blogs</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-center px-6 lg:px-20 py-10">
          {/* Blog Posts Section */}
          <div className="lg:w-1/2">
            {blogs.map((blog) => (
              <div key={blog.id} className="mb-10">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={870}
                  height={453}
                  className="w-[35rem] h-80 object-cover rounded-md"
                />
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                    <span>{blog.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mt-2 text-[#001F54]">
                    {blog.title}
                  </h2>{" "}
                  {/* Dark blue */}
                  <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                  <a
                    href="#"
                    className="text-[#001F54] font-semibold mt-2 inline-block"
                  >
                    Read More
                  </a>{" "}
                  {/* Dark blue */}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 lg:pl-10 mt-10 lg:mt-0">
            {/* Search */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#001F54] mb-2">Search</h3>{" "}
              {/* Dark blue */}
              <input
                type="text"
                placeholder="Search here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001F54]"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#001F54] mb-2">
                Categories
              </h3>{" "}
              {/* Dark blue */}
              <ul className="space-y-2 text-gray-600">
                <li>Women (21)</li>
                <li>Men (15)</li>
                <li>Kids (9)</li>
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#001F54] mb-2">
                Recent Posts
              </h3>{" "}
              {/* Dark blue */}
              <ul className="space-y-2">
                {[
                  {
                    id: 4,
                    image: "/blog4m.png",
                    title: "Recent Blog 1",
                    date: "December 6, 2024",
                  },
                  {
                    id: 5,
                    image: "/blog5m.png",
                    title: "Recent Blog 2",
                    date: "December 5, 2024",
                  },
                  {
                    id: 6,
                    image: "/blog6m.png",
                    title: "Recent Blog 3",
                    date: "December 4, 2024",
                  },
                ].map((blog) => (
                  <li key={blog.id} className="flex items-center space-x-4">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={500}
                      height={500}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-[#001F54]">
                        {blog.title}
                      </h4>{" "}
                      {/* Dark blue */}
                      <p className="text-sm text-gray-500">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sale Product */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#001F54]">
                Sale Product
              </h3>
              <ul className="space-y-2">
                {[
                  {
                    id: 7,
                    image: "/pages-images/saleblog1.png",
                    excerpts: "Elit ornare in enim mauris.",
                    date: "Aug 09 2020",
                  },
                  {
                    id: 8,
                    image: "/pages-images/saleblog2.png",
                    excerpts: "Viverra pulvinar et enim.",
                    date: "Aug 09 2020",
                  },
                  {
                    id: 9,
                    image: "/pages-images/saleblog3.png",
                    excerpts: "Mattis varius donec fdsfd",
                    date: "Aug 09 2020",
                  },
                ].map((blog) => (
                  <li key={blog.id} className="flex items-center space-x-4">
                    <Image
                      src={blog.image}
                      alt=""
                      width={500}
                      height={500}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm text-blue-900">{blog.excerpts}</p>
                      <p className="text-sm text-blue-900">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offer Product */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#001F54]">
                Offer Product
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    id: 8,
                    image: "/pages-images/offerblog1.png",
                    excerpts: "Duis lectus est.",
                    price: "$12.00 - $15.00",
                  },
                  {
                    id: 9,
                    image: "/pages-images/offerblog2.png",
                    excerpts: "Sed placerat.",
                    price: "$12.00 - $15.00",
                  },
                  {
                    id: 10,
                    image: "/pages-images/offerblog3.png",
                    excerpts: "Netus proin.",
                    price: "$12.00 - $15.00",
                  },
                  {
                    id: 11,
                    image: "/pages-images/offerblog4.png",
                    excerpts: "Platea in.",
                    price: "$12.00 - $15.00",
                  },
                ].map((blog) => (
                  <div key={blog.id} className="text-center">
                    <Image
                      src={blog.image}
                      alt=""
                      width={500}
                      height={500}
                      className="w-22 h-22 object-cover rounded-md mx-auto"
                    />
                    <div className="mt-2">
                      <p className="text-l text-blue-900">{blog.excerpts}</p>
                      <p className="text-sm text-slate-500">{blog.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#001F54] mb-2">Follow</h3>
              <div className="flex space-x-4 bg-white mt-6">
                <a
                  href=""
                  className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white hover:bg-purple-800"
                >
                  <FaFacebookF />
                </a>
                <a
                  href=""
                  className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center text-white hover:bg-blue-700"
                >
                  <FaTwitter />
                </a>
                <a
                  href=""
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-purple-500"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-bold text-[#001F54] mb-2">Tags</h3>{" "}
              {/* Dark blue */}
              <div className="flex flex-wrap gap-2">
                {["Design", "Technology", "Travel", "Fashion", "Food"].map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
