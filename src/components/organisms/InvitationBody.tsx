"use client";

import { motion } from "motion/react";
import { Text } from "@/components/atoms/Text";
import { DateTimeBlock } from "@/components/molecules/DateTimeBlock";
import { LocationBlock } from "@/components/molecules/LocationBlock";
import { staggerContainer, slideUp, defaultTransition } from "@/theme/animationPresets";

type InvitationBodyProps = {
  message: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  mapUrl?: string;
  className?: string;
};

export function InvitationBody({
  message,
  date,
  time,
  locationName,
  locationAddress,
  mapUrl,
  className = "",
}: InvitationBodyProps) {
  return (
    <motion.section
      className={`flex flex-col items-center gap-10 px-6 py-12 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={slideUp} transition={defaultTransition}>
        <Text variant="body" className="max-w-md text-center">
          {message}
        </Text>
      </motion.div>

      <motion.div variants={slideUp} transition={defaultTransition}>
        <DateTimeBlock date={date} time={time} />
      </motion.div>

      <motion.div variants={slideUp} transition={defaultTransition}>
        <LocationBlock
          name={locationName}
          address={locationAddress}
          mapUrl={mapUrl}
        />
      </motion.div>
    </motion.section>
  );
}
