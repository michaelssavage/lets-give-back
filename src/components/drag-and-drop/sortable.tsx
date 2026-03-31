import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DraggableAttributes,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  type SortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { type ReactNode, useState } from "react";
import { SortableListContext } from "./sortable.context";

interface HandleProps {
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  className?: string;
}

interface SortableListProps<T> {
  items: T[];
  onReorder: (newOrder: T[]) => void | Promise<void>;
  getItemId: (item: T) => UniqueIdentifier;
  children: ReactNode;
  activationDistance?: number;
  strategy?: SortingStrategy;
}

interface SortableItemProps {
  id: string | number;
  children: (props: {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
    isDragging: boolean;
    dragHandleProps: {
      listeners?: SyntheticListenerMap;
      attributes: DraggableAttributes;
    };
  }) => React.ReactNode;
}

export const DragHandle = ({
  attributes,
  listeners,
  className = "",
}: HandleProps) => {
  return (
    <div
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing touch-none ${className}`}
    >
      <Grip className="size-5 text-gray-400 shrink-0" />
    </div>
  );
};
export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      {children({
        ref: setNodeRef,
        style,
        isDragging,
        dragHandleProps: { listeners, attributes },
      })}
    </>
  );
}

export function SortableList<T>({
  items,
  onReorder,
  getItemId,
  children,
  activationDistance = 8,
  strategy = verticalListSortingStrategy,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: activationDistance,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => getItemId(item) === active.id);
      const newIndex = items.findIndex((item) => getItemId(item) === over.id);

      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      await onReorder(reorderedItems);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <SortableListContext.Provider value={{ activeId }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items.map(getItemId)} strategy={strategy}>
          {children}
        </SortableContext>
      </DndContext>
    </SortableListContext.Provider>
  );
}
