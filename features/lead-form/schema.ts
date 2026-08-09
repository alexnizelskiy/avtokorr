import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{9,}$/, "Укажите корректный телефон"),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  car: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
