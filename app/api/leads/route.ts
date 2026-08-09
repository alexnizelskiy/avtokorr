import { NextResponse } from "next/server";
import { leadSchema } from "@/features/lead-form/schema";
import { notifyManagersAboutLead } from "@/lib/notify";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // TODO (Этап БД): сохранить Lead в Prisma. Пока — уведомление менеджерам.
  await notifyManagersAboutLead(parsed.data);

  return NextResponse.json({ ok: true });
}
