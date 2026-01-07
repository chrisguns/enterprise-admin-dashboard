import { screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { renderWithProviders } from "../test/renderWithProviders";  

describe("HomePage", () => {
  it("renders the title", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/Salon Schedule/i)).toBeInTheDocument();
  });
});
