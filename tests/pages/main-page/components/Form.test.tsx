import { Contact } from "../../../../src/types/types";
import { Form } from "../../../../src/pages/main-page/components/Form";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Form
        contact={null}
        onAddUser={function (contact: Contact): void {
          throw new Error("Function not implemented.");
        }}
        onUpdateUser={function (contact: Contact): void {
          throw new Error("Function not implemented.");
        }}
        onDeleteUser={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        onCloseModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
