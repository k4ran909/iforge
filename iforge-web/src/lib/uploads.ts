import "server-only";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * Image uploads from the admin panel (team photos). Supabase Storage's public
 * `media` bucket when configured, else public/uploads/ locally (dev only —
 * gitignored, and `next start` only serves files present at build time).
 * SVG is refused: it can carry script.
 */

const BUCKET = "media";
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function saveImage(file: File, folder = "team"): Promise<{ url?: string; error?: string }> {
  const ext = TYPES[file.type];
  if (!ext) return { error: "Use a JPG, PNG, WebP or AVIF image." };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "Images must be 4 MB or smaller." };

  const fileName = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const db = getSupabaseAdmin();
  if (db) {
    const key = `${folder}/${fileName}`;
    const { error } = await db.storage.from(BUCKET).upload(key, bytes, { contentType: file.type });
    if (error) return { error: error.message };
    return { url: db.storage.from(BUCKET).getPublicUrl(key).data.publicUrl };
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, fileName), bytes);
  return { url: `/uploads/${folder}/${fileName}` };
}
