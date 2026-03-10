import { motion } from "motion/react";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  accent:
    "bg-amber-600 text-white hover:bg-amber-700",
  outlineAccent:
    "border border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white",
} as const;

type ButtonProps = ComponentProps<typeof motion.button> & {
  variant?: keyof typeof variants;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`min-h-[44px] min-w-[44px] rounded-full px-6 py-3 font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
