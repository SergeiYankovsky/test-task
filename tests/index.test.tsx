import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "@testing-library/react";
import { App } from "../src/App";
import { expect } from "@jest/globals";

describe("App component rendering", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root !== null) {
      act(() => {
        root!.unmount();
      });
    }
    container?.remove();
    container = null;
    root = null;
  });

  it("renders App without crashing", async () => {
    await act(async () => {
      root?.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    });

    expect(container?.textContent).toBeTruthy();
  });
});
