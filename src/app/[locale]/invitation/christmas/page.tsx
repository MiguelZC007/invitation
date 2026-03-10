import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ChristmasInvitation } from "@/templates/ChristmasInvitation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ChristmasInvitationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ChristmasInvitationContent />;
}

function ChristmasInvitationContent() {
  const t = useTranslations("christmasInvitation");
  const tc = useTranslations("common");

  const targetDate = new Date("2026-12-25T00:00:00");

  return (
    <ChristmasInvitation
      title={t("title")}
      subtitle={t("subtitle")}
      welcomeMessage={t("welcomeMessage")}
      countdownLabel={t("countdownLabel")}
      targetDate={targetDate}
      targetDateLabel={t("targetDateLabel")}
      farewellMessage={t("farewellMessage")}
      nextLabel={tc("next")}
      prevLabel={tc("prev")}
    />
  );
}
