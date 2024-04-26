"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';

export default function MediaDetail() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}

  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1);}
  
  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[3]) + ' ' + reformatTitle(parts[2]) + ' Placeholder Page');
    }
  }, [pathname]);
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Column for Image and Bio */}
        <div className="flex flex-col items-center bg-gray-200 p-4 w-full lg:w-1/3 text-center mb-6 lg:mb-0">
          <div className="bg-gray-400 w-48 h-48 mb-4">Image Placeholder</div>
          <div className="bg-green-200 p-2 w-full">Lifespan Placeholder</div>
          <div className="bg-gray-300 p-4 mt-4">Bio Placeholder</div>
        </div>

        {/* Right Column for Artist Details */}
        <div className="flex-grow bg-gray-200 p-4">
          <div className="text-xl mb-6">Artist Name</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-300 p-4">Detail Field Placeholder</div>
            {/* Repeat for the number of detail fields */}
          </div>
          <div className="bg-gray-300 p-4">Notes Placeholder</div>
          <div className="flex justify-between mt-4">
            <button className="bg-red-500 text-white p-2">Delete Button Placeholder</button>
            <button className="bg-green-500 text-white p-2">Edit Button Placeholder</button>
          </div>
        </div>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/artworks')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/artists')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
