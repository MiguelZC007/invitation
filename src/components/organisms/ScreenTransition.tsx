"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  fadeIn,
  cloudTransition,
  defaultTransition,
  cloudTransitionTiming,
} from "@/theme/animationPresets";
import type { ReactNode } from "react";

type ScreenTransitionVariant = "default" | "cloud";

type ScreenTransitionProps = {
  screenKey: string;
  children: ReactNode;
  className?: string;
  variant?: ScreenTransitionVariant;
};

export function ScreenTransition({
  screenKey,
  children,
  className = "",
  variant = "default",
}: ScreenTransitionProps) {
  const variants = variant === "cloud" ? cloudTransition : fadeIn;
  const transition =
    variant === "cloud" ? cloudTransitionTiming : defaultTransition;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        className={className}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
