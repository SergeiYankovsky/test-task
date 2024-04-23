import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form } from "@/components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Contact } from "@/types";

const queryClient = new QueryClient();
const contact: Contact = {
  id: 1,
  firstname: "firstname",
  lastname: "lastname",
  email: "email@google.com",
};

const onCloseModal = jest.fn();
const onAddUser = jest.fn();
const onUpdateUser = jest.fn();
const onDeleteUser = jest.fn();
describe("Form", () => {
  test("renders empty Form correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={null}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const form = screen.getByTestId("form");
    const vornameInput = screen.getByTestId<HTMLInputElement>("VornameInput");
    const nachnameInput = screen.getByTestId<HTMLInputElement>("NachnameInput");
    const emaiailInput = screen.getByTestId<HTMLInputElement>("E-MailInput");
    const button = screen.queryByText("LÖSCHEN");

    expect(form).toBeInTheDocument();
    expect(vornameInput.value).toEqual("");
    expect(nachnameInput.value).toEqual("");
    expect(emaiailInput.value).toEqual("");
    expect(button).toBeNull();
  });
  test("onSubmitEvent", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={null}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const form = screen.getByTestId("form");
    const vornameInput = screen.getByTestId<HTMLInputElement>("VornameInput");
    const nachnameInput = screen.getByTestId<HTMLInputElement>("NachnameInput");
    const emaiailInput = screen.getByTestId<HTMLInputElement>("E-MailInput");

    act(() => {
      fireEvent.change(vornameInput, { target: { value: "firstname" } });
      fireEvent.change(nachnameInput, { target: { value: "lastname" } });
      fireEvent.change(emaiailInput, { target: { value: "email@gmail.com" } });
      fireEvent.submit(form);
    });
    waitFor(() => {
      expect(onCloseModal).toHaveBeenCalledTimes(1);
    });
  });

  test("onAddUserEvent", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={null}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const form = screen.getByTestId("form");

    act(() => {
      fireEvent.submit(form);
    });
    waitFor(() => {
      expect(onAddUser).toHaveBeenCalled();
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
  test("onUpdateUserEvent", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={contact}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const form = screen.getByTestId("form");

    act(() => {
      fireEvent.submit(form);
    });
    waitFor(() => {
      expect(onUpdateUser).toHaveBeenCalled();
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
  test("onDeleteUserEvent", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={contact}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const deleteButton = screen.getByText("LÖSCHEN");

    act(() => {
      fireEvent.click(deleteButton);
    });
    waitFor(() => {
      expect(onDeleteUser).toHaveBeenCalled();
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
  test("failDeleteUserEvent", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form
          onCloseModal={onCloseModal}
          contact={null}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
        />
      </QueryClientProvider>,
    );
    const deleteButton = screen.queryByText("LÖSCHEN");
    expect(deleteButton).toBeNull();
    waitFor(() => {
      expect(onDeleteUser).not.toHaveBeenCalled();
      expect(onCloseModal).not.toHaveBeenCalled();
    });
  });
});
