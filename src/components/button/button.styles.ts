import { cn } from "@/styles/utils";
import { cva, type VariantProps } from "class-variance-authority";

const base =
  "font-semibold rounded-xl py-2 px-4 md:py-3 md:px-6 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-105";

const buttonCva = cva(base, {
  variants: {
    variant: {
      primary:
        "bg-primary-orange hover:bg-dark-orange text-white border border-dark-blue",
      outline:
        "bg-transparent text-dark-blue hover:bg-dark-blue hover:text-white border border-dark-blue",
      secondary: "bg-dark-blue text-white hover:bg-primary-blue",
      ghost:
        "bg-transparent text-black hover:text-primary-orange hover:underline p-0",
    },
    size: {
      xs: "text-xs rounded-md md:text-sm py-0.5 px-1.5 md:py-1 md:px-2 [&_svg]:size-3 md:[&_svg]:size-4",
      sm: "text-sm md:text-base py-1 px-2 md:py-2 md:px-4 [&_svg]:size-4 md:[&_svg]:size-5",
      md: "text-lg md:text-xl",
      lg: "text-xl md:text-2xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonCva>;

export function buttonStyles({
  variant,
  size,
  className,
}: ButtonVariants & { className?: string }) {
  return cn(buttonCva({ variant, size }), className);
}
