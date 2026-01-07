import { screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { renderWithProviders } from "../test/renderWithProviders";

describe("Route: /", () => {
  it("renders the Home page title", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/Enterprise Admin Dashboard/i)).toBeInTheDocument();
  });
});
