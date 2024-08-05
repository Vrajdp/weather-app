// src/app/page.js
'use client';

import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherAlert from './components/WeatherAlert';
import MainWeatherDisplay from './components/MainWeatherDisplay';
import WeatherDetails from './components/WeatherDetails';

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    if (!city.trim()) return;  // Ensure input isn't empty
    setLoading(true);
    setError('');
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      const processedData = {
        location: `${data.name}, ${data.sys.country}`,
        icon: data.weather[0].icon,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        pressure: data.main.pressure,
      };
      setWeatherData(processedData);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <WeatherAlert alertMessage="Severe Thunderstorm Watch" />
      <div className="container mx-auto px-6">
        <SearchBar onSearch={fetchWeather} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && (
          <>
            <MainWeatherDisplay weatherData={weatherData} />
            <WeatherDetails details={weatherData} />
          </>
        )}
      </div>
    </div>
  );
}
