"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '@/shared/user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckIcon } from "@radix-ui/react-icons"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Image from "next/image";
import Logo from "../../public/images/logo-w.png";
import React from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import e from 'express';
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"


const userRepo = remult.repo(User);

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
  
})

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = () => {}
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema)});
    defaultValues: {
      email: ''
      password: ''
      passwordConfirm: ''
    }
    
  const login = async (e: React.FormEvent) => 
    {
    e.preventDefault();
    try 
    {
        userRepo.findFirst({ email: email, password: password }).then((user) => {
            if (user) {
              <Alert>
                <CheckIcon className="h-4 w-4" />
                <AlertTitle>Login Successful!</AlertTitle>
              </Alert>
              router.push('../u/artists');
            } else {
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>
                  Your username or password is invalid. Please try again.
                </AlertDescription>
              </Alert>
            }
        });
    } 
    catch (err) 
    {<Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Login Failed</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again.
      </AlertDescription>
    </Alert>}
  };  
  return (
    <div className="flex flex-none h-screen object-contain bg-no-repeat bg-cover bg-center bg-fixed bg-[url('../public/images/abstract-women.jpg')]">
      <div className="w-1/2 bg-transparent"/>
      <div className="w-1/2 flex flex-none justify-center bg-transparent">
        <div className="w-full max-w-lg flex flex-col items-center bg-b p-12 shadow-xl">
          <div className="m-12 mb-32">
            <Image src={Logo} alt="RHA-Logo" width={250} height={250} />
          </div>
          <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="block text-c text-sm font-bold mb-2">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="me@domain.com"
                        type="email"
                        {...field}
                        className="input bg-input border border-border rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="block text-c text-sm font-bold mb-2">Password</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder="********" 
                      type="password" 
                      {...field} 
                      className="input bg-input border border-border rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:ring"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center justify-between px-2 mb-12">
            <div className="flex flex-none items-center space-x-2">
                <Checkbox id="rememberme" />
                <label
                  htmlFor="rememberme"
                  className="text-sm text-c"> Remember Me 
                </label>
            </div>
            <button onClick={() => router.push('/u/artists')} className="text-sm text-c hover:text-a">Forgot Password?</button>
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit" className="bg-a px-16 rounded text-c">
              Log In
            </Button>
          </div>
          </form>
        </Form>
        </div>
      </div>
    </div>
  );
} 