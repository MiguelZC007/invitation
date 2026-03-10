import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BirthdayInvitation } from "./BirthdayInvitation";

const defaultProps = {
  title: "¡Cumpleaños de Ana!",
  subtitle: "Te esperamos para celebrar",
  welcomeMessage: "Ven a celebrar con nosotros este día especial",
  countdownLabel: "Faltan",
  targetDate: new Date("2026-06-15T18:00:00"),
  targetDateLabel: "15 de junio de 2026",
  farewellMessage: "¡Te esperamos! No faltes.",
};

describe("BirthdayInvitation", () => {
  it("renders welcome screen with title and subtitle", () => {
    render(<BirthdayInvitation {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: defaultProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.welcomeMessage)).toBeInTheDocument();
  });

  it("navigates to countdown screen", async () => {
    const user = userEvent.setup();
    render(<BirthdayInvitation {...defaultProps} />);

    const nextButton = screen.getByRole("button", { name: "Siguiente" });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.countdownLabel)).toBeInTheDocument();
    });
  });

  it("navigates to farewell screen", async () => {
    const user = userEvent.setup();
    render(<BirthdayInvitation {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Siguiente" }));
    await waitFor(() => {
      expect(screen.getByText(defaultProps.countdownLabel)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Siguiente" }));

    await waitFor(() => {
      expect(screen.getByText(defaultProps.farewellMessage)).toBeInTheDocument();
    });
  });

  it("renders countdown with time units", async () => {
    const user = userEvent.setup();
    render(<BirthdayInvitation {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Siguiente" }));

    await waitFor(() => {
      expect(screen.getByText("días")).toBeInTheDocument();
      expect(screen.getByText("horas")).toBeInTheDocument();
      expect(screen.getByText(defaultProps.targetDateLabel)).toBeInTheDocument();
    });
  });

  it("has navigation landmark", () => {
    render(<BirthdayInvitation {...defaultProps} />);
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "Navegación de pantallas",
    );
  });

  it("has correct data-template attribute", () => {
    const { container } = render(<BirthdayInvitation {...defaultProps} />);
    const wrapper = container.querySelector('[data-template="birthday"]');
    expect(wrapper).toBeInTheDocument();
  });
});
