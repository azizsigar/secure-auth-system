import { useContext } from "react";
import WeatherContext from "../WeatherContext";

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
      addLikedCountry(weather.sys.country); // Add country to liked countries
    }
  };

  // Helper function to get the emoji based on weather description
  const getWeatherEmoji = (description) => {
    if (description.toLowerCase().includes("cloud")) {
      return "☁️"; // Cloudy weather emoji
    } else if (description.toLowerCase().includes("clear")) {
      return "☀️"; // Clear sky emoji
    } else if (description.toLowerCase().includes("rain")) {
      return "🌧️"; // Rainy weather emoji
    } else if (description.toLowerCase().includes("snow")) {
      return "❄️"; // Snowy weather emoji
    } else if (description.toLowerCase().includes("thunder")) {
      return "⚡"; // Thunderstorm emoji
    }
    return "🌥️"; // Default emoji for other weather
  };

  return (
    <div>
      <h3>Weather App</h3>

      {/* Custom Input Field */}
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </div>

      {/* Custom "Like" Button */}
      <button className="shadow__btn" onClick={handleSearch}>
        {loading ? "Searching..." : "Like this City"}
      </button>

      {/* Weather Information */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && !loading && !error && (
        <div>
          <h2>{weather.name}</h2>
          <p>
            {weather.weather[0].description}{" "}
            {getWeatherEmoji(weather.weather[0].description)}
          </p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
