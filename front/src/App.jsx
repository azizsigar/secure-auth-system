import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import Weather from "./components/Weather";
import LikedCountries from "./components/LikedCountries";
import DarkModeButton from "./components/DarkModeButton";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Router>
          <div className="App">
            <DarkModeButton />

            {/* Navbar */}
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/liked-countries">Liked Countries</Link>
                </li>
              </ul>
              {/* Dark Mode Button */}
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Weather />} />
              <Route path="/liked-countries" element={<LikedCountries />} />
            </Routes>
          </div>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
