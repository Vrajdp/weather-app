import React from 'react';

export default function HourlyForecast({ data }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-center mb-4">Hourly Forecast</h2>
      <div className="flex overflow-x-scroll">
        {data.map((hour, index) => (
          <div key={index} className="p-4 bg-blue-100 m-2 rounded-lg min-w-[150px] text-center">
            <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p>{Math.round(hour.temp)}°C</p>
            <p>{hour.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
