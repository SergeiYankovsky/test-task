import { ChangeEvent } from "react";
import { Input } from "../../src/components";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Input
        placeholder={""}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
        name={""}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
