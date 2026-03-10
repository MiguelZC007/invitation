"use client";

import { useState, useEffect } from "react";
import { Text } from "@/components/atoms/Text";

type CountdownBlockProps = {
  targetDate: Date;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
  className?: string;
  labelClassName?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function CountdownBlock({
  targetDate,
  daysLabel = "días",
  hoursLabel = "horas",
  minutesLabel = "min",
  secondsLabel = "seg",
  className = "",
  labelClassName = "",
}: CountdownBlockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className={`flex flex-wrap justify-center gap-6 ${className}`}
      role="timer"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-1">
        <Text variant="h1" className="tabular-nums">
          {pad(timeLeft.days)}
        </Text>
        <Text variant="caption" className={labelClassName}>
          {daysLabel}
        </Text>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Text variant="h1" className="tabular-nums">
          {pad(timeLeft.hours)}
        </Text>
        <Text variant="caption" className={labelClassName}>
          {hoursLabel}
        </Text>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Text variant="h1" className="tabular-nums">
          {pad(timeLeft.minutes)}
        </Text>
        <Text variant="caption" className={labelClassName}>
          {minutesLabel}
        </Text>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Text variant="h1" className="tabular-nums">
          {pad(timeLeft.seconds)}
        </Text>
        <Text variant="caption" className={labelClassName}>
          {secondsLabel}
        </Text>
      </div>
    </div>
  );
}
