import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders children with aria-hidden", () => {
    render(<Icon>★</Icon>);
    const icon = screen.getByText("★");
    expect(icon.closest("[aria-hidden]")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { container } = render(<Icon size="lg">★</Icon>);
    const span = container.querySelector("span");
    expect(span).toHaveClass("w-8", "h-8");
  });

  it("applies custom className", () => {
    const { container } = render(<Icon className="text-red-500">★</Icon>);
    const span = container.querySelector("span");
    expect(span).toHaveClass("text-red-500");
  });
});
