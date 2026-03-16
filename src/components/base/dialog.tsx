import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { X } from "lucide-react";

export const Dialog = (props: React.ComponentProps<typeof DialogBase.Root>) => {
  return <DialogBase.Root {...props} />;
};

export const DialogTrigger = (
  props: React.ComponentProps<typeof DialogBase.Trigger>,
) => {
  return <DialogBase.Trigger {...props} />;
};

export const DialogPortal = (
  props: React.ComponentProps<typeof DialogBase.Portal>,
) => {
  return <DialogBase.Portal {...props} />;
};

export const DialogBackdrop = (
  props: React.ComponentProps<typeof DialogBase.Backdrop>,
) => {
  return (
    <DialogBase.Backdrop
      className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute"
      {...props}
    />
  );
};

export const DialogPopup = (
  props: React.ComponentProps<typeof DialogBase.Popup>,
) => {
  return (
    <DialogBase.Popup
      className="fixed top-1/2 left-1/2 w-120 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-6 text-black outline-1 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0"
      {...props}
    />
  );
};

export const DialogTitle = (
  props: React.ComponentProps<typeof DialogBase.Title>,
) => {
  return <DialogBase.Title {...props} />;
};

export const DialogDescription = (
  props: React.ComponentProps<typeof DialogBase.Description>,
) => {
  return <DialogBase.Description className="sr-only" {...props} />;
};

export const DialogClose = (
  props: React.ComponentProps<typeof DialogBase.Close>,
) => {
  return (
    <DialogBase.Close
      className="rounded-full border hover:bg-gray-100 p-1"
      {...props}
    >
      <X className="size-4" />
    </DialogBase.Close>
  );
};
