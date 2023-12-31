"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import '../globals.css'
import Link from 'next/link';
import { User } from '../shared/user';

const userRepo = remult.repo(User);

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchUsers() {
          const allUsers = await userRepo.find();
          setUsers(allUsers);
        }
        fetchUsers();
      }, []);

    return (
        <div>
            
            <div>
                <h1 className="margin-auto my-8 flex justify-center items-center text-3xl font-medium text-black ">Manage Users</h1>
            </div>
            <div className="mx-32">
                <Link href="/users/create"><button className="btn-green">Create User</button></Link>
            </div>
            <br></br>
            <table className="w-10/12 mx-32 border-collapse border-black table-fixed">
                <thead className="bg-slate-200">
                    <tr className="border-solid text-center font-bold text-xl">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="bg-slate-50">
                    <tr className="border border-solid text-center">
                        <td>1</td>
                        <td>John Doe</td>
                        <td>john@mail.com</td>
                        <td>admin</td>
                        <td><button className="btn-gray" onClick={() => router.push('users/manage')}>View</button></td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>2</td>
                        <td>Test</td>
                        <td>test@gmail.com</td>
                        <td>admin</td>
                        <td><button className="btn-gray" onClick={() => router.push('users/manage')}>View</button></td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>3</td>
                        <td>Test 2</td>
                        <td>test2@gmail.com</td>
                        <td>admin</td>
                        <td><button className="btn-gray" onClick={() => router.push('users/manage')}>View</button></td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>4</td>
                        <td>a</td>
                        <td>a@gmail.com</td>
                        <td>admin</td>
                        <td><button className="btn-gray" onClick={() => router.push('users/manage')}>View</button></td>
                    </tr>
                    <tr className="border border-solid text-center">
                        <td>5</td>
                        <td>test 3</td>
                        <td>test3@gmail.com</td>
                        <td>admin</td>
                        <td><button className="btn-gray" onClick={() => router.push('users/manage')}>View</button></td>
                    </tr>
                </tbody>
            </table>
  
            
        </div>

    );
}