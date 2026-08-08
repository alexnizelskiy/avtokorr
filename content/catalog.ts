import type { Brand, CarCardData, CarStatus, Story } from "@/types";

/** Демо-данные витрины (Этап 4). На Этапе 6 заменятся выборкой из БД. */

export const statusLabels: Record<CarStatus, string> = {
  IN_STOCK: "В наличии",
  IN_TRANSIT: "В пути",
  ON_ORDER: "Под заказ",
  SOLD: "Продан",
};

export const catalogTabs: { status: CarStatus; count: number }[] = [
  { status: "IN_STOCK", count: 64 },
  { status: "IN_TRANSIT", count: 38 },
  { status: "ON_ORDER", count: 14 },
  { status: "SOLD", count: 142 },
];

export const stories: Story[] = [
  { id: "s1", title: "Новые поступления", gradient: "linear-gradient(160deg,#36b555,#0f7a34)", unread: true },
  { id: "s2", title: "Как проходит доставка", gradient: "linear-gradient(160deg,#2f8fff,#1450b0)", unread: true },
  { id: "s3", title: "Растаможка 2026", gradient: "linear-gradient(160deg,#ff8a3d,#e2560f)", unread: true },
  { id: "s4", title: "Отзыв: Genesis GV80", gradient: "linear-gradient(160deg,#8b5cf6,#5b21b6)", unread: true },
  { id: "s5", title: "Аукцион в Корее", gradient: "linear-gradient(160deg,#0ea5a5,#075e5e)", unread: true },
  { id: "s6", title: "Zeekr 001 — обзор", gradient: "linear-gradient(160deg,#334155,#0f172a)" },
  { id: "s7", title: "Гарантия и проверка", gradient: "linear-gradient(160deg,#16a34a,#065f2e)" },
  { id: "s8", title: "Скидки месяца", gradient: "linear-gradient(160deg,#e5484d,#a11016)" },
];

export const brands: Brand[] = [
  { name: "Toyota", country: "JAPAN", logo: "T" },
  { name: "Lexus", country: "JAPAN", logo: "L" },
  { name: "Honda", country: "JAPAN", logo: "H" },
  { name: "Nissan", country: "JAPAN", logo: "N" },
  { name: "Mazda", country: "JAPAN", logo: "M" },
  { name: "Subaru", country: "JAPAN", logo: "S" },
  { name: "Hyundai", country: "KOREA", logo: "H" },
  { name: "Kia", country: "KOREA", logo: "K" },
  { name: "Genesis", country: "KOREA", logo: "G" },
  { name: "Zeekr", country: "CHINA", logo: "Z" },
  { name: "Li Auto", country: "CHINA", logo: "L" },
  { name: "BYD", country: "CHINA", logo: "B" },
  { name: "Geely", country: "CHINA", logo: "G" },
  { name: "Chery", country: "CHINA", logo: "C" },
  { name: "Changan", country: "CHINA", logo: "C" },
  { name: "Haval", country: "CHINA", logo: "H" },
  { name: "Omoda", country: "CHINA", logo: "O" },
  { name: "Exeed", country: "CHINA", logo: "E" },
];

export const cars: CarCardData[] = [
  { id: "1", slug: "genesis-gv80-2022", title: "Genesis GV80", year: 2022, mileage: "28 000", price: "5 450 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true },
  { id: "2", slug: "toyota-crown-2023", title: "Toyota Crown", year: 2023, mileage: "15 000", price: "3 890 000 ₽", status: "IN_STOCK", country: "JAPAN", isNew: true },
  { id: "3", slug: "kia-carnival-2023", title: "Kia Carnival", year: 2023, mileage: "22 000", price: "3 250 000 ₽", status: "IN_TRANSIT", country: "KOREA" },
  { id: "4", slug: "zeekr-001-2023", title: "Zeekr 001", year: 2023, mileage: "12 000", price: "4 100 000 ₽", status: "IN_TRANSIT", country: "CHINA" },
  { id: "5", slug: "hyundai-palisade-2022", title: "Hyundai Palisade", year: 2022, mileage: "40 000", price: "3 700 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true, priceTrend: "down" },
  { id: "6", slug: "li-l9-2023", title: "Li L9", year: 2023, mileage: "18 000", price: "от 5 900 000 ₽", status: "ON_ORDER", country: "CHINA" },
  { id: "7", slug: "lexus-rx-350-2022", title: "Lexus RX 350", year: 2022, mileage: "33 000", price: "5 200 000 ₽", status: "IN_STOCK", country: "JAPAN", fairPrice: true },
  { id: "8", slug: "toyota-alphard-2022", title: "Toyota Alphard", year: 2022, mileage: "25 000", price: "6 800 000 ₽", status: "SOLD", country: "JAPAN" },
  { id: "9", slug: "genesis-g80-2023", title: "Genesis G80", year: 2023, mileage: "19 000", price: "4 650 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true },
  { id: "10", slug: "byd-han-2023", title: "BYD Han", year: 2023, mileage: "9 000", price: "3 300 000 ₽", status: "IN_STOCK", country: "CHINA", isNew: true },
  { id: "11", slug: "hyundai-santa-fe-2023", title: "Hyundai Santa Fe", year: 2023, mileage: "21 000", price: "4 250 000 ₽", status: "IN_TRANSIT", country: "KOREA" },
  { id: "12", slug: "toyota-land-cruiser-300-2022", title: "Toyota Land Cruiser 300", year: 2022, mileage: "41 000", price: "9 200 000 ₽", status: "IN_TRANSIT", country: "JAPAN", priceTrend: "up" },
];

export const cities = [
  "Москва", "Санкт-Петербург", "Ростов-на-Дону", "Краснодар", "Воронеж", "Екатеринбург",
  "Новосибирск", "Владивосток", "Нижний Новгород", "Казань", "Самара", "Челябинск",
];

export const footerLinks = [
  "Как купить", "Доставка", "Растаможка", "Гарантия", "Отзывы", "О компании", "Контакты", "Вакансии",
];
