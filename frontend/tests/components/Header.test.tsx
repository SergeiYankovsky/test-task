import { render, screen } from "@testing-library/react";
import { Header } from "@/components";

test("renders button correctly", () => {
  render(<Header />);
  const header = screen.getByText("ADDRESSBUCH");
  expect(header).toBeInTheDocument();
});
