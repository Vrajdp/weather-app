// src/app/page.js
'use client';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { useState } from 'react';

export default function Page() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    if (!city.trim()) return;  // Make sure empty input isn't processed
    setLoading(true);
    setError('');
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;  // Assume you have set this in your environment variables
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      setWeather(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError(error.message);  // Set the error state
      setWeather(null);  // Ensure weather is reset if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={fetchWeather} />
      {loading ? <p>Loading...</p> : <WeatherDisplay weather={weather} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
