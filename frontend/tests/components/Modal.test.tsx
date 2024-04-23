import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Modal } from "@/components";
import { Contact } from "@/types";

describe("Modal", () => {
  const children = <div></div>;
  const onClose = jest.fn();
  test("renders Modal correctly", () => {
    render(
      <Modal isOpen onClose={onClose}>
        {children}
      </Modal>,
    );

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
  test("onCloseEvent", () => {
    render(
      <Modal isOpen onClose={onClose}>
        {children}
      </Modal>,
    );

    const modal = screen.getByTestId("modal");
    fireEvent.click(modal);
    waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
  test("failcloseModalEvent", () => {
    render(
      <Modal isOpen onClose={onClose}>
        <Form
          contact={null}
          onCloseModal={() => {}}
          onAddUser={(contact: Contact) => {}}
          onUpdateUser={(contact: Contact) => {}}
          onDeleteUser={(id: number) => {}}
        />
      </Modal>,
    );

    const form = screen.getByTestId("form");
    fireEvent.click(form);
    waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
