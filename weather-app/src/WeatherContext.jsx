// src/WeatherContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for weather data
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Fetch weather data whenever the city changes
  useEffect(() => {
    fetchWeather();
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
