'use client';

import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success("Your message has been sent! Stay connected.", {
      position: "top-center",
      autoClose: 2000,
    });

    // Clear form fields
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <ToastContainer /> {/* Toast Notification Container */}

      <div className="w-full bg-gray-50">
        {/* Header Section */}
        <div className="bg-gray-200 py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#101750] mb-2">Contact Us</h1>
            <p className="text-sm text-black">
              Home <span className="text-black">.</span> Pages <span className="text-black">.</span>{" "}
              <span className="text-[#FB2E86]">Contact Us</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-wrap gap-12">
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#151875] mb-4">Information About Us</h2>
            <p className="text-blue-900 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>

            <h2 className="text-3xl font-bold text-[#151875] mt-20">Get in Touch</h2>
            <p className="text-blue-900 mt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="Your Name*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your E-mail*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <input
                type="text"
                placeholder="Subject*"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              />
              <textarea
                placeholder="Type your message*"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-3 outline-none text-sm"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 text-white py-3 px-8 rounded-md hover:bg-red-600 transition-colors"
              >
                Send Mail
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Contact Way</h2>
            <div className='mt-20'>
              <Image src="/connect.png" alt="Contact" width={500} height={500} />
            </div>    
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
