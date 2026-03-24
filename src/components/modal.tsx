import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";
import { buttonStyles } from "@/components/button/button.styles";
import type { ReactNode } from "react";

interface ModalProps {
  trigger: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  trigger,
  title,
  description,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonStyles({ variant: "outline", size: "sm" })}
      >
        {trigger}
      </DialogTrigger>

      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className={className}>
          <div className="flex justify-between items-center gap-4">
            <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
            <DialogClose />
          </div>

          <DialogDescription>{description}</DialogDescription>

          {children}
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
};
