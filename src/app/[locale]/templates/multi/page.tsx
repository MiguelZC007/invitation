import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { MultiScreenInvitation } from "@/templates/MultiScreenInvitation";
import { Text } from "@/components/atoms/Text";
import { DateTimeBlock } from "@/components/molecules/DateTimeBlock";
import { LocationBlock } from "@/components/molecules/LocationBlock";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MultiTemplatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MultiTemplateContent />;
}

function MultiTemplateContent() {
  const t = useTranslations("invitation");
  const ts = useTranslations("screens");
  const tc = useTranslations("common");

  const screens = [
    {
      key: "welcome",
      content: (
        <div className="flex flex-col items-center gap-4 text-center">
          <Text variant="h1" className="text-primary">
            {ts("welcome")}
          </Text>
          <Text variant="body">{t("subtitle")}</Text>
        </div>
      ),
    },
    {
      key: "details",
      content: (
        <div className="flex flex-col items-center gap-8 text-center">
          <Text variant="h2">{ts("details")}</Text>
          <DateTimeBlock date={t("date")} time={t("time")} />
          <LocationBlock
            name={t("locationName")}
            address={t("locationAddress")}
          />
        </div>
      ),
    },
    {
      key: "confirm",
      content: (
        <div className="flex flex-col items-center gap-4 text-center">
          <Text variant="h2">{ts("confirm")}</Text>
          <Text variant="body">{t("message")}</Text>
        </div>
      ),
    },
  ];

  return (
    <MultiScreenInvitation
      screens={screens}
      nextLabel={tc("next")}
      prevLabel={tc("prev")}
    />
  );
}
