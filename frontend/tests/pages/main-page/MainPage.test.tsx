import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "../../../src/pages/main-page";
import { screen, render, fireEvent } from "@testing-library/react";

const queryClient = new QueryClient();

jest.mock("@/utils/requests", () => ({
  useAddUser: jest.fn(() => ({ mutate: jest.fn() })),
  useDeleteUser: jest.fn(() => ({ mutate: jest.fn() })),
  useGetUsers: jest.fn(() => ({
    data: [
      {
        id: 1,
        firstname: "firstname",
        lastname: "lastname",
        email: "email@google.com",
      },
      {
        id: 2,
        firstname: "firstname2",
        lastname: "lastname2",
        email: "email2@google.com",
      },
    ],
  })),
  useUpdateUser: jest.fn(() => ({ mutate: jest.fn() })),
}));

describe("MainPage", () => {
  test("renders cards correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    );
    const card1 = screen.getByText("email@google.com");
    const card2 = screen.getByText("email2@google.com");
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });
  test("clickCardEvent", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    );
    const card1 = screen.getByText("email@google.com");

    fireEvent.click(card1);
    const modal = await screen.findByTestId("modal");

    expect(modal).toBeInTheDocument();
  });
  test("handleCloseModalEvent", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    );
    const buttonOpenModal = screen.getByText("NEUER EINTRAG");

    fireEvent.click(buttonOpenModal);
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
    const modal = screen.getByTestId("modal");
    fireEvent.click(modal);
    expect(form).not.toBeInTheDocument();
  });
  test("renders mobile button", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 500 });
    render(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    );
    const mobileButton = screen.getByText("+");
    expect(mobileButton).toBeInTheDocument();
  });
});
