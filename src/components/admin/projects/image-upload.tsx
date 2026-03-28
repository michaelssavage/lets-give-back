import {
  listImages,
  uploadImage,
  uploadImageFromUrl,
} from "@/api/image-upload.api";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";
import { Button } from "@/components/button/button";
import { buttonStyles } from "@/components/button/button.styles";
import { baseInputStyles } from "@/components/form/base.styles";
import { NoImagesIcon } from "@/components/icons/no-images.icon";
import { cn } from "@/styles/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Images, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

function uploadErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Upload failed. Please try again.";
}

interface ImageUploadProps {
  currentUrl?: string;
  folder: string;
  onUpload: (url: string) => void;
  allowMultiple?: boolean;
  canRemove?: boolean;
}

type ImagePayload =
  | { type: "file"; formData: FormData }
  | { type: "url"; url: string };

export const ImageUpload = ({
  currentUrl,
  folder,
  onUpload,
  allowMultiple = false,
  canRemove = true,
}: ImageUploadProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (payload: ImagePayload) => {
      if (payload.type === "file") {
        return uploadImage({ data: payload.formData });
      }
      return uploadImageFromUrl({ data: { url: payload.url, folder } });
    },
    onSuccess: ({ url }) => {
      onUpload(url);
      setUrlInput("");
      toast.success("Image uploaded");
    },
    onError: (error) => {
      toast.error(uploadErrorMessage(error));
    },
  });

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["images", folder],
    queryFn: () => listImages({ data: { folder } }),
    enabled: galleryOpen,
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    mutation.mutate({ type: "file", formData });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    multiple: allowMultiple,
    disabled: mutation.isPending,
  });

  const handleUrlUpload = () => {
    if (!urlInput.trim()) return;
    mutation.mutate({ type: "url", url: urlInput.trim() });
  };

  const handleSelectImage = (url: string) => {
    onUpload(url);
    setGalleryOpen(false);
    toast.success("Image selected");
  };

  const handleRemoveImage = () => {
    onUpload("");
    toast.success("Image removed");
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-secondary">Image</span>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {currentUrl ? (
          <div className="relative size-32">
            <img
              src={currentUrl}
              alt="Project"
              className="size-full rounded-md object-cover"
            />
            {canRemove && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 p-0 md:p-0"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        ) : (
          <NoImagesIcon className="size-32" />
        )}

        <div className="flex flex-col w-full items-center gap-2">
          <div className="flex gap-2 w-full">
            <input
              type="url"
              placeholder="Paste an image URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={mutation.isPending}
              className={cn(baseInputStyles, "flex-1")}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleUrlUpload}
              disabled={!urlInput.trim() || mutation.isPending}
            >
              Upload
            </Button>

            <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
              <DialogTrigger
                className={buttonStyles({ variant: "outline", size: "sm" })}
              >
                <Images className="size-4" />
              </DialogTrigger>

              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup className="w-[min(90vw,640px)] bg-light-blue">
                  <div className="flex justify-between items-center gap-4 mb-4">
                    <DialogTitle className="text-xl font-medium">
                      Media Library
                    </DialogTitle>
                    <DialogClose />
                  </div>

                  {imagesLoading && (
                    <p className="text-sm text-gray-500 py-8 text-center">
                      Loading images...
                    </p>
                  )}

                  {!imagesLoading && images?.length === 0 && (
                    <p className="text-sm text-gray-500 py-8 text-center">
                      No images in this folder yet.
                    </p>
                  )}

                  {!imagesLoading && images && images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {images.map((image) => (
                        <button
                          key={image.key}
                          type="button"
                          onClick={() => handleSelectImage(image.url)}
                          className={cn(
                            "group relative aspect-square overflow-hidden rounded-md border-2 transition-all",
                            currentUrl === image.url
                              ? "border-primary-blue"
                              : "border-transparent hover:border-gray-300",
                          )}
                        >
                          <img
                            src={image.url}
                            alt={image.key}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          {currentUrl === image.url && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="rounded-full bg-primary-blue px-2 py-0.5 text-xs text-white">
                                Selected
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>

          <div
            {...getRootProps()}
            className={cn(
              baseInputStyles,
              "flex cursor-pointer flex-col items-center justify-center gap-1 py-6 text-center transition border-2 border-dashed",
              isDragActive && "border-gray-900 bg-gray-50",
              mutation.isPending && "cursor-not-allowed opacity-50",
            )}
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-500">
              {isDragActive
                ? "Drop image here"
                : "Drag & drop or click to upload"}
            </p>
          </div>
        </div>
      </div>

      {mutation.isError && (
        <p className="text-xs text-red-500">Upload failed. Please try again.</p>
      )}
    </div>
  );
};
