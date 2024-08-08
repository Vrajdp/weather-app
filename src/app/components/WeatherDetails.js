import { motion } from 'framer-motion';
import React from 'react';

export default function WeatherDetails({ details }) {
  const minPressure = 950;
  const maxPressure = 1050;
  const pressurePercentage = ((details.pressure - minPressure) / (maxPressure - minPressure)) * 100;

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const direction = directions[Math.round(details.wind_deg / 45) % 8];

  const uvIndex = details.uv_index || 5;

  const uvColor = () => {
    if (uvIndex <= 2) return 'bg-green-500';
    if (uvIndex <= 5) return 'bg-yellow-500';
    if (uvIndex <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg mt-6 animate-fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center text-lg font-semibold mb-4">
        {details.location} - {details.temperature}°C, {details.condition}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div className="p-4" whileHover={{ scale: 1.05 }}>
          <p className="text-center font-bold">Temperature Details</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p>Feels Like: {details.feels_like}°C</p>
            <p>Humidity: {details.humidity}%</p>
            <p>Cloudiness: {details.cloudiness}%</p>
          </div>
        </motion.div>

        <motion.div className="p-4" whileHover={{ scale: 1.05 }}>
          <p className="text-center font-bold">Wind</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p>Speed: {details.wind_speed} km/h</p>
            <p>Direction: {direction}</p>
            <div className="relative flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full shadow-inner mt-4 mb-2 mx-auto">
              <div
                className="absolute w-1 h-12 bg-red-500 transform origin-bottom"
                style={{ transform: `rotate(${details.wind_deg}deg)` }}
              ></div>
              <span className="absolute text-xs top-1 left-1/2 transform -translate-x-1/2">N</span>
              <span className="absolute text-xs right-1 top-1/2 transform -translate-y-1/2">E</span>
              <span className="absolute text-xs bottom-1 left-1/2 transform -translate-x-1/2">S</span>
              <span className="absolute text-xs left-1 top-1/2 transform -translate-y-1/2">W</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="p-4" whileHover={{ scale: 1.05 }}>
          <p className="text-center font-bold">Pressure</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bg-blue-500 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${pressurePercentage}%` }}
                transition={{ duration: 1 }}
              ></motion.div>
            </div>
            <p className="text-center mt-2">{details.pressure} hPa</p>
          </div>
        </motion.div>

        <motion.div className="p-4" whileHover={{ scale: 1.05 }}>
          <p className="text-center font-bold">UV Index</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full ${uvColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${(uvIndex / 11) * 100}%` }} // Assuming a scale from 0 to 11
                transition={{ duration: 1 }}
              ></motion.div>
            </div>
            <p className="text-center mt-2">{uvIndex} {uvIndex <= 2 ? '(Low)' : uvIndex <= 5 ? '(Moderate)' : '(High)'}</p>
          </div>
        </motion.div>

        <motion.div className="p-4" whileHover={{ scale: 1.05 }}>
          <p className="text-center font-bold">Sunrise & Sunset</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p>Sunrise: {details.sunrise.toLocaleTimeString()}</p>
            <p>Sunset: {details.sunset.toLocaleTimeString()}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
