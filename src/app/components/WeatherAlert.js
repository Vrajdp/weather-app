
import React from 'react';

export default function WeatherAlert({ alertMessage }) {
  return (
    <div className="bg-red-600 text-white text-center py-2">
      {alertMessage}
    </div>
  );
}
