// src/app/components/DailyForecast.js
import React from 'react';

export default function DailyForecast({ data }) {
  const days = data.slice(0, 7); // Limit to 7 days

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-center">7-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <p>{new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="h-16 w-16"
            />
            <p className="capitalize">{day.weather[0].description}</p>
            <p>
              <span className="font-bold">{Math.round(day.temp.min)}°C</span> - <span className="font-bold">{Math.round(day.temp.max)}°C</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
