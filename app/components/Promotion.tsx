"use client"
import { useState } from 'react';

const Promo = () => {
  const [currency, setCurrency] = useState('CAD');
  const [language, setLanguage] = useState('EN');

  return (
    <div className="bg-[#670305] h-[2.5rem] text-[0.8rem] flex justify-center items-center font-radio-canada">
        <h1 className='font-extrabold'>
        FREE SHIPPING 

        </h1>
        <h1 className='ml-[2px]'>on all orders over $100 SMZW1AGYB8E5</h1>
    </div>
  );
};

export default Promo;
