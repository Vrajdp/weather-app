import { motion } from 'framer-motion';
import React from 'react';

export default function MainWeatherDisplay({ weatherData, isDayTime }) {
  const textColor = isDayTime ? 'text-black' : 'text-white';

  return (
    <motion.div
      className="text-center mt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-3xl ${textColor}`}>{weatherData.location}</h2>
      <motion.div className={`text-6xl ${textColor}`} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        {weatherData.temperature}°C
      </motion.div>
      <div className={`text-xl ${textColor}`}>{weatherData.condition}</div>
      <motion.img
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt="Weather Icon"
        className="mx-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
