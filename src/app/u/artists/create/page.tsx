"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { remult, repo } from 'remult';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { PlusIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Artist } from '../../../../shared/artist';

const formSchema = z.object
({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  birthDate: z.string().optional(),
  birthLocation: z.string().optional(),
  deathDate: z.string().optional(),
  deathLocation: z.string().optional(),
  placesLived: z.string().optional(),
  thumbnail: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  exhibitions: z.string().optional(),
  notes: z.string().optional(),
});

export default function CreateArtist() 
{
  const router = useRouter();
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split('/');
      const slugTitle = parts.length >= 4 ? `${reformatTitle(parts[3])} ${reformatTitle(parts[2])}` : null;
      setSlug(slugTitle);
    }
  }, [pathname]);

  const reformatTitle = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      birthLocation: '',
      deathDate: '',
      deathLocation: '',
      placesLived: '',
      thumbnail: '',
      website: '',
      bio: '',
      notes: '',
    },
  });

  const artistRepo = remult.repo(Artist);

  const onSubmit = async (data: z.infer<typeof formSchema>) => 
    {
      try {
        data.thumbnail = imageUrl;
        // Creating a new artist record using remult's repository
        const newArtist = await artistRepo.insert
        ({
          firstName: data.firstName,
          lastName: data.lastName,
          birthLocation: data.birthLocation,
          deathLocation: data.deathLocation,
          thumbnail: data.thumbnail,
          website: data.website,
          bio: data.bio,
          notes: data.notes,
        });

        router.push('/u/artists'); // Redirect to artist list after saving
      } catch (error) {console.error("Error creating artist:", error)}
    };

  const imageLoader = ({ src }: { src: string }) => 
    { 
      if (imageUrl !== undefined && imageUrl !== '') {return imageUrl;}
      else {return `https://via.placeholder.com/${src}`}
    }

  return (
    <div className="container w-full px-4">
      <h1 className="text-4xl font-bold text-left my-8">{slug || 'Loading...'}</h1>
      <div className="flex mb-16 gap-4 w-full">
        <div className="flex flex-col items-center bg-white text-center">
          <div>
            {imageUrl ? (
              <Image src={imageUrl} alt="Uploaded Image" width={400} height={300} loader={imageLoader} />
            ) : (
              <Image src="400x300" alt="Placeholder" width={400} height={300} loader={imageLoader} />
            )}
          </div>
          <div className="max-w-md py-4 flex flex-col gap-4 w-5/6">
            <Input  type="file" onChange={(e) => setImageUrl(e.target.value)}/>
              <Button className="w-full">
                Upload
              </Button>
          </div>
        </div>

        <Form {...form}>
          <div className="bg-white p-6 w-2/3">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-left ml-2">Details</h2>
              <div className="text-sm text-destructive mr-8 mt-2">* Required</div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 px-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="placesLived"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Places Lived</FormLabel>
                        <FormControl>
                          <Input placeholder="Places Lived" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="birthLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Birth Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deathLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Death Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Death Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="exhibitions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exhibitions</FormLabel>
                        <FormControl>
                          <Input placeholder="Exhibitions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Additional notes"{...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="my-6">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Artist bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-8 flex justify-end space-x-4">
                  <Button type="submit" className="w-20">
                    <PlusIcon />
                  </Button>
                  
                  <Button variant="secondary" className="w-20" onClick={() => router.push('/u/artists')}>
                    <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};
