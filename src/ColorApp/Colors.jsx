import React from "react";
import styles from "./Colors.module.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Colors({ colors }) {
  return (
    <>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcome}>
          <h3>Welcome to the Color Factory.</h3>
          <h1>
            <Link to="/colors/new" className={styles.addColor}>
              Add Color
            </Link>
          </h1>
        </div>
      </div>

      <div className={styles.colorListContainer}>
        <h4>Please select a Color</h4>
        <div className={styles.colorList}>
          <ul>
            {colors.map((c) => (
              <li key={uuidv4()}>
                <Link
                  to={`/colors/${c.name.toLowerCase()}`}
                  className={styles.colorLink}
                >
                  {c.name[0].toUpperCase() + c.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
