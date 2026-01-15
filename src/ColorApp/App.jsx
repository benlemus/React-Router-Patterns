import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import Colors from "./Colors";
import Color from "./Color";
import ColorsNew from "./ColorsNew";

const initialColors = [
  {
    name: "red",
    color: "rgb(255, 0, 0)",
  },
  {
    name: "green",
    color: "rgb(0, 255, 0)",
  },
  {
    name: "blue",
    color: "rgb(0, 0, 255)",
  },
];

function App() {
  const [colors, setColors] = useState(() => {
    const stored = localStorage.getItem("colors");
    return stored ? JSON.parse(stored) : initialColors;
  });

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  const addColor = (newColor) => {
    setColors((prev) => [...prev, newColor]);
  };

  return (
    <>
      <Routes>
        <Route path="/colors" element={<Colors colors={colors} />} />
        <Route path="/colors/:color" element={<Color colors={colors} />} />
        <Route path="/colors/new" element={<ColorsNew addColor={addColor} />} />
        <Route path="*" element={<Navigate to="/colors" replace />} />
      </Routes>
    </>
  );
}

export default App;
