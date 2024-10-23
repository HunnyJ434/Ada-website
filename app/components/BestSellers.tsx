import React from 'react';
import ProdctImg1 from "../images/Product1.png";
import ProdctImg2 from "../images/Product2.png";
import ProdctImg3 from "../images/Product3.png";
import ProdctImg4 from "../images/Product4.png";
import ProdctImg5 from "../images/Product5.png";
import ProdctImg6 from "../images/Product6.png";
import ProdctImg7 from "../images/Product7.png";
import ProdctImg8 from "../images/Product8.png";

interface Product {
  name: string;
  fromPrice?: string;  // Optional field
  oldPrice?: string;  // Optional field
  discount?: number;  // Optional field
  imageUrl: string;
}

// ProductCard Component with proper typing
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="relative group rounded-lg z-100 text-[#111111]">
      {product.discount && (
        <div className="px-3 py-1 w-[2.8rem] mt-2 ml-2 text-white text-[0.6em] z-100 bg-red-500 absolute rounded-full ">
          -{product.discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="h-[18rem] w-full bg-cover bg-center mb-4 relative" style={{ backgroundImage: `url(${product.imageUrl})` }}>
        
        {/* Eye Button (top-right) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all">
            👁️ {/* Replace with actual icon */}
          </button>
        </div>

        {/* Select Options Button (bottom of image) */}
        <div className="absolute bottom-4 h-[2.7rem] left-0 right-0 opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex justify-center">
          <button className="text-white text-[0.8rem] w-[90%] font-radio-canada rounded-lg py-2 px-4 hover:bg-opacity-75 bg-[#670305] transition-all">
            SELECTE OPTIONS
          </button>
        </div>
      </div>

      {/* Product Details */}
      <h2 className="text-lg font-semibold">{product.name}</h2>

      {/* Price Section */}
      <div className="text-sm mt-2">
        <div className="flex items-center">
          <p>From ${product.fromPrice}</p>
          {product.oldPrice && (
            <span className="line-through text-gray-500 text-sm ml-2">${product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// BestSellers Component
const BestSellers = () => {
  const products = [
    {
      name: '3X Water Locs 12"',
      fromPrice: '9.00',
      oldPrice: '14.99',
      discount: 38,
      imageUrl: ProdctImg1.src, // Example image path
    },
    {
      name: 'River Locs 10"',
      fromPrice: '8.50',
      oldPrice: '11.99',
      discount: 29,
      imageUrl: ProdctImg2.src,
    },
    {
      name: 'River Locs 18"',
      fromPrice: '9.25',
      oldPrice: '14.99',
      discount: 38,
      imageUrl: ProdctImg3.src,
    },
    {
      name: 'River Locs 22"',
      fromPrice: '14.50',
      oldPrice: '16.99',
      discount: 14,
      imageUrl: ProdctImg4.src,
    },
    {
      name: '3X Water Locs 12"',
      fromPrice: '9.00',
      oldPrice: '14.99',
      discount: 38,
      imageUrl: ProdctImg5.src, // Example image path
    },
    {
      name: 'River Locs 10"',
      fromPrice: '8.50',
      oldPrice: '11.99',
      discount: 29,
      imageUrl: ProdctImg6.src,
    },
    {
      name: 'River Locs 18"',
      fromPrice: '9.25',
      oldPrice: '14.99',
      discount: 38,
      imageUrl: ProdctImg7.src,
    },
    {
      name: 'River Locs 22"',
      fromPrice: '14.50',
      oldPrice: '16.99',
      discount: 14,
      imageUrl: ProdctImg8.src,
    },
  ];

  return (
    <div className="container pl-[4rem] flex flex-col py-8">
      <h1 className="text-2xl font-bold font-radio-canada my-[4rem] text-[#111111] text-center">Best Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button className='text-white w-[8rem] h-[3rem] my-[4.5rem] text-[0.8rem] self-center mx-auto font-radio-canada rounded-lg py-2 px-4  bg-[#670305]'>VIEW ALL</button>
    </div>
  );
};

export default BestSellers;
