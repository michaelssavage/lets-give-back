import { buttonStyles } from "@/components/button/button.styles";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  type = "button",
  className,
  variant = "primary",
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ variant, className })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
