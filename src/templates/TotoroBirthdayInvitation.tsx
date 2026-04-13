"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Text } from "@/components/atoms/Text";
import { fadeIn, slideUp } from "@/theme/animationPresets";

export type TotoroBirthdayInvitationProps = {
  title: string;
  subtitle: string;
  introHeading: string;
  celebrationHeading: string;
  farewellHeading: string;
  introMessage: string;
  celebrationMessage: string;
  farewellMessage: string;
  eventDate: string;
  eventTime: string;
  eventAddress: string;
  detailsHeading: string;
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
  locationMapUrl?: string;
  mapLabel?: string;
};

const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const MOBILE_BREAKPOINT = 768;

type ViewportMode = "mobile" | "desktop";

function resolveViewportMode(width: number): ViewportMode {
  return width < MOBILE_BREAKPOINT ? "mobile" : "desktop";
}

function DecorativeForest({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      data-decorative="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute -right-12 top-14 h-48 w-48 rounded-full bg-lime-200/50 blur-3xl" />
      <div className="absolute bottom-14 left-8 h-10 w-10 rounded-full bg-amber-200/70" />
      <div className="absolute right-12 top-1/3 h-8 w-8 rounded-full bg-emerald-300/70" />
      <div
        className={
          reducedMotion
            ? "absolute left-1/3 top-24 h-12 w-12 rounded-full bg-lime-300/60"
            : "absolute left-1/3 top-24 h-12 w-12 rounded-full bg-lime-300/60 motion-safe:animate-bounce"
        }
      />
    </div>
  );
}

export function TotoroBirthdayInvitation({
  title,
  subtitle,
  introHeading,
  celebrationHeading,
  farewellHeading,
  introMessage,
  celebrationMessage,
  farewellMessage,
  eventDate,
  eventTime,
  eventAddress,
  detailsHeading,
  dateLabel,
  timeLabel,
  locationLabel,
  locationMapUrl,
  mapLabel,
}: TotoroBirthdayInvitationProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const [viewportMode, setViewportMode] = useState<ViewportMode>(() =>
    typeof window === "undefined"
      ? "mobile"
      : resolveViewportMode(window.innerWidth),
  );

  useEffect(() => {
    const updateViewportMode = () => {
      setViewportMode(resolveViewportMode(window.innerWidth));
    };

    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  const sectionVariants = reducedMotion ? reducedMotionVariants : slideUp;
  const wrapperVariants = reducedMotion ? reducedMotionVariants : fadeIn;

  return (
    <main
      data-template="birthday"
      data-testid="birthday-motion-state"
      data-motion={reducedMotion ? "reduced" : "standard"}
      data-viewport={viewportMode}
      className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 overflow-hidden bg-gradient-to-b from-emerald-50 via-lime-50 to-amber-50 px-6 py-10 text-slate-800 md:gap-10 md:px-10"
    >
      <DecorativeForest reducedMotion={reducedMotion} />

      <motion.header
        initial="hidden"
        animate="visible"
        variants={wrapperVariants}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
        className="relative z-10 space-y-3 text-center"
      >
        <Text variant="h1" className="text-emerald-900 md:text-5xl">
          {title}
        </Text>
        <Text variant="h3" className="text-emerald-800 md:text-3xl">
          {subtitle}
        </Text>
      </motion.header>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{
          duration: reducedMotion ? 0 : 0.35,
          delay: reducedMotion ? 0 : 0.05,
        }}
        className="relative z-10 space-y-3 rounded-2xl bg-white/85 p-6 shadow-sm"
        aria-labelledby="birthday-intro"
      >
        <h2
          id="birthday-intro"
          className="text-3xl font-semibold tracking-tight text-emerald-900"
        >
          {introHeading}
        </h2>
        <Text>{introMessage}</Text>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{
          duration: reducedMotion ? 0 : 0.35,
          delay: reducedMotion ? 0 : 0.1,
        }}
        className="relative z-10 space-y-4 rounded-2xl bg-white/90 p-6 shadow-sm"
        aria-labelledby="birthday-details"
      >
        <h2
          id="birthday-details"
          className="text-3xl font-semibold tracking-tight text-emerald-900"
        >
          {detailsHeading}
        </h2>

        <dl className="grid gap-2 text-left">
          <div className="grid grid-cols-[minmax(5rem,auto)_1fr] items-start gap-2">
            <dt className="font-semibold text-emerald-900">{dateLabel}</dt>
            <dd>{eventDate}</dd>
          </div>
          <div className="grid grid-cols-[minmax(5rem,auto)_1fr] items-start gap-2">
            <dt className="font-semibold text-emerald-900">{timeLabel}</dt>
            <dd>{eventTime}</dd>
          </div>
          <div className="grid grid-cols-[minmax(5rem,auto)_1fr] items-start gap-2">
            <dt className="font-semibold text-emerald-900">{locationLabel}</dt>
            <dd>{eventAddress}</dd>
          </div>
        </dl>

        {locationMapUrl && mapLabel ? (
          <a
            href={locationMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md text-sm font-medium text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            {mapLabel}
          </a>
        ) : null}
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{
          duration: reducedMotion ? 0 : 0.35,
          delay: reducedMotion ? 0 : 0.15,
        }}
        className="relative z-10 space-y-3 rounded-2xl bg-white/85 p-6 shadow-sm"
        aria-labelledby="birthday-celebration"
      >
        <h2
          id="birthday-celebration"
          className="text-3xl font-semibold tracking-tight text-emerald-900"
        >
          {celebrationHeading}
        </h2>
        <Text>{celebrationMessage}</Text>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{
          duration: reducedMotion ? 0 : 0.35,
          delay: reducedMotion ? 0 : 0.2,
        }}
        className="relative z-10 space-y-3 rounded-2xl bg-white/85 p-6 shadow-sm"
        aria-labelledby="birthday-farewell"
      >
        <h2
          id="birthday-farewell"
          className="text-3xl font-semibold tracking-tight text-emerald-900"
        >
          {farewellHeading}
        </h2>
        <Text>{farewellMessage}</Text>
      </motion.section>
    </main>
  );
}
