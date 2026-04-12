import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { FairyTaleWeddingInvitation } from "@/templates/FairyTaleWeddingInvitation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FairyTaleWeddingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FairyTaleWeddingContent />;
}

function FairyTaleWeddingContent() {
  const t = useTranslations("fairyTaleWedding");
  const tc = useTranslations("common");

  const targetDate = new Date("2026-03-31T00:00:00");

  return (
    <FairyTaleWeddingInvitation
      title={t("title")}
      subtitle={t("subtitle")}
      welcomeMessage={t("welcomeMessage")}
      countdownLabel={t("countdownLabel")}
      targetDate={targetDate}
      targetDateLabel={t("targetDateLabel")}
      locationName={t("locationName")}
      locationAddress={t("locationAddress")}
      farewellMessage={t("farewellMessage")}
      nextLabel={tc("next")}
      prevLabel={tc("prev")}
      navigationLabel={tc("screenNavigation")}
      countdownUnitLabels={{
        days: tc("countdown.days"),
        hours: tc("countdown.hours"),
        minutes: tc("countdown.minutes"),
        seconds: tc("countdown.seconds"),
      }}
    />
  );
}
