import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import WeatherEmoji from "./WeatherEmoji";

const Weather = () => {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchWeather,
    addLikedCountry,
  } = useContext(WeatherContext);

  const handleSearch = () => {
    fetchWeather();
    if (weather && weather.sys && weather.sys.country) {
      addLikedCountry(weather.sys.country);
    }
  };

  return (
    <div>
      <h3>Weather App</h3>

      <div className="input-container">
        <input
          className="input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </div>

      <button className="shadow__btn" onClick={handleSearch}>
        {loading ? "Searching..." : "Like this City"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && !loading && !error && (
        <div>
          <WeatherEmoji />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
