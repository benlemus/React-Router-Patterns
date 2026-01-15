import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import React from "react";
import Dogs from "./Dogs";
import dog1 from "./assets/whiskey.jpg";
import dog2 from "./assets/duke.jpg";
import dog3 from "./assets/perry.jpg";
import Dog from "./Dog";

const dogData = [
  {
    name: "Whiskey",
    age: 5,
    src: dog1,
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!",
    ],
  },
  {
    name: "Duke",
    age: 3,
    src: dog2,
    facts: [
      "Duke believes that ball is life.",
      "Duke likes snow.",
      "Duke enjoys pawing other dogs.",
    ],
  },
  {
    name: "Perry",
    age: 4,
    src: dog3,
    facts: [
      "Perry loves all humans.",
      "Perry demolishes all snacks.",
      "Perry hates the rain.",
    ],
  },
];

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/dogs" element={<Dogs dogData={dogData} />} />
        <Route exact path="/dogs/:name" element={<Dog dogData={dogData} />} />
        <Route path="*" element={<Navigate to="/dogs" replace />} />
      </Routes>
    </>
  );
}

export default App;
