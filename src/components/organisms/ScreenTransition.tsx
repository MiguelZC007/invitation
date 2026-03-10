"use client";

import { AnimatePresence, motion } from "motion/react";
import { fadeIn, defaultTransition } from "@/theme/animationPresets";
import type { ReactNode } from "react";

type ScreenTransitionProps = {
  screenKey: string;
  children: ReactNode;
  className?: string;
};

export function ScreenTransition({
  screenKey,
  children,
  className = "",
}: ScreenTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        className={className}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={defaultTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
