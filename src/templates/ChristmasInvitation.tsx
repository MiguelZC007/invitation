"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { MultiScreenInvitation } from "./MultiScreenInvitation";
import { Text } from "@/components/atoms/Text";
import { CountdownBlock } from "@/components/molecules/CountdownBlock";
import { scaleIn } from "@/theme/animationPresets";

type ChristmasInvitationProps = {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  countdownLabel: string;
  targetDate: Date;
  targetDateLabel: string;
  farewellMessage: string;
  nextLabel?: string;
  prevLabel?: string;
};

const IMAGE_TREE = "/images/christmas/christmas-tree.png";
const IMAGE_SLEIGH = "/images/christmas/santa-sleigh.png";
const IMAGE_GRINCH = "/images/christmas/grinch-wave.png";

function ScreenWithBackground({
  backgroundImage,
  children,
}: {
  backgroundImage: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center gap-6 bg-cover bg-center bg-no-repeat px-6 py-8 text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/35" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-6">
        {children}
      </div>
    </motion.div>
  );
}

export function ChristmasInvitation({
  title,
  subtitle,
  welcomeMessage,
  countdownLabel,
  targetDate,
  targetDateLabel,
  farewellMessage,
  nextLabel = "Siguiente",
  prevLabel = "Anterior",
}: ChristmasInvitationProps) {
  const screens: { key: string; content: ReactNode }[] = [
    {
      key: "welcome",
      content: (
        <ScreenWithBackground backgroundImage={IMAGE_TREE}>
          <Text variant="h1" className="text-white drop-shadow-lg md:text-5xl">
            {title}
          </Text>
          <Text variant="h3" className="text-white drop-shadow-md md:text-3xl">
            {subtitle}
          </Text>
          <Text
            variant="body"
            className="max-w-md text-white drop-shadow-md"
          >
            {welcomeMessage}
          </Text>
        </ScreenWithBackground>
      ),
    },
    {
      key: "countdown",
      content: (
        <ScreenWithBackground backgroundImage={IMAGE_SLEIGH}>
          <Text variant="h2" className="text-white drop-shadow-lg md:text-4xl">
            {countdownLabel}
          </Text>
          <CountdownBlock
            targetDate={targetDate}
            daysLabel="días"
            hoursLabel="horas"
            minutesLabel="min"
            secondsLabel="seg"
            className="text-white drop-shadow-md"
            labelClassName="text-white/90 drop-shadow-md"
          />
          <Text variant="caption" className="text-white drop-shadow-md">
            {targetDateLabel}
          </Text>
        </ScreenWithBackground>
      ),
    },
    {
      key: "farewell",
      content: (
        <ScreenWithBackground backgroundImage={IMAGE_GRINCH}>
          <Text
            variant="body"
            className="max-w-md text-white drop-shadow-lg"
          >
            {farewellMessage}
          </Text>
        </ScreenWithBackground>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-slate-900"
      data-template="christmas"
    >
      <div className="relative z-10">
        <MultiScreenInvitation
          screens={screens}
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          transitionVariant="cloud"
          buttonVariant="accent"
        />
      </div>
    </div>
  );
}
