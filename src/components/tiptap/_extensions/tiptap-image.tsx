import { mergeAttributes } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseWidthFromStyle(style: string | null) {
  if (!style) return null;
  const match = style.match(/width:\s*(\d+)px/i);
  if (!match) return null;
  const width = Number(match[1]);
  return Number.isFinite(width) ? width : null;
}

function RichImageNodeView({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const widthAttr =
    typeof node.attrs.width === "number" ? (node.attrs.width as number) : null;
  const heightAttr =
    typeof node.attrs.height === "number"
      ? (node.attrs.height as number)
      : null;

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const rectWidth = imgRef.current?.getBoundingClientRect().width ?? 0;
    const naturalWidth = imgRef.current?.naturalWidth ?? 0;
    const startWidth =
      widthAttr ??
      (rectWidth > 0 ? rectWidth : naturalWidth > 0 ? naturalWidth : 200);

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaX = ev.clientX - startX;
      const nextWidth = clamp(Math.round(startWidth + deltaX), 50, 1400);
      updateAttributes({ width: nextWidth });
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Best-effort; ignore if not supported.
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleImageLoad = () => {
    if (typeof node.attrs.width === "number") return;
    const img = imgRef.current;
    if (!img) return;

    const naturalWidth = img.naturalWidth || 0;
    if (!naturalWidth) return;

    const editorEl = img.closest(".ProseMirror");
    const editorWidth = editorEl?.getBoundingClientRect().width ?? 0;
    const maxWidth = editorWidth ? Math.max(50, Math.floor(editorWidth)) : 800;
    const initialWidth = clamp(naturalWidth, 50, maxWidth);

    updateAttributes({ width: initialWidth });
  };

  const textAlign = node.attrs.textAlign ?? "left";

  return (
    <NodeViewWrapper
      as="span"
      className={`relative inline-block align-middle ${selected ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
      style={{ textAlign }}
      data-drag-handle
    >
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt ?? ""}
        title={node.attrs.title ?? ""}
        {...(widthAttr && { width: widthAttr })}
        {...(heightAttr && { height: heightAttr })}
        style={{ maxWidth: "100%", height: "auto" }}
        onLoad={handleImageLoad}
        draggable={false}
        contentEditable={false}
      />

      <span
        contentEditable={false}
        role="button"
        tabIndex={-1}
        aria-label="Resize image"
        onPointerDown={onResizePointerDown}
        className="absolute bottom-1 right-1 size-3 cursor-se-resize rounded-sm bg-blue-600/70 shadow-sm"
      />
    </NodeViewWrapper>
  );
}

export const TiptapImage = Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const widthAttr = element.getAttribute("width");
          if (widthAttr) {
            const parsed = Number(widthAttr);
            if (Number.isFinite(parsed)) return parsed;
          }
          return parseWidthFromStyle(element.getAttribute("style"));
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: String(attributes.width) };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const heightAttr = element.getAttribute("height");
          if (!heightAttr) return null;
          const parsed = Number(heightAttr);
          return Number.isFinite(parsed) ? parsed : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: String(attributes.height) };
        },
      },
      textAlign: {
        default: null,
        parseHTML: (element) => element.style.textAlign || null,
        renderHTML: (attributes) => {
          if (!attributes.textAlign) return {};
          return { style: `text-align: ${attributes.textAlign}` };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RichImageNodeView);
  },
});
