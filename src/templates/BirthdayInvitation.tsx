"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { MultiScreenInvitation } from "./MultiScreenInvitation";
import { Text } from "@/components/atoms/Text";
import { CountdownBlock } from "@/components/molecules/CountdownBlock";
import { scaleIn } from "@/theme/animationPresets";

type BirthdayInvitationProps = {
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

function BalloonDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute -left-8 top-20 h-24 w-24 text-pink-400/60"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="14" rx="8" ry="10" fill="currentColor" />
        <path d="M12 4 L12 14 M8 12 L16 12" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg
        className="absolute -right-12 top-32 h-32 w-32 text-amber-400/50"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="14" rx="8" ry="10" fill="currentColor" />
        <path d="M12 4 L12 14" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg
        className="absolute -left-4 bottom-32 h-20 w-20 text-cyan-400/50"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="14" rx="8" ry="10" fill="currentColor" />
        <path d="M12 4 L12 14" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg
        className="absolute right-16 bottom-24 h-28 w-28 text-rose-400/40"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="14" rx="8" ry="10" fill="currentColor" />
        <path d="M12 4 L12 14" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="absolute left-1/4 top-12 h-2 w-2 rounded-full bg-yellow-400/60" />
      <div className="absolute right-1/3 top-24 h-3 w-3 rounded-full bg-pink-400/50" />
      <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-cyan-400/60" />
      <div className="absolute right-1/4 bottom-1/3 h-2 w-2 rounded-full bg-amber-400/50" />
    </div>
  );
}

function BirthdayScreen({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center gap-6 px-6 py-8 text-center"
    >
      <div className="relative z-10 flex flex-col items-center gap-6">
        {children}
      </div>
    </motion.div>
  );
}

export function BirthdayInvitation({
  title,
  subtitle,
  welcomeMessage,
  countdownLabel,
  targetDate,
  targetDateLabel,
  farewellMessage,
  nextLabel = "Siguiente",
  prevLabel = "Anterior",
}: BirthdayInvitationProps) {
  const screens: { key: string; content: ReactNode }[] = [
    {
      key: "welcome",
      content: (
        <BirthdayScreen>
          <Text variant="h1" className="text-pink-600 md:text-5xl">
            {title}
          </Text>
          <Text variant="h3" className="text-amber-600 md:text-3xl">
            {subtitle}
          </Text>
          <Text variant="body" className="max-w-md text-slate-700">
            {welcomeMessage}
          </Text>
        </BirthdayScreen>
      ),
    },
    {
      key: "countdown",
      content: (
        <BirthdayScreen>
          <Text variant="h2" className="text-pink-600 md:text-4xl">
            {countdownLabel}
          </Text>
          <CountdownBlock
            targetDate={targetDate}
            daysLabel="días"
            hoursLabel="horas"
            minutesLabel="min"
            secondsLabel="seg"
            className="text-pink-600"
            labelClassName="text-amber-600"
          />
          <Text variant="caption" className="text-slate-600">
            {targetDateLabel}
          </Text>
        </BirthdayScreen>
      ),
    },
    {
      key: "farewell",
      content: (
        <BirthdayScreen>
          <Text variant="body" className="max-w-md text-slate-700">
            {farewellMessage}
          </Text>
        </BirthdayScreen>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-cyan-50"
      data-template="birthday"
    >
      <BalloonDecoration />
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
