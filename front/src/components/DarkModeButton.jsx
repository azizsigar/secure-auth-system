import  { useContext } from "react";
import { ThemeContext } from "../ThemeContext"; // ThemeContext'i import ediyoruz

const DarkModeButton = () => {
  // useContext ile ThemeContext'ten veriyi alıyoruz
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default DarkModeButton;
