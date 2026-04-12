"use client";

import { type ReactNode } from "react";
import { MultiScreenInvitation } from "./MultiScreenInvitation";
import { Text } from "@/components/atoms/Text";
import { CountdownBlock } from "@/components/molecules/CountdownBlock";
import { LocationBlock } from "@/components/molecules/LocationBlock";

type FairyTaleWeddingInvitationProps = {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  countdownLabel: string;
  targetDate: Date;
  targetDateLabel: string;
  locationName: string;
  locationAddress: string;
  farewellMessage: string;
  nextLabel: string;
  prevLabel: string;
  navigationLabel: string;
  countdownUnitLabels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

function CloudDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -right-20 -top-20 h-40 w-64 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-72 rounded-full bg-amber-50/50 blur-3xl" />
      <div className="absolute right-1/4 top-1/3 h-24 w-32 rounded-full bg-amber-100/30 blur-2xl" />
    </div>
  );
}

export function FairyTaleWeddingInvitation({
  title,
  subtitle,
  welcomeMessage,
  countdownLabel,
  targetDate,
  targetDateLabel,
  locationName,
  locationAddress,
  farewellMessage,
  nextLabel,
  prevLabel,
  navigationLabel,
  countdownUnitLabels,
}: FairyTaleWeddingInvitationProps) {
  const screens: { key: string; content: ReactNode }[] = [
    {
      key: "welcome",
      content: (
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <Text variant="h1" className="text-amber-700 md:text-5xl">
            {title}
          </Text>
          <Text variant="h3" className="text-amber-600 md:text-3xl">
            {subtitle}
          </Text>
          <Text variant="body" className="max-w-md text-amber-800">
            {welcomeMessage}
          </Text>
        </div>
      ),
    },
    {
      key: "countdown",
      content: (
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <Text variant="h2" className="text-amber-700 md:text-4xl">
            {countdownLabel}
          </Text>
          <CountdownBlock
            targetDate={targetDate}
            daysLabel={countdownUnitLabels.days}
            hoursLabel={countdownUnitLabels.hours}
            minutesLabel={countdownUnitLabels.minutes}
            secondsLabel={countdownUnitLabels.seconds}
            className="text-amber-700"
            labelClassName="text-amber-700"
          />
          <Text variant="caption" className="text-amber-700">
            {targetDateLabel}
          </Text>
        </div>
      ),
    },
    {
      key: "location",
      content: (
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <LocationBlock
            name={locationName}
            address={locationAddress}
            className="text-amber-800"
            captionClassName="text-amber-800"
            linkClassName="text-amber-600 underline hover:text-amber-700"
          />
          <Text variant="body" className="max-w-md text-amber-800">
            {farewellMessage}
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-white"
      data-template="fairy-tale-wedding"
    >
      <CloudDecoration />
      <div className="relative z-10">
        <MultiScreenInvitation
          screens={screens}
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          navigationLabel={navigationLabel}
          transitionVariant="cloud"
          buttonVariant="accent"
        />
      </div>
    </div>
  );
}
