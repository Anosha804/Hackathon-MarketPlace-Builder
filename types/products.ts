import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Product {
    
    
    _id: string;
    name: string;
    _type: "product";
    image?: {
      url: string | StaticImport; // Corrected this line
      asset: {
        _ref: string;
        _type: "image";
      };
    };
    price: number;
    description?: string;
    slug: {
      _type: "slug";
      current: string;
    };
    discountPercentage?: number;
    stockLevel: number; 
    isFeaturedProduct?: boolean;
    category: string; 
  }
  