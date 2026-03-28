import { createServerFn } from "@tanstack/react-start";
import type { JSONContent } from "@tiptap/core";
import { env } from "cloudflare:workers";
import { z } from "zod";

export interface Project {
  id: string;
  date: string;
  slug: string;
  title: string;
  subtitle: string;
  description: JSONContent;
  image: string;
  facebook: string;
  sort_order: number;
}

interface ProjectRow {
  id: string;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  facebook: string;
  sort_order: number;
}

function rowToProject(row: ProjectRow): Project {
  return {
    ...row,
    description: JSON.parse(row.description) as JSONContent,
  };
}

export const getProjectsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { results } = await env.DB.prepare(
      "SELECT * FROM projects ORDER BY sort_order ASC",
    ).all<ProjectRow>();
    return results.map(rowToProject);
  },
);

export const getProjectBySlugFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const row = await env.DB.prepare(
      "SELECT * FROM projects WHERE slug = ? LIMIT 1",
    )
      .bind(data.slug)
      .first<ProjectRow | null>();
    if (!row) return null;
    return rowToProject(row);
  });

const updateProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  date: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(), // JSON-serialised JSONContent
  image: z.string(),
  facebook: z.string(),
});

export const updateProjectFn = createServerFn({ method: "POST" })
  .inputValidator(updateProjectSchema)
  .handler(async ({ data }) => {
    await env.DB.prepare(
      `UPDATE projects
       SET slug = ?, date = ?, title = ?, subtitle = ?, description = ?, image = ?, facebook = ?
       WHERE id = ?`,
    )
      .bind(
        data.slug,
        data.date,
        data.title,
        data.subtitle,
        data.description,
        data.image,
        data.facebook,
        data.id,
      )
      .run();
    return { success: true };
  });

export const saveProjectOrderFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ projects: z.array(z.object({ id: z.string() })) }))
  .handler(async ({ data }) => {
    await env.DB.batch(
      data.projects.map((project, index) =>
        env.DB.prepare("UPDATE projects SET sort_order = ? WHERE id = ?").bind(
          index,
          project.id,
        ),
      ),
    );
    return { success: true };
  });

export const createProjectFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ title: z.string().min(1) }))
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const date = new Date().toISOString().split("T")[0];

    const { results } = await env.DB.prepare(
      "SELECT MAX(sort_order) AS max_order FROM projects",
    ).all<{ max_order: number | null }>();
    const nextOrder = (results[0]?.max_order ?? 0) + 1;

    await env.DB.prepare(
      `INSERT INTO projects (id, slug, date, title, subtitle, description, image, facebook, sort_order)
       VALUES (?, ?, ?, ?, '', '{}', '', '', ?)`,
    )
      .bind(id, slug, date, data.title, nextOrder)
      .run();

    return { id, slug };
  });

export const deleteProjectFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await env.DB.prepare("DELETE FROM projects WHERE id = ?")
      .bind(data.id)
      .run();
    return { success: true };
  });
