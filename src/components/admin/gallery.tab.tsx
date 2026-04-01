import { deleteImages, listAllImages } from "@/api/image-upload.api";
import { Button } from "@/components/button/button";
import { cn } from "@/styles/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const GalleryTab = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data: images, isLoading } = useQuery({
    queryKey: ["images", "all"],
    queryFn: listAllImages,
  });

  const deleteMutation = useMutation({
    mutationFn: (keys: string[]) => deleteImages({ data: { keys } }),
    onSuccess: ({ deleted }) => {
      toast.success(`${deleted} image${deleted !== 1 ? "s" : ""} deleted`);
      setSelected(new Set());
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: () => {
      toast.error("Failed to delete images");
    },
  });

  const toggleSelect = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (!images) return;
    if (selected.size === images.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(images.map((img) => img.key)));
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(Array.from(selected));
  };

  const allSelected =
    images && images.length > 0 && selected.size === images.length;

  return (
    <section className="w-full mt-4 md:mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2>Gallery</h2>
        {images && images.length > 0 && (
          <Button onClick={toggleSelectAll} variant="outline" size="sm">
            {allSelected ? "Deselect all" : "Select all"}
          </Button>
        )}
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 py-12 text-center">
          Loading images...
        </p>
      )}

      {!isLoading && images?.length === 0 && (
        <p className="text-sm text-gray-500 py-12 text-center">
          No images uploaded yet.
        </p>
      )}

      {!isLoading && images && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-4">
          {images.map((image) => {
            const isSelected = selected.has(image.key);
            return (
              <button
                key={image.key}
                type="button"
                onClick={() => toggleSelect(image.key)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-md border-2 transition-all",
                  isSelected
                    ? "border-primary-blue"
                    : "border-transparent hover:border-gray-300",
                )}
              >
                <img
                  src={image.url}
                  alt={image.key}
                  className="h-full w-full object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors",
                    isSelected
                      ? "bg-black/20"
                      : "bg-black/0 group-hover:bg-black/10",
                  )}
                />
                <div
                  className={cn(
                    "absolute top-2 left-2 size-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "bg-primary-blue border-primary-blue"
                      : "bg-white/80 border-gray-300 opacity-0 group-hover:opacity-100",
                  )}
                >
                  {isSelected && (
                    <Check className="size-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white bg-black/50 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.key.split("/").pop()}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-200">
            <span className="text-sm font-medium">
              {selected.size} selected
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelected(new Set())}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
