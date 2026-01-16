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

/** /Colors */

it("shows a link to the add color form and list of added colors on the homepage", () => {
  render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Color Factory.")).toBeInTheDocument();
});

it("redirects any invalid route to /colors", () => {
  render(
    <MemoryRouter initialEntries={["/invalidRoute"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Color Factory.")).toBeInTheDocument();
});

/** /color */
it("shows the details page of a color from /colors. Goes back to /colors when go back is clicked", () => {
  localStorage.setItem(
    "colors",
    JSON.stringify([{ name: "red", color: "#FF0000" }])
  );

  render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  const color = screen.getByText("Red");
  fireEvent.click(color);

  const colorElement = screen.getByTestId("color-details");

  expect(
    screen.queryByText("Welcome to the Color Factory.")
  ).not.toBeInTheDocument();

  expect(screen.getByText("THIS IS RED.")).toBeInTheDocument();

  expect(colorElement).toHaveStyle({ backgroundColor: "#FF0000" });

  const goBack = screen.getByText(/go back/i);
  fireEvent.click(goBack);

  expect(
    screen.queryByText("Welcome to the Color Factory.")
  ).toBeInTheDocument();
});

/** /colors/new */

it("shows the new color form from /colors.", () => {
  render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  const formLink = screen.getByText(/add color/i);

  fireEvent.click(formLink);

  expect(
    screen.queryByText("Welcome to the Color Factory.")
  ).not.toBeInTheDocument();

  expect(screen.getByText(/add new color/i));
});

it("adds a new color and redirects to /colors.", () => {
  render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );

  const formLink = screen.getByText(/add color/i);

  fireEvent.click(formLink);

  expect(screen.getByText(/add new color/i));

  const nameInput = screen.getByPlaceholderText(/color name/i);
  const colorInput = screen.getByLabelText(/pick color/i);

  fireEvent.change(nameInput, { target: { value: "purple" } });
  fireEvent.change(colorInput, { target: { value: "#8800ff" } });

  const submitBtn = screen.getByRole("button", { name: /add/i });
  fireEvent.click(submitBtn);

  expect(
    screen.queryByText("Welcome to the Color Factory.")
  ).toBeInTheDocument();

  expect(screen.queryByText(/purple/i)).toBeInTheDocument();
});
