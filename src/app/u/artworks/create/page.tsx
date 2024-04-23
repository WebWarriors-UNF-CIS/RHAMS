"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function CreateArtwork() {
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
      setSlug(reformatTitle(parts[3]) + ' ' + reformatTitle(parts[2]) + ' Placeholder Page');
    }
  }, [pathname]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </div>
        <div className="basis-1/4">
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </div>
        <div className="basis-1/2">
          <img src="https://via.placeholder.com/300" alt="placeholder" />
        </div>
        <div className="flex">
          {/* table */}
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
