// src/app/components/MainWeatherDisplay.js
export default function MainWeatherDisplay({ weatherData }) {
  return (
    <div className="bg-blue-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-xl font-bold text-gray-700">{weatherData.location}</h2>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Weather Icon"
              className="h-16 w-16"
            />
            <div className="ml-4">
              <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
              <p className="text-gray-700 capitalize">{weatherData.condition}</p>
              <p className="text-sm text-gray-600">Feels like: {weatherData.feels_like}°C</p>
            </div>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-md">
            <p className="text-lg font-semibold">Tornado chance with severe storms Monday</p>
          </div>
        </div>
      </div>
    </div>
  );
}
