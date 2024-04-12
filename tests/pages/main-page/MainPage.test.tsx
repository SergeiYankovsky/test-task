import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "../../../src/pages/main-page";
import renderer from "react-test-renderer";

const queryClient = new QueryClient();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
