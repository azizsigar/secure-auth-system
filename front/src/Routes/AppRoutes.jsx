import { Routes, Route } from "react-router-dom";
import Weather from "../components/Weather";
import LikedCountries from "../components/LikedCountries";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/liked-countries" element={<LikedCountries />} />
    </Routes>
  );
};

export default AppRoutes;
