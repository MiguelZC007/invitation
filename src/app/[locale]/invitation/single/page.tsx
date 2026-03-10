import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SinglePageInvitation } from "@/templates/SinglePageInvitation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SingleInvitationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SingleInvitationContent />;
}

function SingleInvitationContent() {
  const t = useTranslations("invitation");
  const tc = useTranslations("common");

  return (
    <SinglePageInvitation
      title={t("title")}
      subtitle={t("subtitle")}
      message={t("message")}
      date={t("date")}
      time={t("time")}
      locationName={t("locationName")}
      locationAddress={t("locationAddress")}
      rsvpLabel={tc("rsvp")}
    />
  );
}
