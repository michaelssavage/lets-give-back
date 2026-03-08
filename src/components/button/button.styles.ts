import { cva, type VariantProps } from "class-variance-authority";

const base =
  "font-semibold rounded-xl py-3 px-6 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-105";

export const buttonStyles = cva(base, {
  variants: {
    variant: {
      primary:
        "bg-primary-orange hover:bg-dark-orange text-white border border-dark-blue",
      outline:
        "bg-transparent text-dark-blue hover:bg-primary-orange hover:text-white border border-dark-blue",
      secondary: "bg-dark-blue text-white hover:bg-primary-blue",
      ghost:
        "text-xl bg-transparent text-black hover:text-primary-orange hover:underline p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
