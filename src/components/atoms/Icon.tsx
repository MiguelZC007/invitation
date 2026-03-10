import type { ReactNode } from "react";

type IconProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
} as const;

export function Icon({ children, size = "md", className = "" }: IconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
