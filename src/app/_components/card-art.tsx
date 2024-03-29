"use client" 
import { ArtPiece } from '../_shared/art';
import { Artist } from '../_shared/artist';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ArtCard({ art, showModal }: { art: ArtPiece, showModal: (id: number) => void}) {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => { setArtist(art.artist) }, [art.artist]);
  
  return (
    <div className='card min-h-[168px] grid gap-x-1 grid-cols-[auto_100px] grid-rows-[1.6rem_1.1rem_1.1rem_auto]' key={art.id} onClick={() => showModal(art.id)}>
      <h3 className='whitespace-pre'>{art.title}</h3>
      <div className="group relative row-span-3">
        {art.imageUrl && <Image src={art.imageUrl} width={100} height={100} alt={art.description} className='relative peer border border-black' priority={true} />}
        <p className='hidden group-hover:block absolute top-0 bg-slate-900/80 text-white p-1'>{art.description}</p>
      </div>
      <p>{artist?.name}</p>
    </div>
  )
}