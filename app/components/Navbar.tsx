"use client"
import { useState } from 'react';
import Link from 'next/link';
import Logo from "../images/Mary Queen Trade Logo 2.png"
import Search from "../images/search.png"
import User from "../images/user.png"
import Shop from "../images/shop.png"
import Star from "../images/ph_star.png"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black h-[10rem] flex items-center text-[0.95rem] font-radio-canada">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={Logo.src} // replace with your logo path
            alt="Logo"
            className="w-[6rem] h-[6rem]"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 h-[4rem] flex items-center">
          <Link href="/" className=" relative hover-trigger group ">
            <div className=''>Home</div>
            <div className='h-[7px]'></div>
            <div className="absolute  bottom-0 left-0 h-0.5 bg-[#670305] transition-all duration-500 ease-out w-0 group-hover:w-full"></div>
          </Link>
          <div className="relative group ">
           <Link href="/shop" className=" relative hover-trigger group "> 
           <div className='flex'>
           <div className='group '>Shop </div>
           <svg className="h-3 w-3 mt-[7px] ml-[4px] group-hover:rotate-180 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
</svg>

          </div>
          <div className='h-[7px]'></div>
          <div className="absolute  bottom-0 left-0 h-0.5 bg-[#670305] transition-all duration-500 ease-out w-0 group-hover:w-full"></div>
          </Link>
            <div className="absolute left-0 hidden w-[18rem] text-[0.90rem] h-[20rem] text-gray-400 py-[3rem] group-hover:block bg-white text-black p-4 rounded shadow-lg">
              <Link href="/collections/braids" className="block px-4 py-2 hover:bg-gray-200">
                  Braids
              </Link>
              <Link href="/collections/crochets" className="block px-4 py-2 hover:bg-gray-200">
                Crochets
              </Link>
              <Link href="/collections/luxury-synthetic-wigs" className="block px-4 py-2 hover:bg-gray-200">
                Synthetic Wig
              </Link>
              <Link href="/collections/affordable-luxury-wigs" className="block px-4 py-2 hover:bg-gray-200">
                Human Hair Blend
              </Link>
              <Link href="collections/affordable-luxury-wigs" className="block px-4 py-2 hover:bg-gray-200">
                  Luxury Wigs
              </Link>
 
              <Link href="/collections/synthetic-weave" className="block px-4 py-2 hover:bg-gray-200">
                Synthetic Weave
              </Link>
            </div>
          </div>
          <Link href="/wholesale"  className=" relative hover-trigger group ">
            <div className=''>Wholesale</div>
            <div className='h-[7px]'></div>
            <div className="absolute  bottom-0 left-0 h-0.5 bg-[#670305] transition-all duration-500 ease-out w-0 group-hover:w-full"></div>
          </Link>
          <Link href="/contact" className=" relative hover-trigger group ">
            <div className=''>Contact Us</div>
            <div className='h-[7px]'></div>
            <div className="absolute  bottom-0 left-0 h-0.5 bg-[#670305] transition-all duration-500 ease-out w-0 group-hover:w-full"></div>
          </Link>

          <Link href="/blog" className=" relative hover-trigger group ">
            <div className=''>Blog</div>
            <div className='h-[7px]'></div>
            <div className="absolute  bottom-0 left-0 h-0.5 bg-[#670305] transition-all duration-500 ease-out w-0 group-hover:w-full"></div>
          </Link>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
      

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex">English            <svg className="h-3 w-3 mt-[7px] ml-[4px] group-hover:rotate-180 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
</svg></button>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 rounded shadow-lg">
              <button className="block px-4 py-2 hover:bg-gray-200">Français</button>
              <button className="block px-4 py-2 hover:bg-gray-200">Español</button>
            </div>
          </div>
      <div>
      <button className='mx-[0.9rem]'>
          <img
            src={Search.src} // replace with your logo path
            alt="Nav Icon"
       
          /></button>
                  <button className='mx-[0.9rem]'> <img
            src={User.src} // replace with your logo path
             alt="Nav Icon"
             
          /></button > 
                  <button className='mx-[0.9rem]'>  <img
            src={Star.src} // replace with your logo path
          alt="Nav Icon"
       
          /></button>
                           <button className='mx-[0.9rem]'> <img
            src={Shop.src} // replace with your logo path
             alt="Nav Icon"
       
          /></button> 
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <i className="fas fa-bars"></i> {/* Mobile menu icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white text-black p-4">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <div className="relative group">
            <button className="w-full text-left hover:bg-gray-200">Shop</button>
            <div className="bg-white text-black p-4 rounded shadow-lg">
              <Link href="/shop/category1" className="block px-4 py-2 hover:bg-gray-200">
                Category 1
              </Link>
              <Link href="/shop/category2" className="block px-4 py-2 hover:bg-gray-200">
                Category 2
              </Link>
              <Link href="/shop/category3" className="block px-4 py-2 hover:bg-gray-200">
                Category 3
              </Link>
            </div>
          </div>
          <Link href="/wholesale" className="block px-4 py-2 hover:bg-gray-200">
            Wholesale
          </Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-gray-200">
            Contact Us
          </Link>
          <Link href="/blog" className="block px-4 py-2 hover:bg-gray-200">
            Blog
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
