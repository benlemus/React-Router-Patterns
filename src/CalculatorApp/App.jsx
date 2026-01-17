import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Calcualtor from "./Calculator";
import React from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Calcualtor />}></Route>
        <Route path="/:operator/:num1/:num2" element={<Calcualtor />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
