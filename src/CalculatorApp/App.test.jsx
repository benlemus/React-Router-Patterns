import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect, describe, beforeEach, afterEach } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

/** /Calculator */

it("shows the caluclator", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId("calc")).toBeInTheDocument();
});

it("redirects any invalid route to /", () => {
  render(
    <MemoryRouter initialEntries={["/invalidRoute"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId("calc")).toBeInTheDocument();
});

describe("tests operations", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/invalidRoute"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("can add", () => {
    const num1 = screen.getByText("1");
    fireEvent.click(num1);

    const operator = screen.getByText("+");
    fireEvent.click(operator);

    const num2 = screen.getByText("5");
    fireEvent.click(num2);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("6");
  });

  it("can subtract", () => {
    const num1 = screen.getByText("1");
    fireEvent.click(num1);

    const num2 = screen.getByText("0");
    fireEvent.click(num2);

    const operator = screen.getByText("-");
    fireEvent.click(operator);

    const num3 = screen.getByText("5");
    fireEvent.click(num3);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("5");
  });

  it("can multiply", () => {
    const num1 = screen.getByText("1");
    fireEvent.click(num1);

    const operator = screen.getByText("x");
    fireEvent.click(operator);

    const num2 = screen.getByText("2");
    fireEvent.click(num2);

    const num3 = screen.getByText("9");
    fireEvent.click(num3);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("29");
  });

  it("can multiply by 0", () => {
    const num1 = screen.getByText("3");
    fireEvent.click(num1);

    const num2 = screen.getByText("6");
    fireEvent.click(num2);

    const operator = screen.getByText("x");
    fireEvent.click(operator);

    const num3 = screen.getByText("0");
    fireEvent.click(num3);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("0");
  });

  it("can divide", () => {
    const num1 = screen.getByText("4");
    fireEvent.click(num1);

    const num2 = screen.getByText("9");
    fireEvent.click(num2);

    const operator = screen.getByText("÷");
    fireEvent.click(operator);

    const num3 = screen.getByText("7");
    fireEvent.click(num3);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("7");
  });

  it("clears", () => {
    const num1 = screen.getByText("6");
    fireEvent.click(num1);

    const num2 = screen.getByText("7");
    fireEvent.click(num2);

    const operator = screen.getByText("+");
    fireEvent.click(operator);

    const num3 = screen.getByText("8");
    fireEvent.click(num3);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(screen.getByTestId("result").textContent).toBe("75");

    const clear = screen.getByText("C");
    fireEvent.click(clear);

    expect(screen.getByTestId("result").textContent).toBe("0");
  });
});
