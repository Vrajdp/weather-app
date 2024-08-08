import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <img src="/logo.png" alt="Logo" className="h-16" />
        <nav className="flex space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:underline"
          >
            <Link href="/">Weather</Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
