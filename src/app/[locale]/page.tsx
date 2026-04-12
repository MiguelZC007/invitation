import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

export function HomeContent() {
  const t = useTranslations("common");
  const ti = useTranslations("invitation");
  const tb = useTranslations("birthdayInvitation");
  const tf = useTranslations("fairyTaleWedding");
  const tc = useTranslations("christmasInvitation");

  const invitationLinks = [
    {
      href: "/invitation/single",
      label: ti("title"),
      description: t("home.singleInvitationDescription"),
      className:
        "border-primary/30 bg-primary/5 text-primary hover:border-primary/50 hover:bg-primary/10",
    },
    {
      href: "/invitation/birthday",
      label: tb("invitationLink"),
      description: tb("subtitle"),
      className:
        "border-pink-500/30 bg-pink-500/5 text-pink-700 hover:border-pink-500/50 hover:bg-pink-500/10",
    },
    {
      href: "/invitation/fairy-tale-wedding",
      label: tf("invitationLink"),
      description: tf("subtitle"),
      className:
        "border-amber-500/30 bg-amber-500/5 text-amber-700 hover:border-amber-500/50 hover:bg-amber-500/10",
    },
    {
      href: "/invitation/christmas",
      label: tc("invitationLink"),
      description: tc("subtitle"),
      className:
        "border-red-500/30 bg-red-500/5 text-red-700 hover:border-red-500/50 hover:bg-red-500/10",
    },
  ];

  const templateLinks = [
    {
      href: "/templates/multi",
      label: t("home.multiTemplateLabel"),
      description: t("home.multiTemplateDescription"),
      className:
        "border-slate-500/30 bg-slate-500/5 text-slate-700 hover:border-slate-500/50 hover:bg-slate-500/10",
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-10 md:px-8">
      <header className="space-y-3 text-center md:text-left">
        <h1 className="text-4xl font-bold text-primary">{t("home.title")}</h1>
        <p className="text-lg text-muted">{t("home.subtitle")}</p>
      </header>

      <section aria-labelledby="available-invitations" className="space-y-4">
        <h2
          id="available-invitations"
          className="text-2xl font-semibold text-foreground"
        >
          {t("home.invitationsSection")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {invitationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.className}`}
            >
              <span className="block text-base font-semibold">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="available-templates" className="space-y-4">
        <h2
          id="available-templates"
          className="text-2xl font-semibold text-foreground"
        >
          {t("home.templatesSection")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {templateLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.className}`}
            >
              <span className="block text-base font-semibold">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
