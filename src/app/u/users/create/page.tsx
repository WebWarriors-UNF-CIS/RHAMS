"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';

export default function CreateUserAccount() {
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
      {/* User Detail Form Section */}
      <div className="bg-gray-200 p-4 mb-4">
        <div className="mb-4">Details Placeholder</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-300 p-4">Name Placeholder</div>
          <div className="bg-gray-300 p-4">Username Placeholder</div>
          <div className="bg-gray-300 p-4">Password Placeholder</div>
          <div className="bg-gray-300 p-4">Email Placeholder</div>
          <div className="bg-gray-300 p-4">Select Role Placeholder</div>
          <div className="bg-gray-300 p-4">Active Checkbox Placeholder</div>
        </div>
        <div className="bg-gray-300 p-4">Notes Placeholder</div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex justify-end gap-4">
        <button className="bg-red-500 text-white p-2">Delete User Placeholder</button>
        <button className="bg-green-500 text-white p-2">Add New User Placeholder</button>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/artists')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/users')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
