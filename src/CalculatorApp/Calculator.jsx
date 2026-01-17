import { useParams, useNavigate } from "react-router-dom";
import styles from "./Calculator.module.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Calculator() {
  const params = useParams();
  const nav = useNavigate();

  const calcSetUp = {
    num1: null,
    num2: null,
    operator: null,
  };

  const [expression, setExpression] = useState(calcSetUp);
  const [seenOperator, setSeenOperator] = useState(false);

  let result = null;

  const add = (num1, num2) => num1 + num2;
  const subtract = (num1, num2) => num1 - num2;
  const multiply = (num1, num2) => num1 * num2;
  const divide = (num1, num2) => num1 / num2;

  const isParams = params.operator && params.num1 && params.num2;

  if (isParams) {
    const opp = params.operator;
    const num1 = params.num1;
    const num2 = params.num2;

    if (opp === "add") result = add(+num1, +num2);
    if (opp === "subtract") result = subtract(+num1, +num2);
    if (opp === "multiply") result = multiply(+num1, +num2);
    if (opp === "divide") result = divide(+num1, +num2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "operator") {
      setSeenOperator(true);
      setExpression((prev) => ({
        ...prev,
        operator: value,
      }));
    } else {
      if (!seenOperator) {
        setExpression((prev) => ({
          ...prev,
          num1: prev.num1 ? prev.num1 + value : value,
        }));
      } else {
        setExpression((prev) => ({
          ...prev,
          num2: prev.num2 ? prev.num2 + value : value,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exp = expression;

    if ((exp.operator === null) | (exp.num1 === null) | (exp.num2 === null)) {
      nav("/");
    } else {
      nav(`/${exp.operator}/${exp.num1}/${exp.num2}`);
    }
  };

  const handleClear = (e) => {
    setExpression(calcSetUp);
    setSeenOperator(false);
    nav("/");
  };

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operators = [
    { name: "add", sign: "+" },
    { name: "subtract", sign: "-" },
    { name: "multiply", sign: "x" },
    { name: "divide", sign: "÷" },
  ];

  return (
    <>
      <div className="content">
        <div className={styles.calcContainer} data-testid="calc">
          <div className={styles.calculator}>
            <div className={styles.result} data-testid="result">
              {isParams
                ? result
                : `${expression.num1 || "0"}${
                    expression.operator
                      ? " " +
                        operators.find((o) => o.name === expression.operator)
                          ?.sign +
                        " "
                      : ""
                  }${expression.num2 || ""}`}
            </div>

            <form onSubmit={handleSubmit}>
              {/* operators */}
              <div className={styles.operatorsContainer}>
                {operators.map((o) => (
                  <div key={o.name}>
                    <label htmlFor={o.name}>{o.sign}</label>
                    <input
                      type="text"
                      value={o.name}
                      name="operator"
                      id={o.name}
                      onClick={handleChange}
                      style={{ display: "none" }}
                      readOnly
                    />
                  </div>
                ))}
              </div>

              {/* nums */}
              <div className={styles.numbersContainer}>
                {nums.map((n) => (
                  <div key={n}>
                    <label htmlFor={n}>{n}</label>
                    <input
                      type="text"
                      onClick={handleChange}
                      value={n}
                      name="num1"
                      id={n}
                      style={{ display: "none" }}
                      readOnly
                    />
                  </div>
                ))}
              </div>

              <div className={styles.zeroEquals}>
                <div>
                  <label htmlFor="clear" key={uuidv4()}>
                    C
                  </label>
                  <input
                    type="text"
                    onClick={handleClear}
                    value="c"
                    name="clear"
                    id="clear"
                    style={{ display: "none" }}
                    key={uuidv4()}
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="0" key={uuidv4()}>
                    0
                  </label>
                  <input
                    type="text"
                    onClick={handleChange}
                    value={0}
                    name="num1"
                    id="0"
                    style={{ display: "none" }}
                    key={uuidv4()}
                    readOnly
                  />
                </div>

                <button>=</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
