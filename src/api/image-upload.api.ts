import { getCurrentUserFromSession } from "@/api/auth.server";
import { MEDIA_URL } from "@/utils/constants";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { z } from "zod";

export const listImages = createServerFn({ method: "POST" })
  .inputValidator(z.object({ folder: z.string().min(1) }))
  .handler(async ({ data }) => {
    const user = await getCurrentUserFromSession();
    if (!user) throw new Error("Unauthorized");

    const list = await env.MEDIA_BUCKET.list({ prefix: `${data.folder}/` });

    return list.objects.map((obj) => ({
      key: obj.key,
      url: import.meta.env.DEV
        ? `/api/media?key=${encodeURIComponent(obj.key)}`
        : `${MEDIA_URL}/${obj.key}`,
    }));
  });

const uploadImageSchema = z
  .instanceof(FormData)
  .transform((data) => {
    const file = data.get("file");
    const folder = data.get("folder") as string | null;

    return { file, folder };
  })
  .pipe(
    z.object({
      file: z.instanceof(File, { message: "No file provided" }),
      folder: z.string().min(1, { message: "Folder is required" }),
    }),
  );

const uploadImageFromUrlSchema = z.object({
  url: z.url({ message: "Invalid URL" }),
  folder: z.string().min(1, { message: "Folder is required" }),
});

export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator(uploadImageSchema)
  .handler(async ({ data }) => {
    const user = await getCurrentUserFromSession();
    if (!user) throw new Error("Unauthorized");

    const { file, folder } = data;

    if (!file || !(file instanceof File)) throw new Error("No file provided");

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const key = `${folder}/${Date.now()}-${safeName}`;

    await env.MEDIA_BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    const url = import.meta.env.DEV
      ? `/api/media?key=${encodeURIComponent(key)}`
      : `${MEDIA_URL}/${key}`;
    return { url };
  });

export const listAllImages = createServerFn({ method: "POST" }).handler(
  async () => {
    const user = await getCurrentUserFromSession();
    if (!user) throw new Error("Unauthorized");

    const list = await env.MEDIA_BUCKET.list();

    return list.objects.map((obj) => ({
      key: obj.key,
      url: import.meta.env.DEV
        ? `/api/media?key=${encodeURIComponent(obj.key)}`
        : `${MEDIA_URL}/${obj.key}`,
    }));
  },
);

export const deleteImages = createServerFn({ method: "POST" })
  .inputValidator(z.object({ keys: z.array(z.string().min(1)) }))
  .handler(async ({ data }) => {
    const user = await getCurrentUserFromSession();
    if (!user) throw new Error("Unauthorized");

    await Promise.all(data.keys.map((key) => env.MEDIA_BUCKET.delete(key)));

    return { deleted: data.keys.length };
  });

export const uploadImageFromUrl = createServerFn({ method: "POST" })
  .inputValidator(uploadImageFromUrlSchema)
  .handler(async ({ data }) => {
    const user = await getCurrentUserFromSession();
    if (!user) throw new Error("Unauthorized");

    const { url: sourceUrl, folder } = data;

    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error("Failed to fetch image from URL");

    const blob = await response.blob();
    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const ext = contentType.split("/")[1]?.split(";")[0] ?? "jpg";

    const key = `${folder}/${Date.now()}-from-url.${ext}`;

    await env.MEDIA_BUCKET.put(key, await blob.arrayBuffer(), {
      httpMetadata: { contentType },
    });

    const mediaUrl = import.meta.env.DEV
      ? `/api/media?key=${encodeURIComponent(key)}`
      : `${MEDIA_URL}/${key}`;
    return { url: mediaUrl };
  });
