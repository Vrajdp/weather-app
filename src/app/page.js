'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import News from './components/News'; // Import the News component

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    fetchWeather('Calgary');
  }, []);

  const fetchWeather = async (city = '', lat = null, lon = null) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      console.error("API key not found. Make sure it's correctly set in .env.local");
      setError('API key is missing. Please configure it in .env.local.');
      return;
    }

    if (!city && !lat && !lon) return;
    setLoading(true);
    setError('');

    let url = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&units=metric`;

    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      try {
        const locationResponse = await fetch(locationUrl);
        if (!locationResponse.ok) {
          throw new Error(`Location error: ${locationResponse.status} ${locationResponse.statusText}`);
        }
        const locationData = await locationResponse.json();
        if (locationData.cod !== 200) {
          throw new Error(locationData.message);
        }
        const { lat, lon } = locationData.coord;
        url += `&lat=${lat}&lon=${lon}`;
      } catch (error) {
        console.error('Failed to fetch location data:', error);
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather data error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message);
      }
      setWeatherData(data);
      checkDayTime(data.current);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const checkDayTime = (current) => {
    const currentTime = new Date().getTime();
    setIsDayTime(currentTime > current.sunrise * 1000 && currentTime < current.sunset * 1000);
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather('', latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className={`min-h-screen ${isDayTime ? 'bg-blue-200' : 'bg-gray-800'} text-gray-900`}>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <SearchBar onSearch={(city) => fetchWeather(city)} onLocationClick={handleLocationClick} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && (
          <>
            <WeatherDetails details={weatherData.current} />
            <HourlyForecast data={weatherData.hourly} />
            <DailyForecast data={weatherData.daily} />
            <News /> {/* Add the News component */}
          </>
        )}
      </div>
    </div>
  );
}
