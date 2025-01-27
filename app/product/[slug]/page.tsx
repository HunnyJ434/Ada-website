'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { sanityClient } from '../../../sanity';
import eye_icon from "../../images/eye_icon.png"
export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  discount?: number;
  fromPrice: number;
  oldPrice?: number;
  size?: string[]; 
  colors?: string[]; 
}

const fetchProductById = async (id: string): Promise<Product | null> => {
  const query = `*[_id == $id][0]{
    _id,
    name,
    "imageUrl": image.asset->url,
    discount,
    fromPrice,
    oldPrice,
    size,
    colors
  }`;
  return sanityClient.fetch(query, { id });
};

const similarProducts = async (excludeId: string): Promise<Product[]> => {
  const query = `*[_type == "braids" && _id != $excludeId]{
    _id,
    name,
    "imageUrl": image.asset->url,
    discount,
    fromPrice,
    oldPrice,
    size,
    colors
  }`;
  
  const allProducts = await sanityClient.fetch(query, { excludeId });
  
  // Shuffle and return 4 random products
  const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
  
  return randomProducts;
};

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProduct, setSimilarProduct] = useState<Product[]>();
  const [productCount, setProductCount] = useState<number>(1);
  const { slug } = useParams<any>();

  useEffect(() => {
    if (slug) {
      fetchProductById(slug).then((data) => {
        setProduct(data);
      });
      const fetchData = async () => {
        const result = await similarProducts(slug);
        setSimilarProduct(result);
      };
      fetchData();  
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[16rem] mb-[10rem] text-[2.7rem]">
      <div className="container mx-auto">
        <div className="flex pl-[4.3rem]">
          <div>
            <p className="text-[0.5rem]">Image list</p>
          </div>
          <div className="ml-[3rem]  pt-4 mr-[3rem]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-[29.5rem]  "
            />
          </div>

          <div>
            <h1 className="text-4xl p-0 font-bold mb-2">{product.name}</h1>
            <div className="flex my-[1.4rem]">
              <p className="text-3xl font-semibold text-gray-500">
                ${product.fromPrice}
              </p>
              {product.oldPrice && (
                <p className="text-base ml-3 gray-900 line-through">
                  ${product.oldPrice}
                </p>
              )}
            </div>
            <p className="text-base">Size:</p>
            <div className="flex flex-wrap mt-2 space-x-[0.5rem]">
              {product.size?.map((size, index) => (
                <button
                  key={index}
                  className="text-black border-[1px]  text-[1rem] h-[3.1rem] px-[0.7rem] hover:border-black rounded-lg  ">
                  {size}
                </button>
              ))}
            </div>
            <p className="text-base">Color:</p>
            <div className="flex flex-wrap mt-2 space-x-[0.5rem]">
              {product.colors?.map((color, index) => (
                <button
                  key={index}
                  className="text-black border-[1px]  text-[1rem] h-[3.1rem] px-[0.7rem] hover:border-black rounded-lg  ">
                  {color}
                </button>
              ))}
            </div>
            <p className="text-base mt-5">Quantity</p>
            <div className='flex mt-3  space-x-[1rem]'>
              <div className='flex   border-[1px] w-[8rem] rounded-md h-[3rem]'>
                <button className='text-3xl pb-1 w-[2.5rem] disabled:text-gray-400' disabled={productCount == 1} onClick={() => {productCount >1? setProductCount(productCount - 1) : ""}}>-</button>
                <p className='text-base w-[3rem] text-center pt-3'>{productCount}</p>
                <button className='text-3xl font-semibold  w-[2.5rem]' onClick={() => setProductCount(productCount + 1)}>+</button>
              </div>
              <button className='text-center text-sm border-[1px] border-black h-[3rem] w-[25.7rem] text-gray-900 rounded-md transition duration-[500ms] hover:text-white hover:bg-[#670305]'>ADD TO CART</button>
            </div>
            <button><div className="flex text-base bg-[#5433EB] w-[34.8rem] justify-center items-center h-[2.8rem] mb-0 rounded-md"><span className='text-white mr-1'>Buy with </span><svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="shop-pay-logo" viewBox="0 -2 341 81" height="20px" width="85px">
              <title id="shop-pay-logo">Shop Pay</title>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V67.8125C214.896 74.563 220.448 80.0354 227.297 80.0354H328.357C335.206 80.0354 340.758 74.563 340.758 67.8125V12.2229C340.758 5.47237 335.206 0 328.357 0H227.297ZM244.999 55.8917V41.8012H253.993C262.21 41.8012 266.579 37.2604 266.579 30.379C266.579 23.4976 262.21 19.3782 253.993 19.3782H239.205V55.8917H244.999ZM244.999 24.8084H252.663C257.982 24.8084 260.595 26.9617 260.595 30.5663C260.595 34.1708 258.077 36.3242 252.9 36.3242H244.999V24.8084ZM276.795 56.6407C281.212 56.6407 284.109 54.7214 285.439 51.4445C285.819 55.0959 288.052 56.9684 292.896 55.7044L292.944 51.819C290.996 52.0063 290.616 51.3041 290.616 49.2912V39.7415C290.616 34.124 286.864 30.8003 279.93 30.8003C273.09 30.8003 269.148 34.1708 269.148 39.8819H274.468C274.468 37.1668 276.415 35.5284 279.835 35.5284C283.444 35.5284 285.107 37.0732 285.059 39.7415V40.9586L278.932 41.614C272.045 42.3629 268.246 44.9376 268.246 49.4316C268.246 53.1298 270.905 56.6407 276.795 56.6407ZM277.982 52.4276C274.99 52.4276 273.803 50.836 273.803 49.2443C273.803 47.091 276.273 46.1079 281.117 45.5462L284.917 45.1249C284.679 49.2443 281.877 52.4276 277.982 52.4276ZM310.537 57.7174C308.115 63.5221 304.22 65.2541 298.141 65.2541H295.528V60.4793H298.331C301.655 60.4793 303.27 59.4494 305.028 56.5002L294.246 31.5493H300.23L307.925 49.7593L314.764 31.5493H320.606L310.537 57.7174Z" fill="white"></path>
              <path d="M29.5136 35.1798C21.5797 33.4835 18.0451 32.8197 18.0451 29.8064C18.0451 26.9722 20.4371 25.5604 25.221 25.5604C29.4282 25.5604 32.5036 27.3726 34.7674 30.9232C34.9382 31.1972 35.2906 31.292 35.5789 31.1445L44.506 26.6983C44.8263 26.5402 44.9438 26.1399 44.7623 25.8343C41.0569 19.5022 34.2121 16.0358 25.1996 16.0358C13.3574 16.0358 6 21.7885 6 30.9338C6 40.648 14.9591 43.1029 22.9038 44.7992C30.8484 46.4955 34.3936 47.1592 34.3936 50.1725C34.3936 53.1858 31.8095 54.6082 26.6518 54.6082C21.8893 54.6082 18.3548 52.4589 16.2191 48.2866C16.059 47.981 15.6852 47.8546 15.3756 48.0127L6.46985 52.364C6.16017 52.5221 6.03203 52.8908 6.19221 53.2069C9.72673 60.2134 16.9773 64.1538 26.6625 64.1538C38.996 64.1538 46.4494 58.496 46.4494 49.0663C46.4494 39.6365 37.4476 36.8972 29.5136 35.2009V35.1798Z" fill="white"></path>
              <path d="M77.3525 16.0358C72.291 16.0358 67.8168 17.8059 64.6026 20.9561C64.3997 21.1458 64.0687 21.0088 64.0687 20.7349V0.621625C64.0687 0.273937 63.791 0 63.4387 0H52.2692C51.9168 0 51.6391 0.273937 51.6391 0.621625V63.0476C51.6391 63.3952 51.9168 63.6692 52.2692 63.6692H63.4387C63.791 63.6692 64.0687 63.3952 64.0687 63.0476V35.6644C64.0687 30.3754 68.1798 26.319 73.7219 26.319C79.2639 26.319 83.279 30.2911 83.279 35.6644V63.0476C83.279 63.3952 83.5566 63.6692 83.909 63.6692H95.0785C95.4309 63.6692 95.7085 63.3952 95.7085 63.0476V35.6644C95.7085 24.1591 88.0628 16.0464 77.3525 16.0464V16.0358Z" fill="white"></path>
              <path d="M118.389 14.2552C112.324 14.2552 106.622 16.0779 102.542 18.7224C102.265 18.9016 102.169 19.2703 102.34 19.5548L107.262 27.8466C107.444 28.1416 107.828 28.247 108.127 28.0679C111.224 26.2241 114.769 25.2653 118.389 25.2864C128.138 25.2864 135.303 32.0716 135.303 41.0377C135.303 48.6763 129.569 54.3342 122.297 54.3342C116.371 54.3342 112.26 50.9311 112.26 46.1266C112.26 43.3767 113.445 41.122 116.531 39.5311C116.851 39.3625 116.969 38.9727 116.777 38.6671L112.132 30.9126C111.982 30.6598 111.662 30.5439 111.373 30.6492C105.148 32.925 100.78 38.4037 100.78 45.7579C100.78 56.8839 109.761 65.1863 122.287 65.1863C136.916 65.1863 147.434 55.1876 147.434 40.8481C147.434 25.476 135.197 14.2446 118.368 14.2446L118.389 14.2552Z" fill="white"></path>
              <path d="M180.098 15.9515C174.449 15.9515 169.409 18.006 165.725 21.6304C165.522 21.8306 165.191 21.6831 165.191 21.4092V17.0473C165.191 16.6996 164.914 16.4256 164.561 16.4256H153.68C153.328 16.4256 153.05 16.6996 153.05 17.0473V79.3784C153.05 79.7261 153.328 80 153.68 80H164.849C165.202 80 165.48 79.7261 165.48 79.3784V58.9385C165.48 58.6645 165.811 58.5276 166.013 58.7067C169.687 62.0782 174.545 64.0485 180.109 64.0485C193.211 64.0485 203.43 53.5862 203.43 39.9947C203.43 26.4032 193.2 15.941 180.109 15.941L180.098 15.9515ZM177.995 53.4914C170.541 53.4914 164.892 47.6439 164.892 39.9104C164.892 32.177 170.53 26.3295 177.995 26.3295C185.459 26.3295 191.086 32.0822 191.086 39.9104C191.086 47.7387 185.533 53.4914 177.984 53.4914H177.995Z" fill="white"></path>
              </svg></div>
            </button>
            <div className=' w-[34.8rem] h-[4rem] flex items-center justify-center'><button className='underline text-sm'>More payment options</button></div>
            <div className='w-[34.8rem] h-[3.5rem] border-b-[1px] flex items-center space-x-[2.5rem]'>
              <button className=' flex text-sm space-x-[0.4rem]'><svg className="m-svg-icon--medium w-[1.3rem]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C185.658 133.514 210.842 116 255.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12zM256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8z"></path></svg>
               <p>Ask a question</p>
              </button>
              <button className=' flex text-sm space-x-[0.4rem]'>
                <svg className="m-svg-icon--medium w-[1.3rem]" width="14" height="16" fill="none" viewBox="0 0 14 16"><path fill="currentColor" d="M11 10c.8333 0 1.5417.2917 2.125.875.5833.5833.875 1.2917.875 2.125 0 .8333-.2917 1.5417-.875 2.125-.5833.5833-1.2917.875-2.125.875-.8333 0-1.54167-.2917-2.125-.875C8.29167 14.5417 8 13.8333 8 13c0-.3125.04167-.6146.125-.9062l-3.0625-1.9063C4.47917 10.7292 3.79167 11 3 11c-.83333 0-1.54167-.2917-2.125-.875C.291667 9.54167 0 8.83333 0 8c0-.83333.291667-1.54167.875-2.125C1.45833 5.29167 2.16667 5 3 5c.79167 0 1.47917.27083 2.0625.8125L8.125 3.90625C8.04167 3.61458 8 3.3125 8 3c0-.83333.29167-1.54167.875-2.125C9.45833.291667 10.1667 0 11 0c.8333 0 1.5417.291667 2.125.875C13.7083 1.45833 14 2.16667 14 3c0 .83333-.2917 1.54167-.875 2.125C12.5417 5.70833 11.8333 6 11 6c-.7917 0-1.47917-.27083-2.0625-.8125L5.875 7.09375c.1875.60417.1875 1.20833 0 1.8125l3.0625 1.90625C9.52083 10.2708 10.2083 10 11 10zm1.0625-8.0625C11.7708 1.64583 11.4167 1.5 11 1.5c-.4167 0-.7708.14583-1.0625.4375C9.64583 2.22917 9.5 2.58333 9.5 3s.14583.77083.4375 1.0625c.2917.29167.6458.4375 1.0625.4375.4167 0 .7708-.14583 1.0625-.4375.2917-.29167.4375-.64583.4375-1.0625s-.1458-.77083-.4375-1.0625zm-10.125 7.125C2.22917 9.35417 2.58333 9.5 3 9.5s.77083-.14583 1.0625-.4375S4.5 8.41667 4.5 8s-.14583-.77083-.4375-1.0625S3.41667 6.5 3 6.5s-.77083.14583-1.0625.4375S1.5 7.58333 1.5 8s.14583.77083.4375 1.0625zm8 5c.2917.2917.6458.4375 1.0625.4375.4167 0 .7708-.1458 1.0625-.4375.2917-.2917.4375-.6458.4375-1.0625 0-.4167-.1458-.7708-.4375-1.0625-.2917-.2917-.6458-.4375-1.0625-.4375-.4167 0-.7708.1458-1.0625.4375C9.64583 12.2292 9.5 12.5833 9.5 13c0 .4167.14583.7708.4375 1.0625z"></path></svg>
                <p>Share</p>
              </button>
            </div>
            <div className='py-[2rem] w-[34.8rem] space-y-[1rem] text-sm'>
              <p>At Mary Queen Trade we guarantee your satisfaction by offering you authentic X-pression braids imported directly from Nigeria.</p> 
              <p>X-pression braids are #1 in quality, longevity, style, and trendiness.</p>
              <ul className='list-disc pl-[2rem]'>
                <li>Super light</li>
                <li>Hot water use</li>
                <li>Tangle free</li>
                <li>100% kanakelon</li>
                <li>Pre-stretched</li>
                <li>Pre-cut</li>
                <li>Ombre color</li>
                <li>Easy use</li>
                <li>Saves time</li>
                <li>Suitable for all kinds of braids</li>                
              </ul>
              <p>We have so many colors in stock to achieve that beautiful style you have in mind.</p>
            </div>           
          </div>
        </div>
        <div className='ml-[4.3rem]'>
          <h1 className='text-3xl font-bold '>You Might Also Like</h1>
          <div className="container text-center flex flex-col py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[1.5rem] gap-x-[1rem] ">
      {similarProduct?.map((product) => (
        <div key={product._id} className="relative group rounded-lg z-100 text-[#111111]"  
              style={{ cursor: 'pointer' }}>
          <div className="relative group rounded-lg z-100 text-[#111111]">
          {product.discount && (
            <div className="px-3 py-1  mt-2 ml-2 text-white  z-[1000] bg-red-500 absolute rounded-full">
              <p className='text-[0.6rem]'>-{product.discount}%</p>
            </div>
          )}

          <div
            className="h-[16.3rem] w-[16rem] z-100  bg-cover bg-center mb-4 relative"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className=" text-white rounded-full w-[2.9rem] h-[2.9rem] px-1  flex justify-center items-center bg-[#670305] transition-all">
                <img className='mb-2' src={eye_icon.src}></img>
              </button>
            </div>

            <div className="absolute bottom-4 h-[2.7rem] left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
              <button className="text-white text-[0.8rem] w-[90%] font-radio-canada rounded-lg py-2 px-4 hover:bg-opacity-75 bg-[#670305] transition-all">
                SELECT OPTIONS
              </button>
            </div>
          </div>

          <h2 className="text-lg text-center w-[16rem] font-semibold">{product.name}</h2>

          <div className="text-sm text-center w-[16rem] mt-2">
            <div className="flex justify-center text-gray-500 items-center">
              <p>${product.fromPrice}</p>
              {product.oldPrice && (
                <span className="line-through text-black  text-sm ml-2">${product.oldPrice}</span>
              )}
            </div>
          </div>
        </div>
        </div>
      ))}
    </div>
    </div>
        </div>
      </div>
    </div>
  );
}