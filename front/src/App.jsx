import { WeatherProvider } from "./WeatherContext"; //provider
import DarkModeButton from "./components/DarkModeButton"
import Weather from "./components/Weather"; 
import { ThemeProvider } from "./ThemeContext";
import "./App.css"
const App = () => {
  return (
      <ThemeProvider>
    <WeatherProvider>


      <div className="App">
        <DarkModeButton/>
        <Weather />
      </div>

    </WeatherProvider>
      </ThemeProvider>
  );
};

export default App;
