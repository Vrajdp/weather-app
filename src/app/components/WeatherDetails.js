// src/app/components/WeatherDetails.js

export default function WeatherDetails({ details }) {
  // Define minimum and maximum pressure values for scaling the bar
  const minPressure = 950; // in hPa, approximate low end of atmospheric pressure
  const maxPressure = 1050; // in hPa, approximate high end of atmospheric pressure

  // Calculate the percentage fill for the pressure bar
  const pressurePercentage = ((details.pressure - minPressure) / (maxPressure - minPressure)) * 100;

  // Compass directions
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const direction = directions[Math.round(details.wind_deg / 45) % 8];

  // Simulating a UV index value (for demonstration)
  // You might need to fetch this from another API or use a different source
  const uvIndex = details.uv_index || 5; // Assume a moderate UV index value

  // Determine the color based on the UV index
  const uvColor = () => {
    if (uvIndex <= 2) return 'bg-green-500';
    if (uvIndex <= 5) return 'bg-yellow-500';
    if (uvIndex <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-6 animate-fade-in">
      <div className="text-center text-lg font-semibold mb-4">
        {details.location} - {details.temperature}°C, {details.condition}
      </div>
      <div className="flex flex-wrap justify-around items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <p className="text-center font-bold">Temperature Details</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p>Feels Like: {details.feels_like}°C</p>
            <p>Humidity: {details.humidity}%</p>
            <p>Cloudiness: {details.cloudiness}%</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
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
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <p className="text-center font-bold">Pressure</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="absolute top-0 left-0 bg-blue-500 h-full"
                style={{ width: `${pressurePercentage}%` }}
              ></div>
            </div>
            <p className="text-center mt-2">{details.pressure} hPa</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <p className="text-center font-bold">UV Index</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${uvColor()}`}
                style={{ width: `${(uvIndex / 11) * 100}%` }} // Assuming a scale from 0 to 11
              ></div>
            </div>
            <p className="text-center mt-2">{uvIndex} {uvIndex <= 2 ? '(Low)' : uvIndex <= 5 ? '(Moderate)' : '(High)'}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <p className="text-center font-bold">Sunrise & Sunset</p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p>Sunrise: {details.sunrise.toLocaleTimeString()}</p>
            <p>Sunset: {details.sunset.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
