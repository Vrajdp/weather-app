'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import { fetchWeatherData } from './api/weather'; // Make sure this path is correct

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch weather for the default city on initial load
  useEffect(() => {
    fetchWeather('Calgary');
  }, []);

  const fetchWeather = async (city = '', lat = null, lon = null) => {
    if (!city && !lat && !lon) return; // Avoid processing empty inputs
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeatherData(city, lat, lon);
      setWeatherData(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle click on location icon
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather('', latitude, longitude); // Fetch weather using geolocation
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <SearchBar onSearch={(city) => fetchWeather(city)} onLocationClick={handleLocationClick} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && <WeatherDetails details={weatherData} />}
      </div>
    </div>
  );
}
