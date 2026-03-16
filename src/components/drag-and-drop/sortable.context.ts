import { type UniqueIdentifier } from "@dnd-kit/core";
import { createContext, useContext } from "react";

interface SortableListContextValue {
  activeId: UniqueIdentifier | null;
}

export const SortableListContext =
  createContext<SortableListContextValue | null>(null);

export function useSortableListContext() {
  const context = useContext(SortableListContext);
  if (!context) {
    throw new Error("Sortable components must be used within SortableList");
  }
  return context;
}
