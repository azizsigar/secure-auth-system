// src/App.jsx
import React from "react";
import { WeatherProvider } from "./WeatherContext"; //provider
import DarkModeButton from "./components/DarkModeButton"
import Weather from "./components/Weather"; 
import "./App.css"
const App = () => {
  return (
    <WeatherProvider>
      <div className="App">
        <DarkModeButton/>
        <Weather />
      </div>
    </WeatherProvider>
  );
};

export default App;
