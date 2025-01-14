"use client";
import { useState, useEffect } from 'react';
import Hero1 from "../images/hero1.png";
import Hero2 from "../images/hero2.png";
import Hero3 from "../images/hero3.png";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const heroData = [
    {
      heading: "Welcome to",
      text: "Discover the Essence of African Beauty",
      text2: "Mary Queen Trade brings you authentic African hair products, nurturing your natural beauty",
      imageUrl: Hero1.src,
    },
    {
      text: "Discover the beauty in you with Mary Queen Trade!",
      imageUrl: Hero2.src,
    },
    {
      text: "Bringing Africa to Your Doorstep",
      text2: "We are your source for quality African haircare. Experience warmth, culture, and authenticity",
      imageUrl: Hero3.src,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!fade) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % heroData.length);
        setFade(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [fade]);

  const { heading, text, text2, imageUrl } = heroData[index];

  return (
    <div className="mt-[10rem]"> 
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
      <div
        className={`flex items-center justify-center text-white h-[31rem] font-radio-canada transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'white',
        }}
      >
        <div className='flex flex-col items-center'>
          {heading && <h1 className="text-[1rem] item-center font-light font-radio-canada mb-2 animate-slide-up">{heading}</h1>}
          {text && <p className="text-3xl mb-4 animate-slide-up">{text}</p>}
          {text2 && <p className="text-[1rem] item-center font-light font-radio-canada mb-2 mb-4 animate-slide-up">{text2}</p>}
          <button className="bg-[#670305] text-white font-bold py-2 px-4 w-[10rem] h-[3rem] rounded-lg animate-slide-up"><h1 className='text-[0.9rem] font-light'>SHOP NOW</h1></button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
