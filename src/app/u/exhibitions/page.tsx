"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { remult, EntityFilter} from 'remult';
import { Exhibition } from '../../../shared/exhibition';
import React from 'react';
import Image from "next/image";

const repo = remult.repo<Exhibition>(Exhibition);

export default function ExhibitionsOverview() 
{
  const router = useRouter();
  const [exhibit, setExhibits] = useState<Exhibition[]>([]);
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}

  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1);}
  useEffect(() => 
  {if (pathname) { const parts = pathname.split('/'); setSlug(reformatTitle(parts[2]) + ' ')}}, [pathname]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-4 flex-auto">
          <div className="bg-red-200 p-4 text-center">Overview</div>
          <div className="bg-green-200 p-4 text-center">New </div>
          <div className="bg-blue-200 p-4 text-center">Excel</div>
          <div className="bg-yellow-200 p-4 text-center">Add New +</div>
        </div>
        <div className="bg-purple-200 p-4 text-center flex-none">Search </div>
      </div>
      <div className="bg-gray-300 h-96 p-8 text-center">
        Exhibitions Table 
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/exhibitions/create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/collections')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
