import { cn } from "@/styles/utils";
import { Separator as BaseSeparator } from "@base-ui/react/separator";

interface SeparatorProps {
  orientation: "horizontal" | "vertical";
  className?: string;
}

export const Separator = ({
  orientation = "vertical",
  className,
}: SeparatorProps) => {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "bg-dark-blue shrink-0",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-auto data-[orientation=vertical]:self-stretch data-[orientation=vertical]:w-px",
        className,
      )}
    />
  );
};
