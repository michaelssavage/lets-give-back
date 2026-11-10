import { cn } from "@/styles/utils";

interface PhotoPrintProps {
  src: string;
  alt: string;
  caption?: string;
  /** Show a strip of masking tape across the top edge */
  taped?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * A photo styled like a printed snapshot: white border, caption underneath,
 * optional tape. Gives real project photos a hand-made, pinned-up feel.
 */
export const PhotoPrint = ({
  src,
  alt,
  caption,
  taped = false,
  className,
  imgClassName,
}: PhotoPrintProps) => {
  return (
    <figure
      className={cn(
        "relative bg-white p-2 pb-3 md:p-3 md:pb-4 border border-black",
        className,
      )}
    >
      {taped && (
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 w-20 h-6 bg-light-orange/80 border border-black/10"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("w-full aspect-3/4 object-cover", imgClassName)}
      />
      {caption && (
        <figcaption className="text-sm md:text-base text-secondary text-center mt-2 md:mt-3 text-balance">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
