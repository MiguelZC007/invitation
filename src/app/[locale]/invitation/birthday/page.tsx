import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { TotoroBirthdayInvitation } from "@/templates/TotoroBirthdayInvitation";

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

  return (
    <TotoroBirthdayInvitation
      title={t("title")}
      subtitle={t("subtitle")}
      introHeading={t("introHeading")}
      celebrationHeading={t("celebrationHeading")}
      farewellHeading={t("farewellHeading")}
      introMessage={t("introMessage")}
      celebrationMessage={t("celebrationMessage")}
      farewellMessage={t("farewellMessage")}
      detailsHeading={t("detailsHeading")}
      dateLabel={t("dateLabel")}
      timeLabel={t("timeLabel")}
      locationLabel={t("locationLabel")}
      eventDate={t("eventDate")}
      eventTime={t("eventTime")}
      eventAddress={t("eventAddress")}
    />
  );
}
