"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';

export default function CreateExhibition() {
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
      {/* Upper Form Section */}
      <div className="bg-gray-200 p-4 mb-6">
        <div className="mb-4">Details Placeholder</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-300 p-4">Form Field Placeholder</div>
          {/* Repeat for the number of fields */}
        </div>
        <div className="bg-gray-300 p-4">Notes Placeholder</div>
        <div className="bg-green-200 p-2 mt-4 w-1/4 self-end">Save Record Placeholder</div>
      </div>

      {/* Bottom Table Section */}
      <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-100">
      {/* Export to Excel Placeholder */}
      <div className="bg-green-200 p-2 text-sm">Export to Excel Placeholder</div>

      {/* Search Placeholder */}
      <div className="flex items-center bg-white border rounded overflow-hidden">
        <input
          className="px-4 py-2"
          placeholder="Add Artwork by Title or File #"
        />
        <button className="bg-green-500 p-2">
          {/* Placeholder for the search icon */}
        </button>
      </div>
    </div>
        <div className="bg-gray-300 h-72  p-4">Table Placeholder</div>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/media')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/exhibitions')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
