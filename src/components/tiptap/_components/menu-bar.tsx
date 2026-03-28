import { Separator } from "@/components/base/separator";
import { Button } from "@/components/button/button";
import { TiptapLink } from "@/components/tiptap/_extensions/tiptap-link";
import { TiptapYoutube } from "@/components/tiptap/_extensions/tiptap-youtube";

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@/components/base/menu";
import { buttonStyles } from "@/components/button/button.styles";
import { cn } from "@/styles/utils";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Minus,
  Redo,
  TextInitial,
  Undo,
} from "lucide-react";
import { TableButton } from "./table-button";

const isItemActive =
  "bg-primary-orange text-white [&_svg:not([class*='text-'])]:text-white hover:bg-primary-orange/90 focus:bg-primary-orange/90 border-transparent";

interface MenuBarProps {
  editor: Editor;
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isTextAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isTextAlignCenter:
          ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isTextAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isTextAlignJustify:
          ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isHorizontalRule: ctx.editor.isActive("horizontalRule") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const textAlign = (align: "left" | "center" | "right" | "justify") => {
    editor.commands.setTextAlign(align);
  };

  const isHeadingActive = [
    editorState.isHeading1,
    editorState.isHeading2,
    editorState.isHeading3,
    editorState.isHeading4,
  ].some(Boolean);

  const isTextAlignActive = [
    editorState.isTextAlignCenter,
    editorState.isTextAlignRight,
    editorState.isTextAlignJustify,
  ].some(Boolean);

  return (
    <>
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 rounded-t-md top-0 z-1 [&_button]:py-1 [&_button]:px-2">
        <Menu>
          <MenuTrigger
            title="Heading"
            className={buttonStyles({
              variant: isHeadingActive ? "primary" : "outline",
              size: "sm",
            })}
          >
            <Heading className="size-4" />
          </MenuTrigger>
          <MenuContent className="flex flex-col gap-2 px-2">
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={editorState.isHeading1 ? isItemActive : ""}
            >
              <Heading1 className="size-5" />
            </MenuItem>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={editorState.isHeading2 ? isItemActive : ""}
            >
              <Heading2 className="size-5" />
            </MenuItem>

            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={editorState.isHeading3 ? isItemActive : ""}
            >
              <Heading3 className="size-5" />
            </MenuItem>

            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={editorState.isHeading4 ? isItemActive : ""}
            >
              <Heading4 className="size-5" />
            </MenuItem>
          </MenuContent>
        </Menu>

        <Button
          type="button"
          size="sm"
          variant={editorState.isBold ? "primary" : "outline"}
          className={cn(
            "border",
            editorState.isBold ? "border-transparent" : "",
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          title="Bold"
        >
          <Bold className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editorState.isItalic ? "primary" : "outline"}
          className={cn(
            "border",
            editorState.isItalic ? "border-transparent" : "",
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          title="Italic"
        >
          <Italic className="size-4" />
        </Button>

        <TiptapLink editor={editor} editorState={editorState} />

        <Separator orientation="vertical" className="mx-1" />

        <Menu>
          <MenuTrigger
            title="Text Align"
            className={buttonStyles({
              variant: isTextAlignActive ? "primary" : "outline",
              size: "sm",
            })}
          >
            <TextInitial className="size-4" />
          </MenuTrigger>
          <MenuContent className="flex flex-col gap-2 min-w-fit px-2">
            <MenuItem
              onClick={() => textAlign("left")}
              className={editorState.isTextAlignLeft ? isItemActive : ""}
              title="Left"
            >
              <AlignLeft className="size-5" />
            </MenuItem>
            <MenuItem
              onClick={() => textAlign("center")}
              className={editorState.isTextAlignCenter ? isItemActive : ""}
              title="Center"
            >
              <AlignCenter className="size-5" />
            </MenuItem>
            <MenuItem
              onClick={() => textAlign("right")}
              className={editorState.isTextAlignRight ? isItemActive : ""}
              title="Right"
            >
              <AlignRight className="size-5" />
            </MenuItem>
            <MenuItem
              onClick={() => textAlign("justify")}
              className={editorState.isTextAlignJustify ? isItemActive : ""}
              title="Justify"
            >
              <AlignJustify className="size-5" />
            </MenuItem>
          </MenuContent>
        </Menu>

        <Button
          type="button"
          size="sm"
          variant={editorState.isBulletList ? "primary" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editorState.isOrderedList ? "primary" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          <ListOrdered className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editorState.isHorizontalRule ? "primary" : "outline"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="size-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1" />

        {/* <ImageButton editor={editor} uploadUrl={uploadUrl} imagesUrl={imagesUrl} /> */}
        <TiptapYoutube editor={editor} />

        <TableButton editor={editor} />

        <Separator orientation="vertical" className="mx-1" />

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          title="Undo"
        >
          <Undo className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          title="Redo"
        >
          <Redo className="size-4" />
        </Button>
      </div>
    </>
  );
};
