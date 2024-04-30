"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import Head from 'next/head';
import { Artist } from '../../../../../shared/artist';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const artistRepo = remult.repo<Artist>(Artist);

const EditArtistPage = () => {
  const router = useRouter();
  const [artist, setArtist] = useState<Artist | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    }
  });

  useEffect(() => {
    const fetchArtist = async () => {
      if (router.isReady && router.query.id) {
        try {
          const artistId = router.query.id as string;
          const fetchedArtist = await artistRepo.findFirst({ id: artistId });
          if (fetchedArtist) {
            setArtist(fetchedArtist);
            reset(fetchedArtist); // Reset form with fetched artist data
          } else {
            console.error("No artist found with the ID:", artistId);
          }
        } catch (error) {
          console.error("Error fetching artist:", error);
        }
      }
    };
  
    fetchArtist();
  }, [router.isReady, router.query.id, reset]);
   

  const onSubmit = async (data) => {
    if (!artist) {
      console.error("Attempt to save an undefined artist object.");
      return;
    }

    try {
      await artistRepo.save({ ...artist, ...data });
      console.log("Artist updated successfully!");
      router.push('/u/artists'); // Navigate back to the artist list
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Artist</title>
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Edit Artist</h1>
        {artist ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField label="First Name" error={errors.firstName?.message}>
                <FormControl>
                  <Input {...register('firstName', { required: 'First name is required.' })} />
                </FormControl>
              </FormField>
              <FormField label="Last Name" error={errors.lastName?.message}>
                <FormControl>
                  <Input {...register('lastName', { required: 'Last name is required.' })} />
                </FormControl>
              </FormField>
            </div>
            <Button type="submit">Update Artist</Button>
          </form>
        ) : (
          <p>Loading artist data...</p>
        )}
      </div>
    </>
  );
};

export default EditArtistPage;
