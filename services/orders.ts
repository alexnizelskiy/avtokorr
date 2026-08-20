import { prisma } from "@/lib/db";
import type { OrderStage } from "@/lib/order-labels";

/** Найти или создать клиента по телефону. */
async function upsertClient(phone: string, name: string) {
  const existing = await prisma.user.findFirst({ where: { phone } });
  if (existing) return existing;
  return prisma.user.create({ data: { phone, name, role: "CLIENT" } });
}

export interface OrderInput {
  clientName: string;
  clientPhone: string;
  carId?: string;
  stage: OrderStage;
  totalPrice?: number;
}

export async function createOrder(input: OrderInput) {
  const client = await upsertClient(input.clientPhone, input.clientName);
  const count = await prisma.order.count();
  const number = `AK-${2400 + count + 1}`;

  return prisma.order.create({
    data: {
      number,
      clientId: client.id,
      carId: input.carId || null,
      stage: input.stage,
      totalPrice: input.totalPrice ?? null,
      events: {
        create: { stage: input.stage, comment: "Заказ создан" },
      },
    },
  });
}

export async function listOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, car: true },
    take: 200,
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      client: true,
      car: true,
      events: { orderBy: { createdAt: "asc" } },
    },
  });
}

/** Добавить обновление статуса и перевести заказ на этот этап. */
export async function addStatusUpdate(orderId: string, stage: OrderStage, comment?: string) {
  await prisma.orderStatusEvent.create({
    data: { orderId, stage, comment: comment || null },
  });
  return prisma.order.update({ where: { id: orderId }, data: { stage } });
}

export async function countOrders() {
  return prisma.order.count();
}
