const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function fetchWeatherData(city = '', lat = null, lon = null) {
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

  if (lat && lon) {
    url += `&lat=${lat}&lon=${lon}`;
  } else if (city) {
    url += `&q=${city}`;
  } else {
    throw new Error('City or coordinates must be provided');
  }

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return {
    location: `${data.name}, ${data.sys.country}`,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind_speed: Math.round(data.wind.speed),
    wind_deg: data.wind.deg,
    high: Math.round(data.main.temp_max),
    pressure: data.main.pressure,
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    cloudiness: data.clouds.all,
    uv_index: 5, // Placeholder for UV index
  };
}
