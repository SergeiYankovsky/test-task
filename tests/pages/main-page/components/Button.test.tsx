import { Button } from "../../../../src/pages/main-page/components/Button";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Button type={"desktop"} onClick={function (): void {
      throw new Error("Function not implemented.");
  } } />).toJSON();
  expect(tree).toMatchSnapshot();
});