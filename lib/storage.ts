/**
 * Загрузка изображений авто.
 * - Прод: Vercel Blob, если задан BLOB_READ_WRITE_TOKEN (публичные URL, CDN).
 * - Dev:  запись в public/uploads/ (в .gitignore), чтобы работало без настройки.
 * Server-only.
 */
import { put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

const MAX_BYTES = 10 * 1024 * 1024; // 10 МБ
const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export class StorageError extends Error {}

/** Сохранить загруженное изображение и вернуть публичный URL. */
export async function saveImage(file: File, prefix = "cars"): Promise<string> {
  const ext = ALLOWED.get(file.type);
  if (!ext) throw new StorageError("unsupported_type");
  if (file.size > MAX_BYTES) throw new StorageError("too_large");

  const rand = Math.random().toString(36).slice(2, 8);
  const key = `${prefix}/${Date.now()}-${rand}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, file, { access: "public", contentType: file.type });
    return blob.url;
  }

  // Локальный fallback (в проде на Vercel FS только для чтения — нужен Blob-токен).
  const buf = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads", prefix);
  await fs.mkdir(dir, { recursive: true });
  const fname = key.split("/").pop()!;
  await fs.writeFile(path.join(dir, fname), buf);
  return `/uploads/${prefix}/${fname}`;
}
