// src/app/components/Header.js
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <img src="/your-logo.png" alt="Logo" className="h-10" />
        <nav className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Weather
          </Link>
          <Link href="/pages/maps" className="hover:underline">
            Maps
          </Link>
          <Link href="/pages/news" className="hover:underline">
            News
          </Link>
          <Link href="/pages/video" className="hover:underline">
            Video
          </Link>
        </nav>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 border rounded-md"
          />
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
            ASSISTANT
          </button>
        </div>
      </div>
    </header>
  );
}
