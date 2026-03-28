import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { z } from "zod";

export type ServiceImage = {
  id: string;
  type: "image";
  image: string;
  alt: string;
  sort_order: number;
  created_date: string;
};

export type ServiceText = {
  id: string;
  type: "text";
  description: string;
  sort_order: number;
  created_date: string;
};

export type Service = ServiceImage | ServiceText;

interface ServiceRow {
  id: string;
  type: "image" | "text";
  sort_order: number;
  created_date: string;
  image: string;
  alt: string;
  description: string;
}

function rowToService(row: ServiceRow): Service {
  if (row.type === "image") {
    return {
      id: row.id,
      type: "image",
      image: row.image,
      alt: row.alt,
      sort_order: row.sort_order,
      created_date: row.created_date,
    };
  }
  return {
    id: row.id,
    type: "text",
    description: row.description,
    sort_order: row.sort_order,
    created_date: row.created_date,
  };
}

export const getServicesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { results } = await env.DB.prepare(
      "SELECT * FROM services ORDER BY sort_order ASC",
    ).all<ServiceRow>();
    return results.map(rowToService);
  },
);

const createServiceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("image"),
    image: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal("text"),
    description: z.string(),
  }),
]);

export const createServiceFn = createServerFn({ method: "POST" })
  .inputValidator(createServiceSchema)
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
    const created_date = new Date().toISOString().split("T")[0];

    const { results } = await env.DB.prepare(
      "SELECT MAX(sort_order) AS max_order FROM services",
    ).all<{ max_order: number | null }>();
    const nextOrder = (results[0]?.max_order ?? -1) + 1;

    if (data.type === "image") {
      await env.DB.prepare(
        `INSERT INTO services (id, type, sort_order, created_date, image, alt, description)
         VALUES (?, 'image', ?, ?, ?, ?, '')`,
      )
        .bind(id, nextOrder, created_date, data.image, data.alt)
        .run();
    } else {
      await env.DB.prepare(
        `INSERT INTO services (id, type, sort_order, created_date, image, alt, description)
         VALUES (?, 'text', ?, ?, '', '', ?)`,
      )
        .bind(id, nextOrder, created_date, data.description)
        .run();
    }

    return { id };
  });

const updateServiceSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("image"),
    sort_order: z.number().int(),
    created_date: z.string(),
    image: z.string(),
    alt: z.string(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("text"),
    sort_order: z.number().int(),
    created_date: z.string(),
    description: z.string(),
  }),
]);

export const updateServiceFn = createServerFn({ method: "POST" })
  .inputValidator(updateServiceSchema)
  .handler(async ({ data }) => {
    if (data.type === "image") {
      await env.DB.prepare(
        `UPDATE services
         SET type = 'image', sort_order = ?, created_date = ?, image = ?, alt = ?, description = ''
         WHERE id = ?`,
      )
        .bind(data.sort_order, data.created_date, data.image, data.alt, data.id)
        .run();
    } else {
      await env.DB.prepare(
        `UPDATE services
         SET type = 'text', sort_order = ?, created_date = ?, image = '', alt = '', description = ?
         WHERE id = ?`,
      )
        .bind(data.sort_order, data.created_date, data.description, data.id)
        .run();
    }
    return { success: true };
  });

export const deleteServiceFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await env.DB.prepare("DELETE FROM services WHERE id = ?")
      .bind(data.id)
      .run();
    return { success: true };
  });
