"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';
import Link from 'next/link';
import { ArtistData, columns } from "../../../components/ui/columns/artist-overview"
import { DataTable } from "@/components/ui/data-table"
import { remult, EntityFilter} from 'remult';
import { Artist } from '../../../shared/artist';
import { Button } from '../../../components/ui/button';


const repo = remult.repo<Artist>(Artist);

export default function ArtistOverview() {
  const router = useRouter();
  const [artist, setArtists] = useState<Artist[]>([]);
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
  useEffect(() =>
    {repo.find({}).then(artists => setArtists(artists))} , [remult]);
  let entries = artist.map(artist =>
    [artist.id, artist, artist.thumbnail,
      artist.firstName, artist.lastName,
      artist.bio, artist.birthDate, artist.deathDate,
      artist.birthLocation, artist.deathLocation,
      artist.notes, artist.artworks, artist.exhibitions]);
    const data = Object.fromEntries(entries);
 
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div className="bg-red-200 p-4 text-center">Overview Placeholder</div>
          <div className="bg-yellow-200 p-4 text-center">Add New Placeholder</div>
        </div>
        <div className="bg-purple-200 p-4 text-center">Search Placeholder</div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
