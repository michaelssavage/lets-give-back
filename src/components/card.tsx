import { cn } from "@/styles/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "card-shadow flex flex-col items-center justify-center gap-4 bg-light-green max-w-3xl rounded-2xl p-6 md:p-12 border",
        className
      )}
    >
      {children}
    </div>
  );
};
