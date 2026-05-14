import { useEffect, useRef } from "react";

export const useFocus = ({ isOpen }: { isOpen: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // small delay helps if modal content mounts asynchronously
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  return inputRef;
};
