import { NextResponse } from "next/server";
import { verifyOtp } from "@/services/auth-otp";
import { createClientSession, normalizePhone } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { phone?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const phone = (body.phone || "").trim();
  const code = (body.code || "").trim();
  if (!phone || !code) return NextResponse.json({ ok: false, error: "empty" }, { status: 422 });

  const res = await verifyOtp(phone, code);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 401 });

  await createClientSession(res.user.id, normalizePhone(phone));
  return NextResponse.json({ ok: true });
}
