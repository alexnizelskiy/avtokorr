import { prisma } from "@/lib/db";
import type { LeadInput } from "@/features/lead-form/schema";

/** Создать заявку в БД. */
export async function createLead(input: LeadInput) {
  return prisma.lead.create({
    data: {
      name: input.name,
      phone: input.phone,
      comment: input.comment || null,
      type: "REQUEST",
      status: "NEW",
    },
  });
}

/** Список заявок для админки (свежие сверху). */
export async function listLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
}

export async function countNewLeads() {
  return prisma.lead.count({ where: { status: "NEW" } });
}
