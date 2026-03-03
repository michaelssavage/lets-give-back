import { cn } from "@/styles/utils";
import type { ReactNode } from "react";

interface AnchorProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

export const Anchor = ({
  href,
  children,
  isExternal,
  className,
}: AnchorProps) => {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn("flex items-center gap-2", className)}
    >
      {children}
    </a>
  );
};
