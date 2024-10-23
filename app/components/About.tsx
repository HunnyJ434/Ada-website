import Image from 'next/image';
import React from 'react';
import aboutImage from "../images/aboutImage.webp"
const AboutSection = () => {
  return (
    <section className="bg-white py-12 ml-[8rem]">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side - Text Section */}
        <div className="md:w-1/2 px-4">
          <p className='text-[#111111] text-[0.8rem] mb-[2rem]'>About</p>
          <h2 className="text-3xl font-bold text-[#111111] mb-4">Mary Queen Trade</h2>
          <p className="text-gray-700 text-[#111111] leading-7 text-[0.95rem] pr-[3.5rem] mb-6">
            Every month, Shop MARY QUEEN TRADE curates unique items and products.
            We are your one-stop destination for all your needs. Created since 2021, 
            we have all your daily fix for trendy and fashionable products. We take 
            pride in delivering extremely high-quality and affordable products. 
            While being an online home for all sorts of products, we offer all our 
            customers from around the world, shipping to their doorsteps.
          </p>
          <button className="mt-6 px-6 py-3 text-[0.9rem] bg-[#670305] w-[9rem] rounded text-white hover:bg-red-700 transition">
            SHOP NOW
          </button>
        </div>

        {/* Right Side - Image Section */}
        <div className="md:w-1/2 px-4 mt-8 md:mt-0">
          <Image
            src = {aboutImage.src} // Use the appropriate path for the image
            alt="Models"
            width={550}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
