import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TitleSubtitle } from "./TitleSubtitle";

describe("TitleSubtitle", () => {
  it("renders title as heading", () => {
    render(<TitleSubtitle title="Main Title" subtitle="Sub" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Main Title" }),
    ).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<TitleSubtitle title="Title" subtitle="A subtitle" />);
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });
});
