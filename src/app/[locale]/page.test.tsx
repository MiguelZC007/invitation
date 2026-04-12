import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { type ReactNode } from "react";
import { HomeContent } from "./page";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const messages: Record<string, Record<string, string>> = {
      common: {
        "home.title": "Invitaciones y rutas disponibles",
        "home.subtitle":
          "Elegí una invitación o revisá las plantillas activas del proyecto.",
        "home.invitationsSection": "Invitaciones",
        "home.templatesSection": "Plantillas",
        "home.singleInvitationDescription": "Single description",
        "home.multiTemplateLabel": "Template multi-screen",
        "home.multiTemplateDescription": "Multi description",
      },
      invitation: {
        title: "Te invitamos",
      },
      birthdayInvitation: {
        invitationLink: "Ver invitación de cumpleaños",
        subtitle: "Te esperamos para celebrar",
      },
      fairyTaleWedding: {
        invitationLink: "Ver invitación",
        subtitle: "Te invitamos a vivir con nosotros esta historia",
      },
      christmasInvitation: {
        invitationLink: "Ver invitación navideña",
        subtitle: "Te invitamos a celebrar",
      },
    };

    return (key: string) => messages[namespace]?.[key] ?? `${namespace}.${key}`;
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    className,
    children,
  }: {
    href: string;
    className?: string;
    children: ReactNode;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("HomeContent", () => {
  it("shows all invitation and template routes", () => {
    render(<HomeContent />);

    const links = screen.getAllByRole("link");
    const getLinkByHref = (href: string) => {
      const link = links.find((item) => item.getAttribute("href") === href);
      if (!link) {
        throw new Error(`Link not found for href: ${href}`);
      }
      return link;
    };

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Invitaciones y rutas disponibles",
      }),
    ).toBeInTheDocument();

    expect(getLinkByHref("/invitation/single")).toHaveTextContent(
      "Te invitamos",
    );
    expect(getLinkByHref("/invitation/birthday")).toHaveTextContent(
      "Ver invitación de cumpleaños",
    );
    expect(getLinkByHref("/invitation/fairy-tale-wedding")).toHaveTextContent(
      "Ver invitación",
    );
    expect(getLinkByHref("/invitation/christmas")).toHaveTextContent(
      "Ver invitación navideña",
    );
    expect(getLinkByHref("/templates/multi")).toHaveTextContent(
      "Template multi-screen",
    );
  });
});
