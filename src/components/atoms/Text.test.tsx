import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders children", () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders as h1 for variant h1", () => {
    render(<Text variant="h1">Title</Text>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title",
    );
  });

  it("renders as h2 for variant h2", () => {
    render(<Text variant="h2">Subtitle</Text>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Subtitle",
    );
  });

  it("renders as p for body variant", () => {
    render(<Text variant="body">Body text</Text>);
    const el = screen.getByText("Body text");
    expect(el.tagName).toBe("P");
  });

  it("uses custom tag via as prop", () => {
    render(
      <Text variant="body" as="span">
        Span text
      </Text>,
    );
    const el = screen.getByText("Span text");
    expect(el.tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<Text className="custom-class">Styled</Text>);
    expect(screen.getByText("Styled")).toHaveClass("custom-class");
  });
});
