// src/app/components/WeatherDisplay.js
export default function WeatherDisplay({ weather }) {
    if (!weather) return <p className="text-center mt-4">No weather data available.</p>;
  
    return (
      <div className="mt-4 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-blue-600">{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    );
  }
  