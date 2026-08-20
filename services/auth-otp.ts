import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";
import { normalizePhone } from "@/lib/auth";
import { generateOtp, sendSms } from "@/lib/sms";

const OTP_TTL_MIN = 5;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return createHash("sha256").update(`${code}:${secret}`).digest("hex");
}

/** Запросить код: сгенерировать, сохранить, отправить (или залогировать). */
export async function requestOtp(rawPhone: string): Promise<{ devCode?: string }> {
  const phone = normalizePhone(rawPhone);
  if (phone.length < 10) throw new Error("bad_phone");

  await prisma.otpCode.deleteMany({ where: { phone } });

  const code = generateOtp();
  await prisma.otpCode.create({
    data: {
      phone,
      codeHash: hashCode(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MIN * 60_000),
    },
  });

  await sendSms(phone, `Код для входа на Автокорр: ${code}`);

  return { devCode: process.env.NODE_ENV !== "production" ? code : undefined };
}

/** Проверить код. При успехе возвращает пользователя (создаёт при первом входе). */
export async function verifyOtp(rawPhone: string, code: string) {
  const phone = normalizePhone(rawPhone);
  const otp = await prisma.otpCode.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) return { ok: false as const, error: "no_code" };
  if (otp.expiresAt < new Date()) return { ok: false as const, error: "expired" };
  if (otp.attempts >= MAX_ATTEMPTS) return { ok: false as const, error: "too_many" };

  if (otp.codeHash !== hashCode(code)) {
    await prisma.otpCode.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
    return { ok: false as const, error: "invalid" };
  }

  // Успех: создаём/находим клиента и чистим коды.
  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) user = await prisma.user.create({ data: { phone, role: "CLIENT" } });
  await prisma.otpCode.deleteMany({ where: { phone } });

  return { ok: true as const, user };
}
