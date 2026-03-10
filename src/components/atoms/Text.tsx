import type { ElementType, ReactNode } from "react";

const styles = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  body: "text-base leading-relaxed",
  caption: "text-sm text-muted",
} as const;

type TextProps = {
  variant?: keyof typeof styles;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Text({
  variant = "body",
  as,
  className = "",
  children,
}: TextProps) {
  const defaultTags: Record<keyof typeof styles, ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    caption: "span",
  };

  const Tag = as ?? defaultTags[variant];

  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
}
