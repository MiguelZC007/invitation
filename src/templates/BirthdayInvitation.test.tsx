import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BirthdayInvitation } from "./BirthdayInvitation";

let reducedMotionPreference = false;

vi.mock("motion/react", async () => {
  const actual =
    await vi.importActual<typeof import("motion/react")>("motion/react");

  return {
    ...actual,
    useReducedMotion: () => reducedMotionPreference,
  };
});

const defaultProps = {
  title: "¡Cumpleaños de Génesis!",
  subtitle: "Te esperamos para celebrar",
  introHeading: "Inicio",
  celebrationHeading: "Celebración",
  farewellHeading: "Cierre",
  introMessage: "Vení a compartir un día mágico con nosotros.",
  celebrationMessage: "Habrá juegos, torta y una tarde inolvidable.",
  farewellMessage: "¡Tu presencia hará esta fiesta todavía más especial!",
  detailsHeading: "Detalles del evento",
  dateLabel: "Fecha",
  timeLabel: "Hora",
  locationLabel: "Lugar",
  eventDate: "02/06/2026",
  eventTime: "14:00",
  eventAddress: "C/ N. Arauco 7",
};

afterEach(() => {
  reducedMotionPreference = false;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("BirthdayInvitation", () => {
  it("renders a static one-page invitation with semantic sections", () => {
    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: defaultProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: defaultProps.introHeading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: defaultProps.celebrationHeading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: defaultProps.farewellHeading }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.introMessage)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.celebrationMessage),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.farewellMessage)).toBeInTheDocument();
  });

  it("shows fixed event data regardless of query params or hash", () => {
    window.history.pushState({}, "", "/invitation/birthday?date=hack#override");

    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getByText(defaultProps.eventDate)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.eventTime)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.eventAddress)).toBeInTheDocument();
  });

  it("uses standard motion mode when reduced motion is not requested", () => {
    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getByTestId("birthday-motion-state")).toHaveAttribute(
      "data-motion",
      "standard",
    );
  });

  it("marks mobile viewport mode for readability at 360px", () => {
    vi.stubGlobal("innerWidth", 360);
    window.dispatchEvent(new Event("resize"));

    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getByRole("main")).toHaveAttribute("data-viewport", "mobile");
    expect(screen.getByText(defaultProps.introMessage)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.eventAddress)).toBeInTheDocument();
  });

  it("marks desktop viewport mode and keeps complete content at 1280px", () => {
    vi.stubGlobal("innerWidth", 1280);
    window.dispatchEvent(new Event("resize"));

    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getByRole("main")).toHaveAttribute(
      "data-viewport",
      "desktop",
    );
    expect(
      screen.getByRole("heading", { name: defaultProps.introHeading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: defaultProps.celebrationHeading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: defaultProps.farewellHeading }),
    ).toBeInTheDocument();
  });

  it("keeps accessibility baseline for static invitation", () => {
    const { container } = render(<BirthdayInvitation {...defaultProps} />);

    expect(
      screen.queryByRole("button", { name: /siguiente|next/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /anterior|previous/i }),
    ).toBeNull();
    expect(screen.getByText(defaultProps.dateLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.timeLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.locationLabel)).toBeInTheDocument();

    const decorativeWrappers = container.querySelectorAll(
      "[data-decorative='true']",
    );
    expect(decorativeWrappers.length).toBeGreaterThan(0);

    for (const wrapper of decorativeWrappers) {
      expect(wrapper).toHaveAttribute("aria-hidden", "true");
    }

    const actionableElements = screen
      .queryAllByRole("button")
      .concat(screen.queryAllByRole("link"));
    expect(actionableElements).toHaveLength(0);
  });

  it("minimizes non-essential motion when prefers-reduced-motion is enabled", () => {
    reducedMotionPreference = true;
    render(<BirthdayInvitation {...defaultProps} />);

    expect(screen.getByTestId("birthday-motion-state")).toHaveAttribute(
      "data-motion",
      "reduced",
    );
    expect(screen.getByText(defaultProps.introMessage)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.celebrationMessage),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.farewellMessage)).toBeInTheDocument();
  });

  it("supports keyboard-only flow on actionable map link", async () => {
    const user = userEvent.setup();

    render(
      <BirthdayInvitation
        {...defaultProps}
        locationMapUrl="https://maps.example.com/genesis-party"
        mapLabel="Ver mapa"
      />,
    );

    const mapLink = screen.getByRole("link", { name: "Ver mapa" });
    expect(mapLink).toHaveAttribute(
      "href",
      "https://maps.example.com/genesis-party",
    );

    await user.tab();

    expect(mapLink).toHaveFocus();
  });
});
