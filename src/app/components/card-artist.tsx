import React from 'react';
import { Artist } from '../shared/artist';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { remult } from 'remult';
import Modal from 'react-modal';
import '../globals.css'


interface ArtistCardProps 
{
  artist: Artist;
  revalidate: 1;
}

const artistRepo = remult.repo(Artist);

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => 
{
    const router = useRouter();
    const handleCardClick = () => {
        router.push('./view');
     };
     const deleteArtist = (event: { stopPropagation: () => void; }) => 
     {
        event.stopPropagation();
        artistRepo.delete(artist);
        window.location.reload();
     }
    return (
        <div className="artist-card my-10" onClick={handleCardClick}>
            <h3>{artist.firstName} {artist.lastName}</h3><br/>
            <div className="flex justify-center">
                <a href="../artists/viewArtist"><button className="btn-green mx-5">
                View
                </button></a>
                <button className="btn-gray mx-5" onClick={deleteArtist}>Update</button>
                <button className="btn-red mx-5" onClick={deleteArtist}>Delete</button>
            </div>
        </div>
    );
};

export default ArtistCard;