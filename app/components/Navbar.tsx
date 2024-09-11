// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10" />
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/shop" className="text-black font-medium  text-[30px] hover:text-gray-900">
            Shop
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">
            Services
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-gray-900">Login</button>
          <button className="text-gray-700 hover:text-gray-900">Register</button>
          <button className="text-gray-700 hover:text-gray-900">Cart</button>
          <button className="text-gray-700 hover:text-gray-900">Wishlist</button>
          <button className="text-gray-700 hover:text-gray-900">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
