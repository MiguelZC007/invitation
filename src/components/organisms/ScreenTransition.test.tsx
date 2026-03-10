import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScreenTransition } from "./ScreenTransition";

describe("ScreenTransition", () => {
  it("renders children", () => {
    render(
      <ScreenTransition screenKey="test">
        <p>Screen content</p>
      </ScreenTransition>,
    );
    expect(screen.getByText("Screen content")).toBeInTheDocument();
  });

  it("accepts cloud variant", () => {
    render(
      <ScreenTransition screenKey="cloud-test" variant="cloud">
        <p>Cloud content</p>
      </ScreenTransition>,
    );
    expect(screen.getByText("Cloud content")).toBeInTheDocument();
  });
});
