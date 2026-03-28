import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapViewerProps {
  content: JSONContent;
}

export const TiptapViewer = ({ content }: TiptapViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} className="tiptap-content" />;
};
