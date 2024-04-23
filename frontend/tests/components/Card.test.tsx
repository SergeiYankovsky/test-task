import { render, screen } from "@testing-library/react";
import { Card } from "@/components";

test("renders Card correctly", () => {
  render(<Card onClick={() => {}} title="title" email="email" />);
  const card = screen.getByRole("button");
  const title = screen.getByText("title");
  const email = screen.getByText("email");
  expect(card).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
