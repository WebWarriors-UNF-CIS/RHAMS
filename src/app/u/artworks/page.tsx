"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';
import { columns } from "../../../components/ui/columns/artist-overview";
import { DataTable } from "../../../components/ui/data-table";
import { remult, EntityFilter} from 'remult';


import { Artwork } from '../../../shared/artwork';
const repo = remult.repo<Artwork>(Artwork);

export default function ArtworksOverview() 
{
  const router = useRouter();
  const [artwork, setArtworks] = useState<Artwork[]>([]);
  const [slug, setSlug] = useState<string>('');
  const [selected, setSelected] = useState(false);
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://picsum.photos/${src}`}

  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1);}
  function search()
  {return console.log('searching...')} //Inmplement search functionality

  useEffect(() => 
    {if (pathname) { const parts = pathname.split('/'); setSlug(reformatTitle(parts[2]) + ' ')}}, [pathname]);
  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[2]) + ' ');
    }
  }, [pathname]);

  useEffect(() =>
    {repo.find({}).then(artworks => setArtworks(artworks))} , [remult]);

  let entries = artwork.map(artworks => 
    [ artworks.id, artworks.title, artworks.artist, artworks.releaseDate, artworks.thumbnail, artworks.description, artworks.types, artworks.mediums, artworks.measurements, artworks.notes, artworks.inPortfolioBook, artworks.numEditions ]);
    const data = Object.fromEntries(entries);
    
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl text-b font-bold text-left ml-5 my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex">
          <div className="self-end text-b text-left text-lg font-semibold mx-2 border-b-b border-b-2 h-10">
            Overview
          </div>
          <div className={`self-end text-lg pl-4 pr-2 text-center h-10 ${ selected ? 'text-f' : 'text-e' }`}>
            Add New
          </div>
          <Button className="self-end mb-3" variant='defaultCirclular' size='icon'
            onMouseEnter={() => setSelected(true)}
            onMouseLeave={() => setSelected(false)}
            onClick={() => router.push('./artworks/create')}>
          <PlusIcon className='h-5 w-5'/></Button>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input className='bg-white' type="search" placeholder="Search Artworks" />
          <Button variant={'secondary'} onClick={search}>
          <MagnifyingGlassIcon className='h-5 w-5'/></Button>
        </div>
      </div>
      <div className="border-t border-t-d h-96 pt-4 text-center w-full">
      <DataTable columns={columns} data={data}/>
      </div>
      </div>
    </div>
  );
};