import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { ChristmasInvitation } from "./ChristmasInvitation";

const defaultProps = {
  title: "Feliz Navidad",
  subtitle: "Te invitamos a celebrar",
  welcomeMessage: "Bienvenido a la época más mágica del año",
  countdownLabel: "Faltan",
  targetDate: new Date("2026-12-25T00:00:00"),
  targetDateLabel: "25 de diciembre de 2026",
  farewellMessage: "¡Hasta pronto y felices fiestas!",
  nextLabel: "Siguiente",
  prevLabel: "Anterior",
  navigationLabel: "Navegación de pantallas",
  countdownUnitLabels: {
    days: "días",
    hours: "horas",
    minutes: "min",
    seconds: "seg",
  },
};

describe("ChristmasInvitation", () => {
  it("renders welcome screen with title and subtitle", () => {
    render(<ChristmasInvitation {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: defaultProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.welcomeMessage)).toBeInTheDocument();
  });

  it("navigates to countdown screen", async () => {
    const user = userEvent.setup();
    render(<ChristmasInvitation {...defaultProps} />);

    const nextButton = screen.getByRole("button", {
      name: defaultProps.nextLabel,
    });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.countdownLabel)).toBeInTheDocument();
    });
  });

  it("navigates to farewell screen", async () => {
    const user = userEvent.setup();
    render(<ChristmasInvitation {...defaultProps} />);

    await user.click(
      screen.getByRole("button", { name: defaultProps.nextLabel }),
    );
    await waitFor(() => {
      expect(screen.getByText(defaultProps.countdownLabel)).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: defaultProps.nextLabel }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultProps.farewellMessage),
      ).toBeInTheDocument();
    });
  });

  it("renders countdown with time units", async () => {
    const user = userEvent.setup();
    render(<ChristmasInvitation {...defaultProps} />);

    await user.click(
      screen.getByRole("button", { name: defaultProps.nextLabel }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultProps.countdownUnitLabels.days),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.countdownUnitLabels.hours),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.targetDateLabel),
      ).toBeInTheDocument();
    });
  });

  it("has navigation landmark", () => {
    render(<ChristmasInvitation {...defaultProps} />);
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      defaultProps.navigationLabel,
    );
  });

  it("has correct data-template attribute", () => {
    const { container } = render(<ChristmasInvitation {...defaultProps} />);
    const wrapper = container.querySelector('[data-template="christmas"]');
    expect(wrapper).toBeInTheDocument();
  });
});
