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
import Logo from "../public/images/logo-w.png";
import React from 'react';


const userRepo = remult.repo(User);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
              router.push('/u/artists');
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
      <div className="w-1/2 bg-transparent" />
      <div className="w-1/2 flex flex-none justify-center bg-transparent">
        <div className="w-full max-w-lg flex flex-col items-center bg-b p-12 shadow-xl">
          <div className="m-12 mb-32">
            <Image alt="RHAMS logo" src={Logo} width={250} height={250} />
          </div>
          <form onSubmit={login} className="w-full px-12">
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
                    className="text-sm text-c"> Remember Me </label>
              </div>
              <button onClick={() => router.push('/forgot-password')} className="text-sm text-c hover:text-a">Forgot Password?</button>
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