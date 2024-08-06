// src/app/components/MainWeatherDisplay.js

export default function MainWeatherDisplay({ weatherData }) {
  return (
    <div className="bg-blue-100 py-10 animate-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-xl font-bold text-gray-700">{weatherData.location}</h2>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.condition}
              className="w-20 h-20"
            />
            <div className="ml-4">
              <p className="text-3xl font-semibold">{weatherData.temperature}°C</p>
              <p className="text-gray-700 capitalize">{weatherData.condition}</p>
              <p className="text-sm text-gray-500">Feels like: {weatherData.feels_like}°C</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
            <p><strong>Pressure:</strong> {weatherData.pressure} hPa</p>
            <p><strong>Visibility:</strong> {weatherData.visibility} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
