"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';

export default function UsersDetail() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}

  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1,4);}

  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[2]) + ' Management');
    }
  }, [pathname]);
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl text-b font-bold text-left ml-5 my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="container mx-auto p-6">
      {/* Top Section with 'Add New' and 'Search' */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <div className="bg-blue-200 p-2 text-center">Add New </div>
        </div>
        <div className="bg-gray-200 p-2 text-center w-1/4">Search Placeholder</div>
      </div>

      {/* User Table Placeholder */}
      <div className="bg-gray-200 p-4">
        <div className="bg-gray-300 h-96 p-4">User Table Placeholder</div>
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
