import type { Variants, Transition } from "motion/react";
import { transitionDuration } from "./tokens";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cloudTransition: Variants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: { opacity: 1, scale: 1 },
};

export const defaultTransition: Transition = {
  duration: transitionDuration.normal,
  ease: "easeOut",
};

export const cloudTransitionTiming: Transition = {
  duration: 0.6,
  ease: "easeOut",
};
