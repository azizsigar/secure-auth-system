import React from "react";
import { useState, useEffect } from "react";

function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div>
      DarkModeButton
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default DarkModeButton;
