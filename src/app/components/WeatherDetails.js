// src/app/components/WeatherDetails.js
export default function WeatherDetails({ details }) {
    return (
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">Humidity</h3>
            <p>{details.humidity}%</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">Wind Speed</h3>
            <p>{details.wind} km/h</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">High/Low</h3>
            <p>{details.high}°C / {details.low}°C</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">Pressure</h3>
            <p>{details.pressure} hPa</p>
          </div>
        </div>
      </div>
    );
  }
  