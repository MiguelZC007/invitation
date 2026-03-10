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

function HomeContent() {
  const t = useTranslations("common");
  const tf = useTranslations("fairyTaleWedding");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-primary">{t("title")}</h1>
      <p className="text-lg text-muted">{t("welcome")}</p>
      <Link
        href="/invitation/fairy-tale-wedding"
        className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white hover:bg-amber-700"
      >
        {tf("invitationLink")}
      </Link>
    </main>
  );
}
