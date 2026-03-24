import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover";
import { buttonStyles } from "@/components/button/button.styles";
import { cn } from "@/styles/utils";
import { useEditorState, type Editor } from "@tiptap/react";
import { Table } from "lucide-react";
import { useMemo, useState } from "react";
import { TableSettings } from "./table-settings";

const activeButton =
  "bg-primary-orange text-white [&_svg:not([class*='text-'])]:text-white hover:bg-primary-orange/90 focus:bg-primary-orange/90 border-transparent";

export const TableButton = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSize, setHoveredSize] = useState({ rows: 0, cols: 0 });

  const { isTableActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isTableActive: ctx.editor.isActive("table"),
    }),
  });

  const sizeLabel = useMemo(() => {
    if (!hoveredSize.rows || !hoveredSize.cols) {
      return "1 x 1";
    }
    return `${hoveredSize.rows} x ${hoveredSize.cols}`;
  }, [hoveredSize.cols, hoveredSize.rows]);

  const insertTable = (rows: number, cols: number) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        title="Table"
        className={buttonStyles({
          variant: "outline",
          size: "sm",
          className: isTableActive ? activeButton : "",
        })}
      >
        <Table className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-2 shadow-none">
        {isTableActive ? (
          <TableSettings
            editor={editor}
            closePopover={() => setIsOpen(false)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div
              className="grid grid-cols-6 gap-1"
              onMouseLeave={() => setHoveredSize({ rows: 0, cols: 0 })}
            >
              {Array.from({ length: 6 }).map((_, rowIndex) =>
                Array.from({ length: 6 }).map((__, colIndex) => {
                  const rows = rowIndex + 1;
                  const cols = colIndex + 1;
                  const isActive =
                    rows <= hoveredSize.rows && cols <= hoveredSize.cols;
                  return (
                    <button
                      key={`${rows}-${cols}`}
                      type="button"
                      className={cn(
                        "size-5 rounded-sm border border-secondary transition",
                        isActive
                          ? "bg-primary/20 border-primary-orange"
                          : "bg-gray-100",
                      )}
                      onMouseEnter={() => setHoveredSize({ rows, cols })}
                      onClick={() => insertTable(rows, cols)}
                      title={`Insert ${rows} x ${cols} table`}
                      aria-label={`Insert ${rows} x ${cols} table`}
                    />
                  );
                }),
              )}
            </div>
            <div className="text-xs text-secondary text-center">
              {sizeLabel}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
