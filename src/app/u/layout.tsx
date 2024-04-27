"use client";
import Navbar from '../../components/navbar';
 /* 
    Set up title metadata for the /u/ pages
    import type { Metadata } from "next";


    export const metadata: Metadata = 
    {
    title: "[...slug]", 
    };
*/
export default function NavbarLayout
({children,}: {children: React.ReactNode;}) 
{
    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    );
}
