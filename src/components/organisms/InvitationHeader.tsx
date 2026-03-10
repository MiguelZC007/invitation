"use client";

import { motion } from "motion/react";
import { TitleSubtitle } from "@/components/molecules/TitleSubtitle";
import { staggerContainer, fadeIn, defaultTransition } from "@/theme/animationPresets";

type InvitationHeaderProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export function InvitationHeader({
  title,
  subtitle,
  className = "",
}: InvitationHeaderProps) {
  return (
    <motion.header
      className={`flex flex-col items-center justify-center gap-6 px-6 py-16 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeIn} transition={defaultTransition}>
        <TitleSubtitle title={title} subtitle={subtitle} />
      </motion.div>
    </motion.header>
  );
}
