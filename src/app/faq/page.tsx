
'use client';
import Image from 'next/image';
import Link from 'next/link';



function FAQ() {
  return (
    <> 

<section className="bg-[#F6F5FF] py-8 mt-8">
          <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-4 py-10 px-4 md:px-8">
            <h1 className="text-[#101750] text-4xl md:text-4xl font-bold text-center md:text-left">
              FAQ
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base font-medium text-center md:text-left">
            <Link href="/" className="hover:text-[#FB2E86]">
                Home
              </Link>
              <span className="text-gray-400">.</span>
              <p>Pages</p>
              <span className="text-gray-400">.</span>
              <p className="text-[#FB2E86]">FAQ</p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 bg-white md:grid-cols-2 gap-8 py-16 px-4 md:px-8">
          {/* Left Section */}
          <div className="text-left">
            <h2 className="text-[#151875] text-2xl font-bold mb-6">
              General Information
            </h2>
            {/* First */}
            <div className="mb-8">
              <h3 className="text-[#151875] text-lg font-semibold mb-2">
                Eu dictumst cum at sed euismod condimentum?
              </h3>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt sed tristique mollis vitae, consequat gravida
                sagittis.
              </p>
            </div>
            {/* Second */}
            <div className="mb-8">
              <h3 className="text-[#151875] text-lg font-semibold mb-2">
                Magna bibendum est fermentum eros?
              </h3>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt sed tristique mollis vitae, consequat gravida
                sagittis.
              </p>
            </div>
            {/* Third */}
            <div className="mb-8">
              <h3 className="text-[#151875] text-lg font-semibold mb-2">
                Odio muskana hak eris conseekin sceleton?
              </h3>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt sed tristique mollis vitae, consequat gravida
                sagittis.
              </p>
            </div>
            {/* Fourth */}
            <div className="mb-8">
              <h3 className="text-[#151875] text-lg font-semibold mb-2">
                Elit id blandit sabara boi velit gua mara?
              </h3>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt sed tristique mollis vitae, consequat gravida
                sagittis.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-[#151875] text-2xl font-bold mb-4">
              Ask a Question
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full border rounded-md px-4 py-2 text-sm"/>
              <input
                type="text"
                placeholder="Subject*"
                className="w-full border rounded-md px-4 py-2 text-sm"/>
              <textarea
                placeholder="Type Your Message*"
                className="w-full border rounded-md px-4 py-2 text-sm h-32 resize-none">
                     </textarea>
              <button className="bg-[#FB2E86] text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                Send Email
              </button>
            </form>
          </div>
        </div>

        {/* Tagpic */}
                <div className="flex justify-center items-center mt-14">
                  <Image
                    src="/logo.png"
                    alt="logo Pic"
                    width={904}
                    height={93}
                    className="cursor-pointer"
                  />
                </div>

    </>
  );
}

export default FAQ;
