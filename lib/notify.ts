/**
 * Уведомления менеджерам. Пока — Telegram (если задан токен), иначе лог в консоль.
 * Server-only. Расширяется email/push на этапе уведомлений.
 */
import type { LeadInput } from "@/features/lead-form/schema";

export async function notifyManagersAboutLead(lead: LeadInput): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text =
    `🚗 Новая заявка на Автокорр\n\n` +
    `Имя: ${lead.name}\n` +
    `Телефон: ${lead.phone}\n` +
    (lead.car ? `Авто: ${lead.car}\n` : "") +
    (lead.comment ? `Комментарий: ${lead.comment}\n` : "");

  if (!token || !chatId) {
    // Пока токен не задан — просто логируем (видно в Vercel → Logs).
    console.log("[lead] (Telegram не настроен)\n" + text);
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error("[lead] Ошибка отправки в Telegram:", e);
  }
}
