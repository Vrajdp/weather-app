// src/app/components/DailyForecast.js
import React from 'react';

const DailyForecast = ({ data }) => (
  <div className="py-4">
    <h2>Daily Forecast</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((day, index) => (
        <div key={index} className="p-4 bg-blue-100 rounded">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>High: {day.temp.max}°C, Low: {day.temp.min}°C</p>
        </div>
      ))}
    </div>
  </div>
);

export default DailyForecast;
