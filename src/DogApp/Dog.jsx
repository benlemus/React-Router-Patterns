import { useParams } from "react-router-dom";
import React from "react";
import styles from "./Dog.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Dog({ dogData }) {
  const params = useParams();
  const dog = dogData.filter(
    (dog) => dog.name.toLowerCase() === params.name
  )[0];

  return (
    <>
      <div className="content">
        <div className={styles.dogContainer}>
          <div className={styles.dog} key={uuidv4()}>
            <img src={dog.src} alt={`dog-${dog.src}`} />

            <div className={styles.details}>
              <div className={styles.nameAge}>
                <h3 className={styles.name}>{dog.name},</h3>
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
        </div>
      </div>
    </>
  );
}
