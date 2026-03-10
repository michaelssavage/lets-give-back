import { cn } from "@/styles/utils";
import { cva, type VariantProps } from "class-variance-authority";

const base =
  "text-lg md:text-xl font-semibold rounded-xl py-2 md:py-3 px-4 md:px-6 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-105";

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
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof buttonCva>;

export function buttonStyles({
  variant,
  className,
}: ButtonVariants & { className?: string }) {
  return cn(buttonCva({ variant }), className);
}
