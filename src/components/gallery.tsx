import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";

const GalleryImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`group relative overflow-hidden rounded-xl w-full h-full cursor-zoom-in ${className ?? ""}`}
        aria-label={`View image: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </DialogTrigger>

      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className="w-auto max-w-[90vw] p-3">
          <div className="flex justify-between items-center gap-4 mb-2">
            <DialogTitle className="text-base font-medium truncate">
              {alt}
            </DialogTitle>
            <DialogClose />
          </div>
          <DialogDescription>{alt}</DialogDescription>
          <img
            src={src}
            alt={alt}
            className="rounded-lg max-h-[80vh] object-contain"
          />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
};

export const Gallery = ({ images }: { images: string[] }) => {
  const visible = images.slice(0, 3);

  if (visible.length === 0) return null;

  if (visible.length === 1) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden">
        <GalleryImage src={visible[0]} alt="Gallery image 1" className="" />
      </div>
    );
  }

  if (visible.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 h-64">
        {visible.map((src, i) => (
          <GalleryImage key={src} src={src} alt={`Gallery image ${i + 1}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-72">
      <GalleryImage src={visible[0]} alt="Gallery image 1" />
      <div className="grid grid-rows-2 gap-2">
        <GalleryImage src={visible[1]} alt="Gallery image 2" />
        <GalleryImage src={visible[2]} alt="Gallery image 3" />
      </div>
    </div>
  );
};
