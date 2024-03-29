"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import Link from 'next/link';
import { User } from '../_shared/user';

const userRepo = remult.repo(User);

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const [hoverRow, setHoverRow] = useState<number | null>(null);
    
    useEffect(() => { userRepo.find().then(setUsers) }, []);

    return (
        <main className='mx-8 h-full'>
            <Link href="/users/create"><button className="absolute right-4 top-20 btn-green">Add User</button></Link>
            <h1 className="margin-auto my-8 text-3xl text-black ">Manage Users</h1>
            <table className="w-10/12 mt-3 border-collapse border-black table-auto">
                <thead className="bg-slate-200">
                    <tr className="border-solid text-left font-bold text-xl">
                        <th className='px-1'>Name</th>
                        <th className='px-1'>Email</th>
                        <th className='px-1'>Roles</th>
                        <th className='px-1 text-center'>Update</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-50">
                    {users.map((user) => (
                        <tr 
                            className="border border-solid even:bg-slate-100" 
                            key={user.id}
                            style={{ backgroundColor : hoverRow === user.id ? '#f0f0f0' : 'inherit' }}
                            onMouseEnter={() => setHoverRow(user.id)}
                            onMouseLeave={() => setHoverRow(null)}
                        >
                            <td className='px-1'>{user.name}</td>
                            <td className='px-1'>{user.email}</td>
                            <td className='px-1'>{user.roles}</td>
                            <td className='px-1 text-center underline cursor-pointer'><span className="px-1" onClick={() => router.push(`users/${user.name}`)}>View</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>

    );
}