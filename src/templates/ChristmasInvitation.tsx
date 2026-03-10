"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { MultiScreenInvitation } from "./MultiScreenInvitation";
import { Text } from "@/components/atoms/Text";
import { CountdownBlock } from "@/components/molecules/CountdownBlock";
import { staggerContainer, slideUp, scaleIn } from "@/theme/animationPresets";

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

function ChristmasTreeSvg() {
  return (
    <svg
      viewBox="0 0 200 220"
      className="h-48 w-48"
      aria-hidden
    >
      <defs>
        <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <motion.g
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.polygon
          points="100,10 140,70 60,70"
          fill="url(#starGrad)"
          variants={scaleIn}
        />
        <motion.polygon
          points="100,50 170,130 30,130"
          fill="url(#treeGrad)"
          variants={slideUp}
        />
        <motion.polygon
          points="100,95 180,170 20,170"
          fill="url(#treeGrad)"
          variants={slideUp}
        />
        <motion.polygon
          points="100,135 185,210 15,210"
          fill="url(#treeGrad)"
          variants={slideUp}
        />
        <motion.rect
          x="85"
          y="205"
          width="30"
          height="15"
          fill="#78350f"
          rx="2"
          variants={scaleIn}
        />
        <motion.rect
          x="40"
          y="195"
          width="25"
          height="20"
          fill="#b91c1c"
          rx="2"
          variants={scaleIn}
        />
        <motion.rect
          x="75"
          y="200"
          width="20"
          height="18"
          fill="#0369a1"
          rx="2"
          variants={scaleIn}
        />
        <motion.rect
          x="105"
          y="198"
          width="22"
          height="19"
          fill="#15803d"
          rx="2"
          variants={scaleIn}
        />
        <motion.rect
          x="135"
          y="196"
          width="28"
          height="22"
          fill="#7c3aed"
          rx="2"
          variants={scaleIn}
        />
        <motion.path
          d="M52 195 L52 188 L58 188 L58 195"
          fill="#ca8a04"
          variants={scaleIn}
        />
        <motion.path
          d="M85 200 L85 193 L91 193 L91 200"
          fill="#ca8a04"
          variants={scaleIn}
        />
        <motion.path
          d="M117 198 L117 191 L123 191 L123 198"
          fill="#ca8a04"
          variants={scaleIn}
        />
        <motion.circle
          cx="70"
          cy="100"
          r="4"
          fill="#fde047"
          variants={scaleIn}
        />
        <motion.circle
          cx="130"
          cy="115"
          r="4"
          fill="#ef4444"
          variants={scaleIn}
        />
        <motion.circle
          cx="95"
          cy="155"
          r="4"
          fill="#fde047"
          variants={scaleIn}
        />
      </motion.g>
    </svg>
  );
}

function SantaSleighSvg() {
  return (
    <svg
      viewBox="0 0 300 120"
      className="h-32 w-full max-w-xs"
      aria-hidden
    >
      <defs>
        <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill="url(#nightSky)" />
      <motion.circle
        cx="250"
        cy="25"
        r="15"
        fill="#fef3c7"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {[20, 50, 80, 120, 180, 220].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={15 + (i % 3) * 8}
          r="1.5"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <motion.g
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="80" cy="70" rx="25" ry="8" fill="#78350f" />
        <path
          d="M55 70 Q55 50 75 45 L85 45 Q105 45 105 65 L105 70 Z"
          fill="#c2410c"
        />
        <circle cx="95" cy="55" r="12" fill="#fef3c7" />
        <circle cx="92" cy="53" r="2" fill="#1e293b" />
        <rect x="98" y="52" width="8" height="3" rx="1" fill="#78350f" />
        <path
          d="M55 70 L30 85 L30 88 L55 75 Z"
          fill="#166534"
        />
        <path
          d="M105 70 L130 85 L130 88 L105 75 Z"
          fill="#166534"
        />
        <path
          d="M50 72 Q20 75 15 85 L15 90 Q25 85 55 78 Z"
          fill="#b91c1c"
        />
        <path
          d="M15 85 L5 95 L5 100 L20 95 Z"
          fill="#78350f"
        />
        <path
          d="M15 95 L0 105 L0 110 L20 102 Z"
          fill="#78350f"
        />
        <path
          d="M20 88 L0 98 L0 103 L25 95 Z"
          fill="#78350f"
        />
      </motion.g>
      {[30, 60, 90, 150, 200, 260].map((x, i) => (
        <motion.g
          key={x}
          initial={{ y: 0 }}
          animate={{ y: 130 }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <circle cx={x} cy={-5} r="2" fill="white" />
        </motion.g>
      ))}
    </svg>
  );
}

function GrinchSvg() {
  return (
    <svg
      viewBox="0 0 120 160"
      className="h-48 w-36"
      aria-hidden
    >
      <motion.g
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.ellipse
          cx="60"
          cy="100"
          rx="35"
          ry="45"
          fill="#15803d"
          variants={scaleIn}
        />
        <motion.ellipse
          cx="60"
          cy="55"
          rx="28"
          ry="32"
          fill="#22c55e"
          variants={scaleIn}
        />
        <motion.path
          d="M35 55 Q35 35 55 30 L65 30 Q85 35 85 55"
          fill="#dc2626"
          variants={scaleIn}
        />
        <motion.ellipse
          cx="50"
          cy="52"
          rx="4"
          ry="5"
          fill="#1e293b"
          variants={scaleIn}
        />
        <motion.ellipse
          cx="70"
          cy="52"
          rx="4"
          ry="5"
          fill="#1e293b"
          variants={scaleIn}
        />
        <motion.path
          d="M55 65 Q60 70 65 65"
          stroke="#166534"
          strokeWidth="2"
          fill="none"
          variants={scaleIn}
        />
        <motion.path
          d="M30 85 L20 120 L25 125 L35 95 Z"
          fill="#22c55e"
          variants={slideUp}
        />
        <motion.path
          d="M90 85 L100 120 L95 125 L85 95 Z"
          fill="#22c55e"
          variants={slideUp}
        />
        <motion.path
          d="M85 40 L95 15 L100 20 L90 45 Z"
          fill="#22c55e"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}

function SnowDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -right-20 -top-20 h-40 w-64 rounded-full bg-red-50/60 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-72 rounded-full bg-green-50/40 blur-3xl" />
    </div>
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
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <ChristmasTreeSvg />
          <Text
            variant="h1"
            className="text-red-800 md:text-5xl"
          >
            {title}
          </Text>
          <Text
            variant="h3"
            className="text-green-800 md:text-3xl"
          >
            {subtitle}
          </Text>
          <Text
            variant="body"
            className="max-w-md text-green-900"
          >
            {welcomeMessage}
          </Text>
        </div>
      ),
    },
    {
      key: "countdown",
      content: (
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <SantaSleighSvg />
          <Text
            variant="h2"
            className="text-red-800 md:text-4xl"
          >
            {countdownLabel}
          </Text>
          <CountdownBlock
            targetDate={targetDate}
            daysLabel="días"
            hoursLabel="horas"
            minutesLabel="min"
            secondsLabel="seg"
            className="text-red-800"
            labelClassName="text-red-700"
          />
          <Text variant="caption" className="text-red-700">
            {targetDateLabel}
          </Text>
        </div>
      ),
    },
    {
      key: "farewell",
      content: (
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <GrinchSvg />
          <Text
            variant="body"
            className="max-w-md text-green-900"
          >
            {farewellMessage}
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-red-50"
      data-template="christmas"
    >
      <SnowDecoration />
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
