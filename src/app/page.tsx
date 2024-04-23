"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '../shared/user';
import Image from "next/image";
import React from 'react';
import Link from 'next/link';

const userRepo = remult.repo(User);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        userRepo.findFirst({ email: email, password: password }).then((user) => {
            if (user) {
              alert('Login successful');
              router.push('/artist');
            } else {
                alert('Login failed');
            }
        });
    } catch (err) {
        alert('Login failed');
    }
  };  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex w-1/2 bg-cover" style={{ backgroundImage: 'url()' }}>
        <Image
          src=""
          alt="Artwork"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <div className="flex w-1/2 justify-center items-center bg-white">
        <form onSubmit={login} className="max-w-xs w-full">
          <h2 className="text-4xl font-bold mb-6">Log In</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='me@domain.com'
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm">Remember Me</span>
            </label>
            <Link href="#" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">Forgot Password?</Link>
          </div>
          <button  onClick={() => router.push('./artworks')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
            Log In
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
