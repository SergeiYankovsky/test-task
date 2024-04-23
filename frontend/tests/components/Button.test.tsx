import { render, screen } from "@testing-library/react";
import { Button } from "@/components";

describe("Button", () => {
  test("renders button correctly", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  test("renders button with default variant correctly", () => {
    render(<Button variant="default" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button_default");
  });
  test("renders button with primary variant correctly", () => {
    render(<Button variant="primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button_primary");
  });
  test("renders button with secondary variant correctly", () => {
    render(<Button variant="secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button_secondary");
  });
  test("renders button with default_mobile variant correctly", () => {
    render(<Button variant="default_mobile" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button_default_mobile");
  });
});
