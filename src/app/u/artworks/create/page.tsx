"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';

export default function CreateArtwork() {
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
      <div className="container mx-auto p-6 bg-white shadow-md">
      <div className="flex justify-between">
        <div className="w-1/2 p-4">
          <div className="bg-gray-200 aspect-w-1 aspect-h-1 flex justify-center items-center">
            <span className="text-gray-500 h-56">Image preview</span>
          </div>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Upload Image
          </button>
        </div>
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Artwork Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
            />
          </div>
          {/* ... other input fields ... */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="notes"
              placeholder="Enter notes about the artwork here..."
            ></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Record
          </button>
        </div>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/collections')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/artworks')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
