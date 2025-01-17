import { sanityClient } from '../../../sanity';
import eye_icon from "../../images/eye_icon.png"

export interface Product {
    _id: string;
    name: string;
    imageUrl: string;
    discount?: number;
    fromPrice: number;
    oldPrice?: number;
  }
  
async function fetchProducts(): Promise<Product[]> {
    const query = `*[_type == "crochets"]{
      _id,
      name,
      "imageUrl": image.asset->url,
      discount,
      fromPrice,
      oldPrice
    }`;
    const crochets = await sanityClient.fetch(query, {}, { 
        tag: `crochets-${Date.now()}`
      });
    return crochets;
  }
  
  export default async function Crochets() {
    const products = await fetchProducts();

  return (
    <div className="mt-[16rem] mb-[10rem]  text-[2.7rem]">
        <h1 className="text-center">Crochets</h1>
        <div className="container pl-[4rem] text-center flex flex-col py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[1.5rem] gap-x-[9rem] ">
      {products.map((product) => (
        <div key={product._id} className="relative group rounded-lg z-100 text-[#111111]">
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

  );
};

