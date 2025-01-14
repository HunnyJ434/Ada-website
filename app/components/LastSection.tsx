"use client"

import LastSectionImage from "../images/lastSectionPic.jpg";  // Image import

const LastSection: React.FC = () => {
 
  return (
    <div>
      {/* Parallax Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Fixed Position */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${LastSectionImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col  justify-center h-full ml-[3.5rem] text-white">
          <h1 className="text-4xl font-radio-canada item-left font-bold mb-[1.8rem]">Experience the Brilliance</h1>
          <p className="mb-[2rem] font-radio-canada w-[58rem]">Life is too short to settle for anything less than beautiful. Embrace your unique beauty and let it shine with confidence, supported by the power of high-quality products.</p>
          <button className="mt-6 px-6 font-radio-canada py-3 text-[1rem] font-semibold bg-[#670305] w-[9rem] rounded text-white hover:bg-red-700 transition">
            SHOP NOW
          </button>
        </div>

      </div>


    </div>
  );
};

export default LastSection;
