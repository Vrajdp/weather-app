// src/app/components/HourlyForecast.js
import React from 'react';

export default function HourlyForecast({ data }) {
  const hours = data.slice(0, 8); // Limit to the next 8 hours

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-center">Hourly Forecast</h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 text-center">
        {hours.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="h-12 w-12"
            />
            <p>{Math.round(hour.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
