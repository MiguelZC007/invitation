import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LocationBlock } from "./LocationBlock";

describe("LocationBlock", () => {
  it("renders name and address", () => {
    render(<LocationBlock name="Venue" address="123 Main St" />);
    expect(screen.getByText("Venue")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
  });

  it("renders map link when mapUrl is provided", () => {
    render(
      <LocationBlock
        name="Venue"
        address="123 Main St"
        mapUrl="https://maps.example.com"
      />,
    );
    const link = screen.getByRole("link", { name: "Ver mapa" });
    expect(link).toHaveAttribute("href", "https://maps.example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render map link without mapUrl", () => {
    render(<LocationBlock name="Venue" address="123 Main St" />);
    expect(screen.queryByText("Ver mapa")).not.toBeInTheDocument();
  });

  it("has accessible label", () => {
    const { container } = render(
      <LocationBlock name="Venue" address="123 St" />,
    );
    const group = container.querySelector('[aria-label="Ubicación"]');
    expect(group).toBeInTheDocument();
  });
});
