import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { PersonIcon, GearIcon,  ExitIcon } from '@radix-ui/react-icons';
import Image from "next/image";
import Logo from "../public/images/logo-w.png";
import { DropdownMenu, DropdownLink } from './ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const pathname = usePathname();

  const User = () => <PersonIcon className="inline w-4 h-4 mx-2"/>;
  const Gear = () => <GearIcon   className="inline w-4 h-4 mx-2"/>;
  const Exit = () => <ExitIcon   className="inline w-4 h-4 mx-2"/>;

  const isActive = (path: string) => {
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;

    // Split paths into segments
    const pathnameSegments = normalizedPathname.split('/').filter(Boolean);
    const pathSegments = normalizedPath.split('/').filter(Boolean);

    // Check if the first segment after `/u/` in both pathname and path are the same
    // Assuming `/u/` is always present and it is immediately after the host part of the URL
    return pathnameSegments[1] === pathSegments[1];
  };

  return (
    <>
      <nav className="bg-c shadow-md">
        <div className="mx-auto lg:mx-20 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-8">
            <a href="/u/artists"     className={`text-center font-medium text-f hover:text-b px-2 w-18 ${isActive('/u/artists')     ? 'border-b-b border-b-2' : ''}`}>Artists</a>
            <a href="/u/artworks"    className={`text-center font-medium text-f hover:text-b px-2 w-22 ${isActive('/u/artworks')    ? 'border-b-b border-b-2' : ''}`}>Artworks</a>
            <a href="/u/exhibitions" className={`text-center font-medium text-f hover:text-b px-2 w-24 ${isActive('/u/exhibitions') ? 'border-b-b border-b-2' : ''}`}>Exhibitions</a>
            <a href="/u/collections" className={`text-center font-medium text-f hover:text-b px-2 w-24 ${isActive('/u/collections') ? 'border-b-b border-b-2' : ''}`}>Collections</a>
            <a href="/u/media"       className={`text-center font-medium text-f hover:text-b px-2 w-18 ${isActive('/u/media')       ? 'border-b-b border-b-2' : ''}`}>Media</a>
          </div>
          <div className="relative">
            <DropdownMenu title="Account">
              <DropdownLink name="Current User"  url="/u/users/profile"  type="default"     icon={User} />
              <DropdownLink name="User Settings" url="/u/users"          type="default"     icon={Gear} />
              <DropdownLink name="Logout"        url="../login"          type="destructive" icon={Exit} />
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="bg-b w-full h-36 flex items-center justify-center">
        <Image src={Logo} alt="RHA-Logo" width={200} height={200} />
      </div>
    </>
  );
};

export default Navbar;
