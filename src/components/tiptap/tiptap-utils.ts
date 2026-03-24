import type { JSONContent } from "@tiptap/react";

const DefaultJSONContent: JSONContent = { type: "doc", content: [] };

export const isImageUrl = (text: string) => {
  const trimmed = text.trim();
  // Allow query params/fragments after extension.
  return /^https?:\/\/\S+\.(png|jpe?g|gif|webp|svg)(\?\S*)?(#\S*)?$/i.test(
    trimmed,
  );
};

export const isMarkdownTable = (text: string): boolean => {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return false;

  // Check for separator line (e.g., |---|---|)
  return lines.some((line) => /^\|?[\s-:|]+\|?$/.test(line.trim()));
};

export const parseMarkdownTable = (text: string): JSONContent | null => {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim());
  if (lines.length < 2) return null;

  // Find separator line index
  const separatorIndex = lines.findIndex((line) =>
    /^\|?[\s-:|]+\|?$/.test(line.trim()),
  );
  if (separatorIndex === -1) return null;

  const headerLines = lines.slice(0, separatorIndex);
  const bodyLines = lines.slice(separatorIndex + 1);

  const parseRow = (line: string): string[] => {
    return line
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell, index, arr) => {
        // Remove empty first/last cells from lines starting/ending with |
        if (index === 0 && cell === "") return false;
        if (index === arr.length - 1 && cell === "") return false;
        return true;
      });
  };

  const rows: JSONContent[] = [];

  // Add header rows
  headerLines.forEach((line) => {
    const cells = parseRow(line);
    rows.push({
      type: "tableRow",
      content: cells.map((cell) => ({
        type: "tableHeader",
        content: [
          { type: "paragraph", content: [{ type: "text", text: cell }] },
        ],
      })),
    });
  });

  // Add body rows
  bodyLines.forEach((line) => {
    const cells = parseRow(line);
    rows.push({
      type: "tableRow",
      content: cells.map((cell) => ({
        type: "tableCell",
        content: [
          { type: "paragraph", content: [{ type: "text", text: cell }] },
        ],
      })),
    });
  });

  return {
    type: "table",
    content: rows,
  };
};

export const toParagraphDoc = (text: string): JSONContent => ({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text }],
    },
  ],
});

const isTipTapDoc = (value: unknown): value is JSONContent => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const candidate = value as { type?: unknown; content?: unknown };
  return candidate.type === "doc" && Array.isArray(candidate.content);
};

export const normalizeEditorContent = (
  content: JSONContent | string | undefined,
): JSONContent => {
  if (!content) return DefaultJSONContent;

  if (typeof content !== "string") return content;

  const trimmed = content.trim();
  if (!trimmed) return DefaultJSONContent;

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (isTipTapDoc(parsed)) return parsed;

    if (typeof parsed === "string" && parsed.trim()) {
      return toParagraphDoc(parsed);
    }
  } catch {
    // Not JSON; treat it as plain text to avoid HTML parsing side effects.
  }

  return toParagraphDoc(content);
};
