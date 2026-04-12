import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BirthdayInvitation } from "@/templates/BirthdayInvitation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BirthdayInvitationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BirthdayInvitationContent />;
}

function BirthdayInvitationContent() {
  const t = useTranslations("birthdayInvitation");
  const tc = useTranslations("common");

  const targetDate = new Date("2026-06-15T18:00:00");

  return (
    <BirthdayInvitation
      title={t("title")}
      subtitle={t("subtitle")}
      welcomeMessage={t("welcomeMessage")}
      countdownLabel={t("countdownLabel")}
      targetDate={targetDate}
      targetDateLabel={t("targetDateLabel")}
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
