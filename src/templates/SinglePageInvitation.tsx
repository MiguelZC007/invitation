"use client";

import { InvitationHeader } from "@/components/organisms/InvitationHeader";
import { InvitationBody } from "@/components/organisms/InvitationBody";
import { Button } from "@/components/atoms/Button";
import { motion } from "motion/react";
import { slideUp, defaultTransition } from "@/theme/animationPresets";

type SinglePageInvitationProps = {
  title: string;
  subtitle: string;
  message: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  mapUrl?: string;
  rsvpLabel?: string;
};

export function SinglePageInvitation({
  title,
  subtitle,
  message,
  date,
  time,
  locationName,
  locationAddress,
  mapUrl,
  rsvpLabel = "Confirmar asistencia",
}: SinglePageInvitationProps) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <InvitationHeader title={title} subtitle={subtitle} />

      <InvitationBody
        message={message}
        date={date}
        time={time}
        locationName={locationName}
        locationAddress={locationAddress}
        mapUrl={mapUrl}
      />

      <motion.div
        className="py-12"
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={defaultTransition}
      >
        <Button variant="primary">{rsvpLabel}</Button>
      </motion.div>
    </div>
  );
}
