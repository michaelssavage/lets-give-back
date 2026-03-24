import { Button } from "@/components/button/button";
import { type Editor } from "@tiptap/react";
import {
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  PanelTop,
  Trash,
} from "lucide-react";

type TableSettingsProps = {
  editor: Editor;
  closePopover: () => void;
};

export const TableSettings = ({ editor, closePopover }: TableSettingsProps) => {
  const runAction = (action: () => void) => {
    action();
    closePopover();
  };

  return (
    <div className="flex flex-col items-center gap-1 [&_button]:w-full [&_button]:rounded-sm [&_button]:flex [&_button]:items-center [&_button]:gap-2">
      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().toggleHeaderRow().run())
        }
      >
        <PanelTop className="size-4" />
        Toggle Header Row
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().addRowBefore().run())
        }
      >
        <ArrowUpToLine className="size-4" />
        Insert Above
      </Button>
      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().addRowAfter().run())
        }
      >
        <ArrowDownToLine className="size-4" />
        Insert Below
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().addColumnBefore().run())
        }
      >
        <ArrowLeftToLine className="size-4" />
        Insert Left
      </Button>
      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().addColumnAfter().run())
        }
      >
        <ArrowRightToLine className="size-4" />
        Insert Right
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().deleteRow().run())
        }
      >
        <Trash className="size-4" />
        Delete Row
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().deleteColumn().run())
        }
      >
        <Trash className="size-4" />
        Delete Column
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={() =>
          runAction(() => editor.chain().focus().deleteTable().run())
        }
      >
        <Trash className="size-4" />
        Delete
      </Button>
    </div>
  );
};
