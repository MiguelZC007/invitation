import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CountdownBlock } from "./CountdownBlock";

describe("CountdownBlock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders countdown units with labels", () => {
    const target = new Date("2030-01-01T00:00:00");
    vi.setSystemTime(new Date("2029-12-31T23:59:58"));

    render(<CountdownBlock targetDate={target} />);

    expect(screen.getByText("días")).toBeInTheDocument();
    expect(screen.getByText("horas")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
    expect(screen.getByText("seg")).toBeInTheDocument();
  });

  it("has timer role and aria-live", () => {
    const target = new Date("2030-01-01T00:00:00");
    vi.setSystemTime(new Date("2029-12-31T12:00:00"));

    render(<CountdownBlock targetDate={target} />);

    const timer = screen.getByRole("timer", { name: "" });
    expect(timer).toHaveAttribute("aria-live", "polite");
  });

  it("uses custom labels when provided", () => {
    const target = new Date("2030-01-01T00:00:00");
    vi.setSystemTime(new Date("2029-12-31T12:00:00"));

    render(
      <CountdownBlock
        targetDate={target}
        daysLabel="days"
        hoursLabel="hrs"
        minutesLabel="mins"
        secondsLabel="secs"
      />,
    );

    expect(screen.getByText("days")).toBeInTheDocument();
    expect(screen.getByText("hrs")).toBeInTheDocument();
    expect(screen.getByText("mins")).toBeInTheDocument();
    expect(screen.getByText("secs")).toBeInTheDocument();
  });

  it("shows zero when target date has passed", () => {
    const target = new Date("2020-01-01T00:00:00");
    vi.setSystemTime(new Date("2025-01-01T12:00:00"));

    render(<CountdownBlock targetDate={target} />);

    const zeros = screen.getAllByText("00");
    expect(zeros.length).toBeGreaterThanOrEqual(4);
  });
});
