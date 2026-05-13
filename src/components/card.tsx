import { Button } from "@/components/button/button";
import { cn } from "@/styles/utils";
import { ArrowRightIcon } from "lucide-react";

type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  variant?: "overlay" | "stacked";
  className?: string;
};

export const Card = ({
  title,
  subtitle,
  image,
  variant = "overlay",
  className,
}: CardProps) => {
  if (variant === "overlay") {
    return (
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-black card-shadow bg-background",
          className,
        )}
      >
        <div className="group relative aspect-4/3">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35 transition-all duration-300 group-hover:bg-black/45" />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="flex-1 text-base md:text-lg text-secondary text-left">
            {subtitle}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="group flex items-center gap-1 ml-auto mt-4"
          >
            View Project
            <ArrowRightIcon className="size-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl card-shadow",
        className,
      )}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>
        <p className="text-sm text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};
