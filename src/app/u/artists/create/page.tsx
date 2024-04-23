"use client"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');

  useEffect(() => 
    {
        if (router.isReady) 
        {
        const querySlug = router.query.slug as string;
        setSlug(querySlug);
        }
    }, [router.isReady, router.query.slug]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
        Title: {slug || 'Loading...'}
      </h1>
        <button  onClick={() => router.push('./')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
            Next page
        </button>
    </div>
  );
};

export default Page;