import { mergeAttributes, Node } from "@tiptap/core";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: {
        src: string;
        width?: number;
        height?: number;
      }) => ReturnType;
    };
  }
}

function TiptapVideoNodeView({ node }: NodeViewProps) {
  const { src, width, height } = node.attrs;

  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper"
      style={{ textAlign: node.attrs.textAlign ?? "left" }}
    >
      <video
        src={src}
        controls
        width={width ?? 640}
        height={height ?? 360}
        style={{ maxWidth: "100%", height: "auto" }}
        contentEditable={false}
      >
        <track kind="captions" />
      </video>
    </NodeViewWrapper>
  );
}

export const TiptapVideo = Node.create({
  name: "video",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => {
          if (!attributes.src) return {};
          return { src: attributes.src };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => {
          const width = element.getAttribute("width");
          return width ? Number(width) : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: String(attributes.width) };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height = element.getAttribute("height");
          return height ? Number(height) : null;
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

  parseHTML() {
    return [
      {
        tag: "video[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes, { controls: "" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TiptapVideoNodeView);
  },

  addCommands() {
    return {
      setVideo:
        (options: { src: string; width?: number; height?: number }) =>
        ({ commands }): boolean => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
