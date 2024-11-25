import { WeatherProvider } from "./WeatherContext"; //provider
import DarkModeButton from "./components/DarkModeButton"
import Weather from "./components/Weather"; 
import UserInfo from "./components/UserInfo";
import "./App.css"
const App = () => {
  return (
    <WeatherProvider>
      <div className="App">
        <DarkModeButton/>
        <Weather />
        <UserInfo/>
      </div>
    </WeatherProvider>
  );
};

export default App;
