import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Лёгкая сессия для админ-панели: подписанный HMAC-токен в httpOnly cookie.
 * Временное решение до подключения SMS/VK/Яндекс — вход по телефону/почте из
 * allowlist (ADMIN_PHONES / ADMIN_EMAILS) + пароль (ADMIN_PASSWORD).
 * Server-only.
 */

const COOKIE = "ak_session";
const SESSION_DAYS = 14;

export type Role = "ADMIN" | "MANAGER";
export interface Session {
  sub: string; // идентификатор (телефон/почта)
  role: Role;
  exp: number; // unix seconds
}

function secret(): string {
  return process.env.JWT_SECRET || "dev-insecure-secret-change-me";
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: Session): string {
  const data = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verify(token: string): Session | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = createHmac("sha256", secret()).update(data).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Session;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function normalizePhone(v: string): string {
  const d = v.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("8")) return "7" + d.slice(1);
  return d;
}

function list(env: string | undefined): string[] {
  return (env || "").split(",").map((s) => s.trim()).filter(Boolean);
}

/** Проверка учётных данных админа. Возвращает нормализованный идентификатор или null. */
export function checkAdminCredentials(identifier: string, password: string): string | null {
  const pass = process.env.ADMIN_PASSWORD || "";
  if (!pass || password !== pass) return null;

  const id = identifier.trim();
  if (id.includes("@")) {
    const emails = list(process.env.ADMIN_EMAILS).map((e) => e.toLowerCase());
    return emails.includes(id.toLowerCase()) ? id.toLowerCase() : null;
  }
  const phone = normalizePhone(id);
  const phones = list(process.env.ADMIN_PHONES).map(normalizePhone);
  return phones.includes(phone) ? phone : null;
}

export async function createAdminSession(sub: string): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const token = sign({ sub, role: "ADMIN", exp });
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return token ? verify(token) : null;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export { COOKIE as SESSION_COOKIE };
