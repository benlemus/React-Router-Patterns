import React, { useState } from "react";
import styles from "./ColorsNew.module.css";
import { useNavigate } from "react-router-dom";

export default function ColorsNew({ addColor }) {
  const nav = useNavigate();
  const colorSetUp = {
    name: "",
    color: "#ffffff",
  };

  const [color, setColor] = useState(colorSetUp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(color);
    nav("/colors", { state: { newColor: color } });
    setColor(colorSetUp);
  };

  return (
    <>
      <div className={styles.content}>
        <h1>Add New Color</h1>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Color Name"
              onChange={handleChange}
              value={color.name}
              name="name"
              required
            />

            <label htmlFor="colorPick">Pick Color:</label>
            <input
              type="color"
              id="colorPick"
              onChange={handleChange}
              value={color.color}
              name="color"
              required
            />

            <button>Add</button>
          </form>
        </div>
      </div>
    </>
  );
}
