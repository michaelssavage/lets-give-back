import { MenuBar } from "@/components/tiptap/_components/menu-bar";
import { TiptapImage } from "@/components/tiptap/_extensions/tiptap-image";
import { TiptapTable } from "@/components/tiptap/_extensions/tiptap-table";
import { TiptapVideo } from "@/components/tiptap/_extensions/tiptap-video";
import {
  isImageUrl,
  isMarkdownTable,
  normalizeEditorContent,
  parseMarkdownTable,
} from "@/components/tiptap/tiptap-utils";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useRef } from "react";

interface TiptapEditorProps {
  id: string;
  content: JSONContent;
  onChange: (content: JSONContent) => void;
  // uploadImageUrl: string;
}

export const TiptapEditor = ({ id, content, onChange }: TiptapEditorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const normalizedContent = useMemo(
    () => normalizeEditorContent(content),
    [content],
  );

  const extensions = [
    StarterKit.configure({
      horizontalRule: false,
      link: { openOnClick: false, enableClickSelection: true },
    }),
    HorizontalRule,
    TiptapImage.configure({ allowBase64: true, inline: true }),
    TiptapVideo.configure({ inline: true }),
    Youtube.configure({ controls: false, nocookie: true }),
    TextAlign.configure({ types: ["heading", "paragraph", "image", "video"] }),
    TiptapTable,
    TableRow,
    TableHeader,
    TableCell,
  ];

  const editor = useEditor({
    extensions,
    content: normalizedContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      handlePaste: (_view, event) => {
        if (!editor) return false;
        const text = event.clipboardData?.getData("text/plain")?.trim();

        if (text && isImageUrl(text)) {
          event.preventDefault();
          editor.chain().focus().setImage({ src: text, width: 300 }).run();
          return true;
        }

        if (text && isMarkdownTable(text)) {
          event.preventDefault();
          const tableNode = parseMarkdownTable(text);
          if (tableNode) {
            editor.chain().focus().insertContent(tableNode).run();
          }
          return true;
        }

        return false;
      },
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "b") {
          event.stopPropagation();
          return false;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = JSON.stringify(editor.getJSON());
    const nextContent = JSON.stringify(normalizedContent);
    if (currentContent === nextContent) return;

    // Keep editor state in sync when content changes externally (e.g. translation updates).
    editor.commands.setContent(normalizedContent, { emitUpdate: false });
  }, [editor, normalizedContent]);

  useEffect(() => {
    if (!editor) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".ProseMirror")) return;
      event.preventDefault();
      editor.chain().focus("end").run();
    };

    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [editor]);

  if (!editor) return null;

  return (
    <div id={id} className="border rounded-md bg-white">
      <MenuBar editor={editor} />
      <div
        ref={scrollContainerRef}
        className="max-h-[500px] xl:max-h-[600px] overflow-y-auto overflow-x-hidden cursor-text"
      >
        <EditorContent
          editor={editor}
          placeholder="Write something..."
          className="tiptap-content tiptap-editor"
        />
      </div>
    </div>
  );
};
