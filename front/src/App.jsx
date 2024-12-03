import { BrowserRouter as Router,Link } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import DarkModeButton from "./components/DarkModeButton";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./Routes/AppRoutes.jsx";
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
            </nav>

            {/* Routes */}
            <AppRoutes />
          </div>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
