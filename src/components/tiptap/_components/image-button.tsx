import { ImageUpload } from "@/components/admin/projects/image-upload";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/base/dialog";
import { Button } from "@/components/button/button";
import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageButtonProps {
  editor: Editor;
}

export const ImageButton = ({ editor }: ImageButtonProps) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setIsImageDialogOpen(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setIsImageDialogOpen(true)}
        title="Add Image"
      >
        <ImageIcon className="size-4" />
      </Button>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
            <DialogDescription>Add an image to the editor</DialogDescription>
          </DialogHeader>

          <ImageUpload
            folder="projects"
            onUpload={(url) => addImage(url)}
            allowMultiple
          />
        </DialogPopup>
      </Dialog>
    </>
  );
};
