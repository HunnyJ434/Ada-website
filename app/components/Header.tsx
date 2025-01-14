"use client"
import { useState, useEffect } from 'react';
import Fb from "../images/brandico_facebook.png"
import Insta from "../images/mdi_instagram.png"
import TikTok from "../images/tiktok.png"
import Link from "next/link";
import {sanityClient} from '../../sanity'; 
const Header = () => {
  const [currency, setCurrency] = useState('CAD');
    const [socialMediaLinks, setSocialMediaLinks] = useState<{
      facebook?: string;
      instagram?: string;
      tiktok?: string;
    } | null>(null);
 

    useEffect(() => {
      const fetchSocialMediaLinks = async () => {
        try {
          const query = `*[_type == "socialMediaLinks"][0]`;
          const data = await sanityClient.fetch(query);
          setSocialMediaLinks(data);
        } catch (error) {
          console.error('Error fetching social media links:', error);
        }
      };
  
      fetchSocialMediaLinks();
    }, []);

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
        <div className="flex space-x-5">
    {socialMediaLinks?.facebook && (
              <Link className="inline" href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                <img  src={Fb.src} alt="FB Icon" />
              </Link>
                )}
               {socialMediaLinks?.instagram && (
              <Link className="inline" href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                <img src={Insta.src} alt="Insta Icon" />
              </Link>
                )}
               {socialMediaLinks?.tiktok && (
              <Link className="inline" href={socialMediaLinks.tiktok} target="_blank" rel="noopener noreferrer">
                <img src={TikTok.src} alt="TikTok Icon" />
              </Link>
                )}
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
