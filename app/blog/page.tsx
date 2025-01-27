'use client';

import { sanityClient } from '../../sanity';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import Link from 'next/link'; 
export interface News {
  _id: string;
  heading: string;
  imageUrl: string;
  description: any; // Use `any` because description is an array of blocks
}

async function fetchNews(): Promise<News[]> {
  const query = `*[_type == "blogs"]{
    _id,
    heading,
    "imageUrl": image.asset->url,
    description
  }`;
  const news = await sanityClient.fetch(query);
  return news;
}

export default function Blog() {
  const [news, setNews] = useState<News[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchNews();
      setNews(result);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[16rem] mb-[10rem] text-[2.7rem]">
      <h1 className="text-center">News</h1>
      <div className="container pl-[4rem] pr-[17rem] flex flex-col py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[1.5rem]">
          {news?.map((item) => (
            <div key={item._id} className="w-[13rem] text-[#111111]   ">
              <img className="w-full h-[7rem] object-cover" src={item.imageUrl} alt={item.heading} />
              <h1 className=" text-2xl my-4 font-semibold">{item.heading}</h1>
              <div className="text-[0.9rem] description">
                {/* Use PortableText for description */}
                <PortableText value={item.description} />
              </div>
              <Link
  className="relative text-base pb-[0.4rem] border-b-[1px] border-[#ADD8E6] hover:border-b-0 group"
  href="./"
>
  READ MORE
  <span
    className="absolute bottom-0 left-0 h-[1px] bg-[#ADD8E6] blue-line"
  ></span>
  <span
    className="absolute bottom-0 left-0 h-[1px] bg-black black-line"
  ></span>
</Link>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
