"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '../_shared/user';
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
    }

    return (
    <div className="flex flex-col items-center mx-auto mt-10">
      <h1 className='dark:text-white margin-auto text-3xl font-semibold mb-6'>Login</h1>
      <form onSubmit={login} className='!flex flex-col'>
        <div className='input'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='johndoe@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button type="submit" className="btn-green">Login</button>
          <button type="button" className="btn-gray" onClick={() => router.push('./users/create')}>Back</button>
        </div>
        <Link href="/reset" className='hover:text-blue-600 dark:text-white'>Forgot your password?</Link>
      </form>
    </div>
    );
}
