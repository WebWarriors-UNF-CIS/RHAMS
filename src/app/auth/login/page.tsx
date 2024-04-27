"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckIcon } from "@radix-ui/react-icons"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { signIn, SignInResponse } from 'next-auth/react';
import Image from "next/image";
import Logo from "../../../public/images/logo-w.png";
import React from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>
    {
      e.preventDefault(); // Prevent default form submission

      // Try to sign in and handle possible undefined result
      const result: SignInResponse | undefined = await signIn('credentials', 
      {
        redirect: false,
        email,
        password,
      });
      
      // Check if the result is defined and handle the result
      if (result) 
      {
        if (result.error) 
          {
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>
                Your username or password is invalid. Please try again.
              </AlertDescription>
            </Alert>
          } 
          else 
          {
            <Alert>
              <CheckIcon className="h-4 w-4" />
              <AlertTitle>Login Successful!</AlertTitle>
            </Alert>
            router.push('/u/artists'); // Redirect on successful login
          }
      }
  };
  return (
    <div className="flex flex-none h-screen object-contain bg-no-repeat bg-cover bg-center bg-fixed bg-[url('../public/images/abstract-women.jpg')]">
      <div className="w-1/2 bg-transparent"/>
      <div className="w-1/2 flex flex-none justify-center bg-transparent">
        <div className="w-full max-w-lg flex flex-col items-center bg-b p-12 shadow-xl">
          <div className="m-12 mb-32">
            <Image src={Logo} alt="RHA-Logo" width={250} height={250} />
          </div>
          <form onSubmit={handleLogin} className="w-full px-12">
            <div className="mb-12">
              <label htmlFor="email" className="block text-c text-sm font-bold mb-2">Username</label>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder='me@domain.com'
                onChange={(e) => setEmail(e.target.value)}
                className="input bg-input border border-border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-12">
              <label htmlFor="password" className="block text-c text-sm font-bold mb-2">Password</label>
              <Input
                type="password"
                id="password"
                placeholder='********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input bg-input border border-border rounded-lg py-2 px-3 mb-3 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div className="flex items-center justify-between px-2 mb-12">
              <div className="flex flex-none items-center space-x-2">
                  <Checkbox id="rememberme" />
                  <label
                    htmlFor="rememberme"
                    className="text-sm text-c"> Remember Me 
                  </label>
              </div>
              <button onClick={() => router.push('/login/')} className="text-sm text-c hover:text-a">Forgot Password?</button>
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit" className="bg-a py-2 px-16 rounded text-c">
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 