import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { FairyTaleWeddingInvitation } from "./FairyTaleWeddingInvitation";

const defaultProps = {
  title: "Mi boda de cuento de hadas",
  subtitle: "Te invitamos a vivir esta historia",
  welcomeMessage: "Bienvenido",
  countdownLabel: "Faltan",
  targetDate: new Date("2026-03-31T00:00:00"),
  targetDateLabel: "31 de marzo de 2026",
  locationName: "Cochabamba",
  locationAddress: "Cochabamba, Bolivia",
  farewellMessage: "Con cariño, nos vemos pronto",
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

describe("FairyTaleWeddingInvitation", () => {
  it("renders welcome screen with title and subtitle", () => {
    render(<FairyTaleWeddingInvitation {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: defaultProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.welcomeMessage)).toBeInTheDocument();
  });

  it("navigates to countdown screen", async () => {
    const user = userEvent.setup();
    render(<FairyTaleWeddingInvitation {...defaultProps} />);

    const nextButton = screen.getByRole("button", {
      name: defaultProps.nextLabel,
    });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.countdownLabel)).toBeInTheDocument();
    });
  });

  it("navigates to location screen", async () => {
    const user = userEvent.setup();
    render(<FairyTaleWeddingInvitation {...defaultProps} />);

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
      expect(screen.getByText(defaultProps.locationName)).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.locationAddress),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.farewellMessage),
      ).toBeInTheDocument();
    });
  });

  it("renders countdown with time units", async () => {
    const user = userEvent.setup();
    render(<FairyTaleWeddingInvitation {...defaultProps} />);

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
    render(<FairyTaleWeddingInvitation {...defaultProps} />);
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      defaultProps.navigationLabel,
    );
  });
});
