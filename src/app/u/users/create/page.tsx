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
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  role: z.enum(['admin', 'guest']),
  email: z.string().email(),
  password: z.string().nonempty(),
  passwordHash: z.string().nonempty(),
 
})

export default function CreateUserAccount() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}
  const handleSubmit = () => {}
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: 'admin',
      email: '',
      password: '',
      passwordHash: '',
    }
  });

  function reformatTitle(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[3]) + ' ' + reformatTitle(parts[2]) );
    }
  }, [pathname]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>

       <div className="container mx-auto p-6">
        
      {/* Collection Detail Form Section */}
      <Form {...form}>
      <div className="bg-white p-4">
      <form onSubmit={form.handleSubmit(handleSubmit)}
     className="">
      <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4">
          <FormField 
            control={form.control} 
            name="firstName" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="first name" type="string"{...field} />
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
                          <Input placeholder="last name" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />
          </div>{/* end of column 1 */}
                  {/*////////////////////////////////////start of column 2//////////////////////////////////////////////////////////// */}
          <div className="space-y-4">
          
          <FormField 
            control={form.control} 
            name="role" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input placeholder="role" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

            <FormField 
            control={form.control} 
            name="email" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

          </div>
          {/*///////////////////////////////////////////////////////////////Start of Column 3///////////////////////////////////////////////////// */}
          <div className="space-y-4">
                      
          <FormField 
            control={form.control} 
            name="password" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

          <FormField 
            control={form.control} 
            name="passwordHash" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />
          
          </div> {/*end of column 3 */}
          </div>{/*end of grid */}

          {/* Biographies and Notes are full width and stacked */}
      
      <div className="mt-4 flex justify-center md:justify-end">
        <Button type="submit" className="">
          Save Record
        </Button>
      </div>
              </form>
              
              </div>
              
      </Form>
      
    
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
