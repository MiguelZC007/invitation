"use client";

import { useState, type ReactNode } from "react";
import { ScreenTransition } from "@/components/organisms/ScreenTransition";
import { Button } from "@/components/atoms/Button";

type Screen = {
  key: string;
  content: ReactNode;
};

type MultiScreenInvitationProps = {
  screens: Screen[];
  nextLabel?: string;
  prevLabel?: string;
  transitionVariant?: "default" | "cloud";
  buttonVariant?: "default" | "accent";
};

export function MultiScreenInvitation({
  screens,
  nextLabel = "Siguiente",
  prevLabel = "Anterior",
  transitionVariant = "default",
  buttonVariant = "default",
}: MultiScreenInvitationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = screens[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === screens.length - 1;

  const nextButtonVariant = buttonVariant === "accent" ? "accent" : "primary";
  const prevButtonVariant =
    buttonVariant === "accent" ? "outlineAccent" : "outline";

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex flex-1 items-center justify-center">
        <ScreenTransition screenKey={current.key} variant={transitionVariant}>
          {current.content}
        </ScreenTransition>
      </div>

      <nav className="flex gap-4 pb-8" aria-label="Navegación de pantallas">
        {!isFirst && (
          <Button
            variant={prevButtonVariant}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            {prevLabel}
          </Button>
        )}
        {!isLast && (
          <Button
            variant={nextButtonVariant}
            onClick={() => setCurrentIndex((i) => i + 1)}
          >
            {nextLabel}
          </Button>
        )}
      </nav>
    </div>
  );
}
