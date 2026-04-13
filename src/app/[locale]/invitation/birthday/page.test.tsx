import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import BirthdayInvitationPage from "./page";
import { generateStaticParams } from "../../layout";

const setRequestLocaleMock = vi.fn((locale: string) => {
  activeLocale = locale;
});

let activeLocale = "es";

const translations: Record<string, Record<string, Record<string, string>>> = {
  es: {
    birthdayInvitation: {
      title: "¡Cumpleaños de Génesis!",
      subtitle: "Te esperamos para celebrar",
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
    },
  },
  en: {
    birthdayInvitation: {
      title: "Genesis's Birthday Party!",
      subtitle: "Join us for a magical celebration",
      introMessage: "Come share a magical day with us.",
      celebrationMessage: "Games, cake, and an unforgettable afternoon await.",
      farewellMessage: "Your presence will make this party even more special!",
      detailsHeading: "Event details",
      dateLabel: "Date",
      timeLabel: "Time",
      locationLabel: "Location",
      eventDate: "02/06/2026",
      eventTime: "14:00",
      eventAddress: "C/ N. Arauco 7",
    },
  },
};

vi.mock("next-intl/server", () => ({
  setRequestLocale: (locale: string) => setRequestLocaleMock(locale),
}));

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    return (key: string) =>
      translations[activeLocale]?.[namespace]?.[key] ?? `${namespace}.${key}`;
  },
}));

vi.mock("@/templates/TotoroBirthdayInvitation", () => ({
  TotoroBirthdayInvitation: (props: Record<string, string>) => (
    <main>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
      <p>{props.detailsHeading}</p>
      <p>{props.dateLabel}</p>
      <p>{props.timeLabel}</p>
      <p>{props.locationLabel}</p>
      <p>{props.eventDate}</p>
      <p>{props.eventTime}</p>
      <p>{props.eventAddress}</p>
    </main>
  ),
}));

describe("BirthdayInvitationPage", () => {
  beforeEach(() => {
    setRequestLocaleMock.mockClear();
    activeLocale = "es";
  });

  it("renders locale-specific birthday copy for /es and keeps fixed event data", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("backend unavailable"));

    const view = await BirthdayInvitationPage({
      params: Promise.resolve({ locale: "es" }),
    });

    render(view);

    expect(setRequestLocaleMock).toHaveBeenCalledWith("es");
    expect(
      screen.getByRole("heading", { name: "¡Cumpleaños de Génesis!" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Detalles del evento")).toBeInTheDocument();
    expect(screen.getByText("02/06/2026")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("C/ N. Arauco 7")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it("renders locale-specific birthday copy for /en and keeps fixed event data", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("backend unavailable"));

    const view = await BirthdayInvitationPage({
      params: Promise.resolve({ locale: "en" }),
    });

    render(view);

    expect(setRequestLocaleMock).toHaveBeenCalledWith("en");
    expect(
      screen.getByRole("heading", { name: "Genesis's Birthday Party!" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Event details")).toBeInTheDocument();
    expect(screen.getByText("02/06/2026")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("C/ N. Arauco 7")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it("keeps static export locale params for birthday route parity", () => {
    expect(generateStaticParams()).toEqual(
      expect.arrayContaining([{ locale: "es" }, { locale: "en" }]),
    );
  });
});
