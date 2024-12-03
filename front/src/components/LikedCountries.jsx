import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import "../App.css"
const LikedCountries = () => {
  const { likedCountries } = useContext(WeatherContext);

  // likedCountries'nin boş bir dizi olarak varsayılan değeri olduğunu kontrol edin
  if (!likedCountries) {
    console.error(
      "likedCountries is undefined or not provided by WeatherContext."
    );
    return null;
  }

  return (
    <div className="App">
      <h2>Liked Countries</h2>
      <ul>
        {likedCountries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikedCountries;
