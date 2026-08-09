import { NextResponse } from "next/server";
import { leadSchema } from "@/features/lead-form/schema";
import { notifyManagersAboutLead } from "@/lib/notify";
import { createLead } from "@/services/leads";

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

  try {
    await createLead(parsed.data); // сохраняем в БД → видно в админке
  } catch (e) {
    console.error("[lead] Ошибка сохранения в БД:", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  // Уведомление менеджерам (Telegram, если настроен; иначе лог). Не блокирует ответ.
  notifyManagersAboutLead(parsed.data).catch(() => {});

  return NextResponse.json({ ok: true });
}
