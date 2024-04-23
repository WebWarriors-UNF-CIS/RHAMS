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
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}

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
        <div className="basis-1/4">
          <Image loader={imageLoader} src="150" alt="placeholder" width={150} height={150}/>
        </div>
        <div className="basis-1/4">
          <Image loader={imageLoader} src="150" alt="placeholder" width={150} height={150}/>
        </div>
        <div className="basis-1/2">
          <Image loader={imageLoader} src="300" alt="placeholder" width={300} height={300}/>
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
