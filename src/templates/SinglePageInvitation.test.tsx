import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SinglePageInvitation } from "./SinglePageInvitation";

describe("SinglePageInvitation", () => {
  const defaultProps = {
    title: "Wedding Day",
    subtitle: "Join us in celebration",
    message: "We would love for you to be there.",
    date: "June 15, 2026",
    time: "6:00 PM",
    locationName: "Grand Hall",
    locationAddress: "123 Main St",
    rsvpLabel: "Confirmar asistencia",
  };

  it("renders title", () => {
    render(<SinglePageInvitation {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Wedding Day" }),
    ).toBeInTheDocument();
  });

  it("renders RSVP button with translated label", () => {
    render(<SinglePageInvitation {...defaultProps} />);
    const buttons = screen.getAllByRole("button", {
      name: "Confirmar asistencia",
    });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders RSVP button with custom label", () => {
    render(<SinglePageInvitation {...defaultProps} rsvpLabel="RSVP Now" />);
    const buttons = screen.getAllByRole("button", { name: "RSVP Now" });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders location and date info", () => {
    render(<SinglePageInvitation {...defaultProps} />);
    expect(screen.getAllByText("June 15, 2026").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText("Grand Hall").length).toBeGreaterThanOrEqual(1);
  });
});
