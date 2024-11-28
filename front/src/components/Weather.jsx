import { useContext, useState } from "react";
import WeatherContext from "../WeatherContext"; // Import the WeatherContext

const Weather = () => {
  const { city, setCity, weather, loading, error, fetchWeather } =
    useContext(WeatherContext);
  const [rainbowPrediction, setRainbowPrediction] = useState(null); // Add a new state for rainbow prediction

  const handleSearch = () => {
    fetchWeather();
    predictRainbow();
  };

  // Function to check the rainbow conditions
  const predictRainbow = () => {
    if (weather) {
      const { clouds, rain, sys } = weather;
      const isRain = rain && rain["1h"] > 0; // Is there rain?
      const isCloudy = clouds.all > 50; // Is the cloud coverage over 50%?
      const isSunshine = sys.sunset && sys.sunrise; // Are the sunset and sunrise available?

      // Rainbow prediction
      if (isRain && !isCloudy && isSunshine) {
        setRainbowPrediction("You have a high chance of seeing a rainbow!");
      } else {
        setRainbowPrediction("You have a low chance of seeing a rainbow.");
      }
    }
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
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {/* Display the rainbow prediction */}
          {rainbowPrediction && <p>{rainbowPrediction}</p>}
        </div>
      )}
    </div>
  );
};

export default Weather;
