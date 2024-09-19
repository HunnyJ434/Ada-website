"use client"
import { useState } from 'react';
import Fb from "../images/brandico_facebook.png"
import Insta from "../images/mdi_instagram.png"
import TikTok from "../images/tiktok.png"
const Header = () => {
  const [currency, setCurrency] = useState('CAD');
  const [language, setLanguage] = useState('EN');

  return (
    <div className="bg-white text-black h-[3rem] p-3 text-[0.8rem] flex justify-end items-center font-radio-canada">
      {/* Left side: Currency and Language Selection */}
      <div className="flex items-center space-x-4 ">
        <div>
          <label htmlFor="currency" className="sr-only">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-gray-700 outline-none"
          >
            <option value="CAD">Canada (CAD $)</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
        <button className='mx-[0.9rem]'>
          <img
            src={Fb.src} // replace with your logo path
            alt="Nav Icon"
       
          /></button>
                  <button className='mx-[0.9rem]'> <img
            src={Insta.src} // replace with your logo path
             alt="Nav Icon"
              
          /></button > 
                  <button className='mx-[0.9rem]'>  <img
            src={TikTok.src} // replace with your logo path
          alt="Nav Icon"
       
          /></button>
            
        </div>
      </div>

      {/* Right side: Social Media Icons */}
      <div className="flex items-center space-x-4">
        {/* These icons can be sourced from any icon library or custom SVGs */}
        <a href="#" className="hover:text-gray-300">
          <i className="fab fa-facebook-f"></i> {/* Example icon: Font Awesome */}
        </a>
        <a href="#" className="hover:text-gray-300">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-gray-300">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Header;
