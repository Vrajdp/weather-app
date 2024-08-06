'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherAlert from './components/WeatherAlert';
import MainWeatherDisplay from './components/MainWeatherDisplay';
import WeatherDetails from './components/WeatherDetails';

export default function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDayTime, setIsDayTime] = useState(true);

  // Fetch weather for the default city on initial load
  useEffect(() => {
    fetchWeather('Calgary');
  }, []);

  const fetchWeather = async (city = '', lat = null, lon = null) => {
    if (!city && !lat && !lon) return; // Avoid processing empty inputs
    setLoading(true);
    setError('');
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${city}`;
    }

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
        wind_speed: Math.round(data.wind.speed),
        wind_deg: data.wind.deg,
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        pressure: data.main.pressure,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        cloudiness: data.clouds.all,
        uv_index: 5, // Placeholder for UV index
      };
      setWeatherData(processedData);
      checkDayTime(processedData);
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
      alert('Geolocation is not supported by your browser');
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

  const checkDayTime = (data) => {
    const currentTime = new Date().getTime();
    setIsDayTime(currentTime > data.sunrise.getTime() && currentTime < data.sunset.getTime());
  };

  return (
    <div className={`min-h-screen ${isDayTime ? 'bg-blue-200' : 'bg-gray-800'} transition-colors duration-500`}>
      <Header />
      <WeatherAlert alertMessage="Severe Thunderstorm Watch" />
      <div className="container mx-auto px-6">
        <SearchBar onSearch={(city) => fetchWeather(city)} onLocationClick={handleLocationClick} />
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
