import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateTimeBlock } from "./DateTimeBlock";

describe("DateTimeBlock", () => {
  it("renders date and time", () => {
    render(<DateTimeBlock date="15 de junio" time="18:00" />);
    expect(screen.getByText("15 de junio")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    const { container } = render(
      <DateTimeBlock date="June 15" time="6 PM" />,
    );
    const group = container.querySelector('[aria-label="Fecha y hora"]');
    expect(group).toBeInTheDocument();
  });
});
