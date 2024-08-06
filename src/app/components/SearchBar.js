// src/app/components/SearchBar.js
import React, { useState } from 'react';

export default function SearchBar({ onSearch, onLocationClick }) {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="px-4 py-2 border rounded-lg w-2/3"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-700"
      >
        Search
      </button>
      <button
        onClick={onLocationClick}
        className="bg-green-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-700"
      >
        Use Current Location
      </button>
    </div>
  );
}
