import { useContext, useState } from "react";
import WeatherContext from "../WeatherContext"; // Import the WeatherContext

const Weather = () => {
  const { city, setCity, weather, loading, error, fetchWeather } =
    useContext(WeatherContext);

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && !loading && !error && (
        <div>
          <h2>{weather.name}</h2>
          <p>121312{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {/* You can add additional weather details here */}
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
