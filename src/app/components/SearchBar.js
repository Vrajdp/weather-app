// src/app/components/SearchBar.js
import { motion } from 'framer-motion';
import React from 'react';

export default function SearchBar({ onSearch, onLocationClick }) {
  const [city, setCity] = React.useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <motion.input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="px-4 py-2 border rounded-l-md"
        whileFocus={{ scale: 1.05 }}
      />
      <motion.button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>
      <motion.button
        onClick={onLocationClick}
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Use Current Location
      </motion.button>
    </div>
  );
}
