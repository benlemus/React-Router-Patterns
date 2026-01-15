import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Color.module.css";

export default function Color({ colors }) {
  const params = useParams();
  const color = colors.filter((c) => c.name == params.color)[0];

  return (
    <>
      <div
        style={{ backgroundColor: color.color }}
        className={styles.background}
      >
        <h1>THIS IS {color.name.toUpperCase()}.</h1>
        <h2>ISNT IT BEAUTIFUL?</h2>
        <Link to="/colors" className={styles.colorLink}>
          Go Back
        </Link>
      </div>
    </>
  );
}
