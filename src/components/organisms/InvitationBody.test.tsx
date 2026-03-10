import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InvitationBody } from "./InvitationBody";

describe("InvitationBody", () => {
  const defaultProps = {
    message: "We look forward to seeing you!",
    date: "June 15",
    time: "6 PM",
    locationName: "Grand Hall",
    locationAddress: "456 Elm St",
  };

  it("renders message", () => {
    render(<InvitationBody {...defaultProps} />);
    expect(
      screen.getByText("We look forward to seeing you!"),
    ).toBeInTheDocument();
  });

  it("renders date and time", () => {
    render(<InvitationBody {...defaultProps} />);
    expect(screen.getAllByText("June 15").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("6 PM").length).toBeGreaterThanOrEqual(1);
  });

  it("renders location", () => {
    render(<InvitationBody {...defaultProps} />);
    expect(screen.getAllByText("Grand Hall").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("456 Elm St").length).toBeGreaterThanOrEqual(1);
  });
});
