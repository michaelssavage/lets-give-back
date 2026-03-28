import { buttonStyles } from "@/components/button/button.styles";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  title?: string;
}

export const Button = ({
  children,
  type = "button",
  className,
  variant = "primary",
  size = "md",
  disabled,
  title,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};
