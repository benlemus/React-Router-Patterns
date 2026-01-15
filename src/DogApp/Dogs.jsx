import styles from "./Dogs.module.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Dogs({ dogData }) {
  const nav = useNavigate();
  return (
    <>
      <h1 className={styles.dogTitle}>Dogs</h1>

      <div className="content">
        <div className={styles.dogsContainer}>
          {dogData.map((dog) => (
            <div className={styles.dog} key={uuidv4()}>
              <img src={dog.src} alt={`dog-${dog.src}`} />

              <div className={styles.details}>
                <div className={styles.nameAge}>
                  <h3
                    className={styles.name}
                    onClick={() => nav(`/dogs/${dog.name.toLowerCase()}`)}
                  >
                    {dog.name},
                  </h3>
                  <h3 className={styles.age}>{dog.age}</h3>
                </div>

                <div className={styles.facts}>
                  <ul>
                    {dog.facts.map((f) => (
                      <li key={uuidv4()}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
