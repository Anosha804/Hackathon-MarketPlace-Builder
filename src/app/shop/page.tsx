import Shop from '@/app/components/shop'
import Link from 'next/link'

import React from 'react'

const ShopPage = () => {
    return (
        <main>
             <section className="bg-[#F6F5FF] py-8 mt-8">
          <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-4 py-10 px-4 md:px-8">
            <h1 className="text-[#101750] text-4xl md:text-4xl font-bold text-center md:text-left">
              Blog Page
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base font-medium text-center md:text-left">
              <Link href="/" className="hover:text-[#FB2E86]">
                Home
              </Link>
              <span className="text-gray-400">.</span>
              <p>Pages</p>
              <span className="text-gray-400">.</span>
              <p className="text-[#FB2E86]">Blog Page</p>
            </div>
          </div>
        </section>
            
            <Shop />
        </main>
    )
}

export default ShopPage
