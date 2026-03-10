import { motion } from "motion/react";
import { Text } from "@/components/atoms/Text";
import { slideUp, defaultTransition } from "@/theme/animationPresets";

type TitleSubtitleProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export function TitleSubtitle({
  title,
  subtitle,
  className = "",
}: TitleSubtitleProps) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-2 text-center ${className}`}
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={defaultTransition}
    >
      <Text variant="h1">{title}</Text>
      <Text variant="caption" as="p">
        {subtitle}
      </Text>
    </motion.div>
  );
}
