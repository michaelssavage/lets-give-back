import { Button } from "@/components/button/button";
import { cn } from "@/styles/utils";
import { ArrowRightIcon } from "lucide-react";

type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  /** Small factual line above the title, e.g. the project date */
  meta?: string;
  variant?: "overlay" | "stacked" | "row";
  className?: string;
};

export const Card = ({
  title,
  subtitle,
  image,
  meta,
  variant = "overlay",
  className,
}: CardProps) => {
  if (variant === "row") {
    return (
      <article
        className={cn(
          "group flex items-center gap-4 sm:gap-6 rounded-sm border border-black bg-background p-3 text-left transition-colors hover:bg-white",
          className,
        )}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-24 sm:w-36 aspect-4/3 shrink-0 rounded-sm object-cover"
        />

        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">{title}</h2>
          {meta && <p className="text-sm text-secondary">{meta}</p>}
          <p className="text-sm sm:text-base text-secondary line-clamp-3">
            {subtitle}
          </p>
        </div>

        <ArrowRightIcon
          aria-hidden
          className="hidden sm:inline-block size-6 shrink-0 mr-1 transition-transform duration-200 group-hover:translate-x-1"
        />
      </article>
    );
  }

  if (variant === "overlay") {
    return (
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-sm border border-black bg-background",
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
    <div className={cn("flex flex-col overflow-hidden rounded-sm", className)}>
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
