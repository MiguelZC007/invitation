import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MultiScreenInvitation } from "./MultiScreenInvitation";

const screens = [
  { key: "s1", content: <p>Screen One</p> },
  { key: "s2", content: <p>Screen Two</p> },
  { key: "s3", content: <p>Screen Three</p> },
];

const navigationProps = {
  nextLabel: "Siguiente",
  prevLabel: "Anterior",
  navigationLabel: "Navegación de pantallas",
};

describe("MultiScreenInvitation", () => {
  it("renders first screen", () => {
    render(<MultiScreenInvitation screens={screens} {...navigationProps} />);
    expect(screen.getByText("Screen One")).toBeInTheDocument();
  });

  it("does not show prev button on first screen", () => {
    render(
      <MultiScreenInvitation
        screens={screens}
        {...navigationProps}
        prevLabel="Back"
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
  });

  it("navigates to next screen", async () => {
    const user = userEvent.setup();
    render(<MultiScreenInvitation screens={screens} {...navigationProps} />);

    const nextButtons = screen.getAllByRole("button", { name: "Siguiente" });
    await user.click(nextButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText("Screen Two").length).toBeGreaterThanOrEqual(
        1,
      );
    });
  });

  it("navigates back to previous screen", async () => {
    const user = userEvent.setup();
    render(<MultiScreenInvitation screens={screens} {...navigationProps} />);

    const nextButtons = screen.getAllByRole("button", { name: "Siguiente" });
    await user.click(nextButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText("Screen Two").length).toBeGreaterThanOrEqual(
        1,
      );
    });

    const prevButtons = screen.getAllByRole("button", { name: "Anterior" });
    await user.click(prevButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText("Screen One").length).toBeGreaterThanOrEqual(
        1,
      );
    });
  });

  it("has navigation landmark", () => {
    render(<MultiScreenInvitation screens={screens} {...navigationProps} />);
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "Navegación de pantallas",
    );
  });

  it("accepts transitionVariant prop", () => {
    render(
      <MultiScreenInvitation
        screens={screens}
        {...navigationProps}
        transitionVariant="cloud"
      />,
    );
    expect(screen.getByText("Screen One")).toBeInTheDocument();
  });

  it("accepts buttonVariant prop", () => {
    render(
      <MultiScreenInvitation
        screens={screens}
        {...navigationProps}
        buttonVariant="accent"
      />,
    );
    const nextBtn = screen.getByRole("button", { name: "Siguiente" });
    expect(nextBtn).toHaveClass("bg-amber-600");
  });
});
