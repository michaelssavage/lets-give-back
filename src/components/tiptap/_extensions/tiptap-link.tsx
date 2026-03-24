import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover";
import { Button } from "@/components/button/button";
import { buttonStyles } from "@/components/button/button.styles";
import { TextInput } from "@/components/form/text-input";
import { cn } from "@/styles/utils";
import { type Editor } from "@tiptap/react";
import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TiptapLinkProps {
  editor: Editor;
  editorState: {
    isLink: boolean;
  };
}

export const TiptapLink = ({ editor, editorState }: TiptapLinkProps) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  const resetLinkState = () => {
    setIsLinkOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  const addLink = (url: string, text?: string) => {
    if (!url) return;

    if (hasSelection) {
      // Text is selected - just add the link to it
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: url,
        })
        .run();
    } else {
      // No selection - insert new link
      const displayText = text || url;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: displayText,
          marks: [{ type: "link", attrs: { href: url } }],
        })
        .run();
    }

    resetLinkState();
  };

  const updateLink = (url: string, text?: string) => {
    if (!url) return;

    if (text) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent({
          type: "text",
          text,
          marks: [{ type: "link", attrs: { href: url } }],
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }

    resetLinkState();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  useEffect(() => {
    if (!isLinkOpen) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    const hasTextSelection = from !== to;

    setHasSelection(hasTextSelection);

    if (editorState.isLink) {
      // Editing an existing link
      const { href } = editor.getAttributes("link");
      setLinkUrl(href || "");
      setLinkText(selectedText);
    } else {
      setLinkUrl("");
      setLinkText(hasTextSelection ? selectedText : "");
    }
  }, [isLinkOpen, editorState.isLink, editor]);

  return (
    <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
      <PopoverTrigger
        className={buttonStyles({
          variant: editorState.isLink ? "primary" : "outline",
          size: "sm",
          className: cn(
            "border",
            editorState.isLink ? "border-transparent" : "",
          ),
        })}
        title="Link"
      >
        <Link2 className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <TextInput
            className="h-8"
            id="link-url"
            name="link-url"
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && hasSelection) {
                e.preventDefault();
                addLink(linkUrl);
              }
            }}
          />

          {!hasSelection && (
            <TextInput
              className="h-8"
              id="link-text"
              name="link-text"
              label="Link Text"
              placeholder="Leave empty to use URL"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLink(linkUrl, linkText);
                }
              }}
            />
          )}

          <div className="flex justify-end flex-wrap gap-2">
            <Button
              type="button"
              onClick={() =>
                editorState.isLink
                  ? updateLink(linkUrl, linkText)
                  : addLink(linkUrl, linkText)
              }
              disabled={!linkUrl.trim()}
              size="xs"
            >
              {editorState.isLink ? "Update" : "Insert"}
            </Button>
            {editorState.isLink && (
              <Button
                type="button"
                variant="outline"
                onClick={removeLink}
                size="xs"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
