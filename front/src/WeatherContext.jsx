import { createContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedCountries, setLikedCountries] = useState([]);
  const [locationError, setLocationError] = useState(null); // New state to handle location error

  const apiKey = "19532d5437f317b05fd9159cf70fa398";

  // Fetch weather data based on the city
  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // Add a liked country
  const addLikedCountry = (country) => {
    if (country && !likedCountries.includes(country)) {
      setLikedCountries((prev) => [...prev, country]);
    }
  };

  // Get the user's current location (latitude and longitude)
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoordinates(latitude, longitude);
        },
        () => {
          setLocationError(
            "Unable to retrieve your location. Using default city: London."
          );
          setCity("London"); // Fallback to London if location access is denied
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch the city name from latitude and longitude (reverse geocoding)
  const fetchCityFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setCity(response.data.name); // Set the city name based on coordinates
    } catch (error) {
      setError("Failed to fetch city name.");
    }
  };

  // Fetch weather data whenever the city changes
  useEffect(() => {
    if (!city) {
      getUserLocation(); // Get the user's location when the component is mounted
    }
  }, []); // Empty dependency array to run once

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
        locationError, // Provide location error state to components
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
