"use client"

import shopImage from "../images/shopImage.webp";  // Image import

const HomeShop: React.FC = () => {
 
  return (
    <div>
      {/* Parallax Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Fixed Position */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${shopImage.src})`,
            backgroundAttachment: 'fixed',  // Ensure the image is fixed during scroll
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold">Shop smart, shop ease</h1>
          <button className="mt-6 px-6 py-3 text-[0.9rem] bg-[#670305] w-[9rem] rounded text-white hover:bg-red-700 transition">
            SHOP NOW
          </button>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>


    </div>
  );
};

export default HomeShop;
