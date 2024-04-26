"use client";
import Navbar from '../../components/navbar';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function uLayout({children,}: {children: React.ReactNode;}) {
    const segment = useSelectedLayoutSegment();

    return (
        <>
            <Navbar />
            <div key={segment}>
                {children}
            </div>
        </>
    );
}
