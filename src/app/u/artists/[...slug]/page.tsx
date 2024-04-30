"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import Head from 'next/head';
import { Artist } from '../../../../shared/artist';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const HelloWorld = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsData = await remult.repo(Artist).find();
        setArtists(artistsData);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      Artist Profile
      </h1>
      <div className="container mx-auto p-6">
      <div className="flex gap-4">
        {/* Image Upload Placeholder */}
        <div className="flex flex-col items-center bg-gray-200 p-4 w-1/4 text-center">
          <div className="bg-gray-400 p-24 mb-4">Image Placeholder</div>
        {/*//////////////////////////////////////////// Image Upload Placeholder//////////////////////////////////// */}
        </div>
        
        <div className="bg-white p-4">{/* detail section to the right of photo */}
        
       
        <div className="grid grid-cols-3 gap-4">
          
          
          {/*//////////////////////////////////////////// Start of Column 1//////////////////////////////////// */}

          <div className="space-y-4">
            
            

            
            </div>{/* end of column 1 */}
          {/*//////////////////////////////////////////// Start of Column 2//////////////////////////////////// */}

            <div className="space-y-4">
            



            </div>{/*end of column 2 */}



            {/*//////////////////////////////////////////// Start of Column 3//////////////////////////////////// */}
            <div className="space-y-4">
            


            
            </div>
            </div>{/*end of column 3 */}
        {/*//////////////////////////////////////////// Bottom Section//////////////////////////////////// */}
           
        <div className="mb-4">
          
          
        </div>
            <div className="mt-4 flex justify-center md:justify-end">
              <Button type="submit" className="">
                      Save Record
              </Button>
            </div>
                
                
          </div>
                
        
        
        </div>
      </div>
    </div>
  );
};

export default HelloWorld;