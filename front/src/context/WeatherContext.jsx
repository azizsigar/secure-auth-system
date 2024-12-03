import { createContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedCountries, setLikedCountries] = useState([]);
  const [locationError, setLocationError] = useState(null);

  const apiKey = "19532d5437f317b05fd9159cf70fa398";

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const addLikedCountry = (country) => {
    if (country && !likedCountries.includes(country)) {
      setLikedCountries((prev) => [...prev, country]);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoordinates(latitude, longitude);
        },
        () => {
          setLocationError(
            "Unable to retrieve your location. Using default city: London.",
          );
          setCity("London");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchCityFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      );
      setCity(response.data.name);
    } catch (error) {
      setError("Failed to fetch city name.");
    }
  };

  useEffect(() => {
    if (!city) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        loading,
        error,
        fetchWeather,
        addLikedCountry,
        likedCountries,
        locationError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
