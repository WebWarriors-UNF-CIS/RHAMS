"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import e from 'express';
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  dateOfBirth: z.date(),
  birthLocation: z.string(),
  dateOfDeath: z.date(),
  deathLocation: z.string(),
  placesLived: z.string(),
  imageURL: z.string(),
  website: z.string(),
  bio: z.string(),
  notes: z.string(),
})

export default function CreateArtist() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}
  const handleSubmit = () => {}
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema)});
    defaultValues: {
      firstName: ''
      lastName: ''
      dateOfBirth: ''
      birthLocation: ''
      dateOfDeath: ''
      deathLocation: ''
      placesLived: ''
      imageURL: ''
      website: ''
      bio: ''
      notes: ''
    }
  

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
      <div className="flex gap-4">
        {/* Image Upload Placeholder */}
        <div className="flex flex-col items-center bg-gray-200 p-4 w-1/4 text-center">
          <div className="bg-gray-400 p-24 mb-4">Image Placeholder</div>
          <div className="bg-green-200 p-2 w-full">Upload Button Placeholder</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
            <FormField 
              control={form.control} 
              name="firstName" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />
            
            <FormField 
              control={form.control} 
              name="lastName" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
              />
            <FormField 
              control={form.control} 
              name="dateOfBirth" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />






                  <Button type="submit" className="w-full">Submit</Button>
                </form>
        </Form>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/artworks')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/artists')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
