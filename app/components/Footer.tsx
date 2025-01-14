"use client"
import Link from "next/link";
import MessageIcon from "../images/tabler_mail.png"
import ArrowIcon from "../images/tdesign_arrow-up.png"
import Insta from "../images/insta_footer.png"
import TikTok from "../images/titok_footer.png"
import Fb from "../images/fb_footer.png"
import America_Express from "../images/America Express 1.png"
import Apple_Pay from "../images/Apple Pay 1.png"
import Diners_CLub from "../images/Diners CLub 1.png"
import Discover from "../images/Discover 1.png"
import g_pay from "../images/Google Pay 1.png"
import Mastercard from "../images/Mastercard 1.png"
import Paypal from "../images/Paypal 1.png"
import shop from "../images/Shop 1.png"
import visa from "../images/Visa logo 2.png"
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {sanityClient} from '../../sanity'; 

const  Footer: React.FC = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section:any) => {
      setOpenSection(openSection === section ? null : section);
    };
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
    <div className="w-full h-[20rem] md:h-[33rem] lg:h-[25rem] bg-[#670305] text-white">
      <div className="pt-[3rem] pl-[1rem] pr-[11rem] lg:pt-[5rem] lg:pl-[4rem]">
      {/* Original layout for larger screens */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
  {/* Policies Section */}
  <div className="flex flex-col space-y-[0.44rem]">
    <h1 className="text-[1.3rem] mb-3">Policies</h1>
    <Link className="md:text-[0.9rem] xl:text-[1rem]" href="./privacy-policy">Privacy Policy</Link>
    <Link className="md:text-[0.9rem] xl:text-[1rem]" href="./refund-policy">Refund Policy</Link>
    <Link className="md:text-[0.9rem] xl:text-[1rem]" href="./shipping-policy">Shipping Policy</Link>
    <Link className="md:text-[0.9rem] xl:text-[1rem]" href="./terms-of-service">Terms of Service</Link>
  </div>

  {/* Follow Us Section */}
  <div>
    <h3 className="mb-[1.155rem]  text-[1.3rem]">Follow us</h3>
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

  {/* Let’s Get in Touch Section */}
  <div>
    <h3 className="mb-[1.155rem] text-[1.3rem]">Let’s get in touch</h3>
    <p className="text-[0.8rem] mb-4 w-[19rem]">
      Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
    </p>
    <div className="flex items-center border border-gray-300 rounded-md p-2">
      <img className="mr-1" src={MessageIcon.src} alt="Message Icon" />
      <input
        type="text"
        className="flex-1 text-black bg-[#670305] border-none outline-none"
        placeholder="Enter your email"
      />
      <img src={ArrowIcon.src} alt="arrow Icon" />
    </div>
  </div>
</div>

      {/* Collapsible layout for small screens */}
      <div className="md:hidden  space-y-6">
        {/* Policies */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("policies")}
          >
            <h1 className="text-[1rem] font-bold">Policies</h1>
            {openSection === "policies" ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronRight className="text-gray-600" />
            )}
          </div>
          {openSection === "policies" && (
            <div className="text-[0.79rem] flex flex-col space-y-3">
            <Link href="./privacy-policy">Privacy Policy</Link>
            <Link href="./refund-policy">Refund Policy</Link>
            <Link href="./shipping-policy">Shipping Policy</Link>
            <Link href="./terms-of-service">Terms of Service</Link>
            </div>
          )}
        </div>

        {/* Follow Us */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("followUs")}
          >
            <h1 className="text-[1rem] font-bold">Follow us</h1>
            {openSection === "followUs" ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronRight className="text-gray-600" />
            )}
          </div>
          {openSection === "followUs" && (
            <div className=" flex">
               {socialMediaLinks?.facebook && (
              <Link href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                <img  src={Fb.src} alt="FB Icon" />
              </Link>
                )}
               {socialMediaLinks?.instagram && (
              <Link href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                <img src={Insta.src} alt="Insta Icon" />
              </Link>
                )}
               {socialMediaLinks?.tiktok && (
              <Link href={socialMediaLinks.tiktok} target="_blank" rel="noopener noreferrer">
                <img src={TikTok.src} alt="TikTok Icon" />
              </Link>
                )}
            </div>
          )}
        </div>

        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("contact")}
          >
            <h1 className="text-[1rem] font-bold">Let’s get in touch</h1>
            {openSection === "contact" ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronRight className="text-gray-600" />
            )}
          </div>
          {openSection === "contact" && (
            <div className="">
              <p className="text-[0.8rem] mb-4">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <img
                  className="mr-1"
                  src={MessageIcon.src}
                  alt="Message Icon"
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="flex-1 text-black bg-[#670305] border-none outline-none"
                />
                <img src={ArrowIcon.src} alt="arrow Icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

        <div className="flex justify-center md:justify-end space-x-[1rem] md:space-x-[1.5rem] mt-[5rem]  mt-[5rem] md:mr-[7rem]">
            <img className="w-[2.3rem] h-[1.4rem]" src={America_Express.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={Apple_Pay.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={Diners_CLub.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={Discover.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={g_pay.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={Mastercard.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={Paypal.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={shop.src} alt="arrow Icon"/>
            <img className="w-[2.3rem] h-[1.4rem]" src={visa.src} alt="arrow Icon"/>
        </div>
    </div>
  );
};

export default Footer;
