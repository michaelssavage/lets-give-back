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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  triggerStyle?: string;
}

export const Modal = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
  triggerStyle,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        className={buttonStyles({
          variant: "outline",
          size: "sm",
          className: triggerStyle,
        })}
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
