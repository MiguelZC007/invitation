import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InvitationHeader } from "./InvitationHeader";

describe("InvitationHeader", () => {
  it("renders title and subtitle", () => {
    render(<InvitationHeader title="Wedding" subtitle="Join us" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Wedding" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Join us")).toBeInTheDocument();
  });

  it("renders a header element", () => {
    const { container } = render(
      <InvitationHeader title="Event" subtitle="Details" />,
    );
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
