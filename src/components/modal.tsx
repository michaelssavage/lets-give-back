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
import type { ReactNode } from "react";

interface ModalProps {
  trigger: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export const Modal = ({
  trigger,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
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
