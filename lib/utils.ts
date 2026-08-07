import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Склейка className с разрешением конфликтов Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Формат цены в рублях: 5450000 → «5 450 000 ₽». */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}
