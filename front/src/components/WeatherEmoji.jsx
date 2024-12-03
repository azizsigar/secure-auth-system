import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
function WeatherEmoji() {

const { weather } = useContext(WeatherContext);

  const getWeatherEmoji = (description) => {
    if (description.toLowerCase().includes("cloud")) {
        return "☁️";
    } else if (description.toLowerCase().includes("clear")) {
        return "☀️";
    } else if (description.toLowerCase().includes("rain")) {
        return "🌧️";
    } else if (description.toLowerCase().includes("snow")) {
        return "❄️";
    } else if (description.toLowerCase().includes("thunder")) {
        return "⚡";
    }
      return "🌥️";
  };
    return (
      <div>
        <h2>
          {weather.name}
  
          {getWeatherEmoji(weather.weather[0].description)}
        </h2>
      </div>
    );
}

export default WeatherEmoji;
