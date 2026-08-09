import { NextResponse } from "next/server";
import { checkAdminCredentials, createAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { identifier?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const identifier = (body.identifier || "").trim();
  const password = body.password || "";
  if (!identifier || !password) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 422 });
  }

  const sub = checkAdminCredentials(identifier, password);
  if (!sub) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  await createAdminSession(sub);
  return NextResponse.json({ ok: true });
}
