import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover";
import { Button } from "@/components/button/button";
import { buttonStyles } from "@/components/button/button.styles";
import { TextInput } from "@/components/form/text-input";
import { YoutubeIcon } from "@/components/icons/youtube.icon";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { useState } from "react";

const activeButton =
  "bg-primary-orange text-white [&_svg:not([class*='text-'])]:text-white hover:bg-primary-orange/90 focus:bg-primary-orange/90 border-transparent";

export const TiptapYoutube = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { isYoutubeActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isYoutubeActive: ctx.editor.isActive("youtube"),
    }),
  });

  const addVideo = (url: string) => {
    if (!url) return;

    editor.commands.setYoutubeVideo({ src: url });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        title="YouTube"
        className={buttonStyles({
          variant: "outline",
          size: "sm",
          className: isYoutubeActive
            ? activeButton
            : "hover:[&_svg]:fill-white",
        })}
      >
        <YoutubeIcon className="size-4" />
      </PopoverTrigger>

      <PopoverContent>
        <div className="space-y-2">
          <TextInput
            className="h-8"
            id="youtube-url"
            label="YouTube URL"
            name="youtube-url"
            type="text"
            placeholder="Enter YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              title="Cancel"
              size="xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!url.trim()}
              onClick={() => addVideo(url)}
              title="Add"
              size="xs"
            >
              Add
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
