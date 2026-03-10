import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: "Outline" });
    expect(btn).toHaveClass("border");
  });

  it("applies custom className", () => {
    render(<Button className="w-full">Wide</Button>);
    const btn = screen.getByRole("button", { name: "Wide" });
    expect(btn).toHaveClass("w-full");
  });
});
