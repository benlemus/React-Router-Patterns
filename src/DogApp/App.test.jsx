import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

/** /dogs */

it("shows the dogs photo and information on the homepage", () => {
  render(
    <MemoryRouter initialEntries={["/dogs"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Dogs")).toBeInTheDocument();
});

it("redirects any invalid route to /dogs", () => {
  render(
    <MemoryRouter initialEntries={["/incorrectRoute"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Dogs")).toBeInTheDocument();
});

/** /dogs/:name */

it("shows the details page of a dog from /dogs", () => {
  render(
    <MemoryRouter initialEntries={["/dogs"]}>
      <App />
    </MemoryRouter>
  );

  const dog = screen.getByText("Duke,");
  fireEvent.click(dog);
  expect(screen.queryByText("Whiskey")).not.toBeInTheDocument();
  expect(screen.getByTestId("dogDetails")).toBeInTheDocument();
});
