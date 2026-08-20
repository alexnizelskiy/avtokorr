"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { createOrder, addStatusUpdate } from "@/services/orders";
import type { OrderStage } from "@/lib/order-labels";

async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
}

export async function createOrderAction(form: FormData) {
  await requireAdmin();
  const clientName = String(form.get("clientName") || "").trim();
  const clientPhone = String(form.get("clientPhone") || "").trim();
  const carId = String(form.get("carId") || "").trim() || undefined;
  const stage = String(form.get("stage") || "REQUEST") as OrderStage;
  const totalRaw = String(form.get("totalPrice") || "").trim();
  const totalPrice = totalRaw ? Number(totalRaw) : undefined;

  if (!clientName || !clientPhone) return;

  const order = await createOrder({ clientName, clientPhone, carId, stage, totalPrice });
  revalidatePath("/admin/orders");
  redirect(`/admin/orders/${order.id}`);
}

export async function addStatusAction(orderId: string, form: FormData) {
  await requireAdmin();
  const stage = String(form.get("stage") || "REQUEST") as OrderStage;
  const comment = String(form.get("comment") || "").trim() || undefined;
  await addStatusUpdate(orderId, stage, comment);
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}
