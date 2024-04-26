"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';

export default function ArtworksDetail() {
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
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Artwork Title</h1>
        <button className="bg-green-500 text-white py-2 px-4 rounded">Edit Placeholder</button>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Column for Artwork Image and Details */}
        <div className="bg-gray-200 p-4 w-full lg:w-1/2">
          <div className="bg-gray-300 w-1/2 p-20 mb-4">Image Placeholder</div>
          <div className="bg-gray-300 p-4 mb-4">Artwork Info Placeholder</div>
          <div className="bg-gray-300 p-4">Artwork Description Placeholder</div>
        </div>

        {/* Right Column for Piece Details and Notes */}
        <div className="flex-grow bg-gray-200 p-4 lg:ml-4">
          <div className="bg-gray-300 p-4 mb-4">Piece Details Placeholder</div>
          <div className="bg-gray-300 p-4">Notes Placeholder</div>
          <div className="flex justify-end mt-4">
            <button className="bg-green-500 text-white py-2 px-4 rounded">View Sales Placeholder</button>
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
