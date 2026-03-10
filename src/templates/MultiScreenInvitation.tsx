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
};

export function MultiScreenInvitation({
  screens,
  nextLabel = "Siguiente",
  prevLabel = "Anterior",
}: MultiScreenInvitationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = screens[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === screens.length - 1;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex flex-1 items-center justify-center">
        <ScreenTransition screenKey={current.key}>
          {current.content}
        </ScreenTransition>
      </div>

      <nav className="flex gap-4 pb-8" aria-label="Navegación de pantallas">
        {!isFirst && (
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            {prevLabel}
          </Button>
        )}
        {!isLast && (
          <Button
            variant="primary"
            onClick={() => setCurrentIndex((i) => i + 1)}
          >
            {nextLabel}
          </Button>
        )}
      </nav>
    </div>
  );
}
