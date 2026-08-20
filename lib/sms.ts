/**
 * Отправка SMS. Пока — заглушка (лог в консоль). Реальный провайдер
 * (smsc.ru / Devino / и т.п.) подключается здесь одной функцией по SMS_API_KEY.
 * Server-only.
 */

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendSms(phone: string, text: string): Promise<void> {
  const key = process.env.SMS_API_KEY;
  if (!key) {
    // Провайдер не настроен — логируем (в dev код виден в консоли).
    console.log(`[sms] → ${phone}: ${text}`);
    return;
  }
  // TODO: интеграция с реальным провайдером. Пример (smsc.ru):
  // await fetch(`https://smsc.ru/sys/send.php?...&phones=${phone}&mes=${encodeURIComponent(text)}`)
  console.log(`[sms] (провайдер не подключён) → ${phone}: ${text}`);
}
