import { NextResponse } from "next/server";
import { requestOtp } from "@/services/auth-otp";

export async function POST(req: Request) {
  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const phone = (body.phone || "").trim();
  if (!phone) return NextResponse.json({ ok: false, error: "empty" }, { status: 422 });

  try {
    const { devCode } = await requestOtp(phone);
    return NextResponse.json({ ok: true, devCode });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_phone" }, { status: 422 });
  }
}
