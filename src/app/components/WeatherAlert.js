// src/app/components/WeatherAlert.js
export default function WeatherAlert({ alertMessage }) {
    return (
      <div className="bg-red-600 text-white text-center py-2">
        <span>{alertMessage}</span>
      </div>
    );
  }
  