import { Table } from "@tiptap/extension-table";
import { mergeAttributes } from "@tiptap/react";

export const TiptapTable = Table.extend({
  name: "table",

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "table-container" },
      [
        "table",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ],
    ];
  },
});
