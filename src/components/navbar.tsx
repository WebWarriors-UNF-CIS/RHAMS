import React from 'react';
// Assuming you have icons or images for the dropdown arrow
// import DropdownIcon from './path-to-dropdown-icon.svg'; // Uncomment and set the path to your icon

const Navbar = () => {
  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="/u/art" className="text-gray-700 hover:text-gray-900">Art</a>
          <a href="/u/artists" className="text-gray-700 hover:text-gray-900">Artists</a>
          <a href="/u/exhibitions" className="text-gray-700 hover:text-gray-900">Exhibitions</a>
          <a href="/u/collections" className="text-gray-700 hover:text-gray-900">Collections</a>
          <a href="/u/media" className="text-gray-700 hover:text-gray-900">Media</a>
        </div>
        <div className="relative">
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            My Account
            {/* Uncomment below when you add the icon image */}
            {/* <img src={DropdownIcon} alt="Dropdown" className="ml-2" /> */}
          </button>
          {/* Dropdown menu, hidden by default; toggle the 'hidden' class to show it */}
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl hidden">
            <a href="/u/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
            <a href="/u/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
            <a href="/u/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
