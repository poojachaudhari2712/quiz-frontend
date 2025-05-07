import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-btn" onClick={toggleTheme}>
      {darkMode ? "🌙" : "☀️"}
    </div>
  );
};

export default ThemeToggle;
