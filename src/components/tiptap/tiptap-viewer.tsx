import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import {
  EditorContent,
  mergeAttributes,
  useEditor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapViewerProps {
  content: JSONContent;
}

const CustomTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "table-container" },
      [
        "table",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ],
    ];
  },
});

export const TiptapViewer = ({ content }: TiptapViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ horizontalRule: false }),
      Image.configure({
        inline: true,
        HTMLAttributes: { class: "inline-block" },
      }),
      Youtube,
      HorizontalRule,
      TextAlign.configure({
        types: ["heading", "paragraph", "image", "video"],
      }),
      CustomTable,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} className="tiptap-content" />;
};
