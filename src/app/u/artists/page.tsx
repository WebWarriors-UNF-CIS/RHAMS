"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';

export default function ArtistOverview() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();

  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1);}

  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[2]) + ' ');
    }
  }, [pathname]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <h2 className="text-2xl font-bold">Search</h2>
        </div>
        <div className="basis-1/2">
        <button  onClick={() => router.push('./artists/create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Add Artist
        </button>
        </div>
        <div className="flex">
          {/* table */}
        </div>
      </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
