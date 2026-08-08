import type { Brand, CarDetail, CarStatus, Country, Story } from "@/types";

/** Демо-данные витрины (Этапы 4–5). На Этапе 6 заменятся выборкой из БД. */

export const statusLabels: Record<CarStatus, string> = {
  IN_STOCK: "В наличии",
  IN_TRANSIT: "В пути",
  ON_ORDER: "Под заказ",
  SOLD: "Продан",
};

export const countryLabels: Record<Country, string> = {
  KOREA: "Корея",
  JAPAN: "Япония",
  CHINA: "Китай",
};

export const catalogTabs: { status: CarStatus; count: number }[] = [
  { status: "IN_STOCK", count: 64 },
  { status: "IN_TRANSIT", count: 38 },
  { status: "ON_ORDER", count: 14 },
  { status: "SOLD", count: 142 },
];

export const sortOptions = [
  { value: "popular", label: "Сначала популярные" },
  { value: "cheap", label: "Сначала дешевле" },
  { value: "expensive", label: "Сначала дороже" },
  { value: "new", label: "Сначала новее" },
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

export const cars: CarDetail[] = [
  { id: "1", slug: "genesis-gv80-2022", title: "Genesis GV80", brand: "Genesis", year: 2022, mileage: "28 000", price: "5 450 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true, engine: "3.5 л · 380 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "чёрный", vin: "KMTG•••4521", auctionGrade: "4.5 / B", photos: 41, videos: 2, description: "Топовая комплектация, один владелец, полный электропакет, панорама, вентиляция сидений. Проверен на аукционе Encar." },
  { id: "2", slug: "toyota-crown-2023", title: "Toyota Crown", brand: "Toyota", year: 2023, mileage: "15 000", price: "3 890 000 ₽", status: "IN_STOCK", country: "JAPAN", isNew: true, engine: "2.5 л · 184 л.с. (Hybrid)", transmission: "Вариатор", drivetrain: "Полный (AWD)", color: "белый перламутр", vin: "JTMB•••8830", auctionGrade: "5 / A", photos: 32, videos: 1, description: "Гибрид, минимальный пробег, состояние нового автомобиля. Аукционная оценка 5 баллов." },
  { id: "3", slug: "kia-carnival-2023", title: "Kia Carnival", brand: "Kia", year: 2023, mileage: "22 000", price: "3 250 000 ₽", status: "IN_TRANSIT", country: "KOREA", engine: "2.2 л дизель · 202 л.с.", transmission: "Автомат", drivetrain: "Передний (FWD)", color: "серебристый", vin: "KNAM•••1174", auctionGrade: "4 / B", photos: 18, videos: 0, description: "Семейный минивэн, 7 мест, дизель. В пути, ожидаемое прибытие — 3 недели." },
  { id: "4", slug: "zeekr-001-2023", title: "Zeekr 001", brand: "Zeekr", year: 2023, mileage: "12 000", price: "4 100 000 ₽", status: "IN_TRANSIT", country: "CHINA", engine: "Электро · 544 л.с.", transmission: "Редуктор", drivetrain: "Полный (AWD)", color: "серый матовый", vin: "LVTD•••9902", auctionGrade: "—", photos: 26, videos: 1, description: "Электрокар, запас хода 700 км, полный привод, премиум-аудио. В пути из Китая." },
  { id: "5", slug: "hyundai-palisade-2022", title: "Hyundai Palisade", brand: "Hyundai", year: 2022, mileage: "40 000", price: "3 700 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true, priceTrend: "down", engine: "2.2 л дизель · 200 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "тёмно-синий", vin: "KMHR•••6650", auctionGrade: "4 / B", photos: 29, videos: 1, description: "Большой семейный SUV, 8 мест, дизель, полный привод. Цена ниже рыночной." },
  { id: "6", slug: "li-l9-2023", title: "Li L9", brand: "Li Auto", year: 2023, mileage: "18 000", price: "от 5 900 000 ₽", status: "ON_ORDER", country: "CHINA", engine: "Гибрид · 449 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "белый", vin: "под заказ", auctionGrade: "—", photos: 20, videos: 1, description: "Флагманский гибридный SUV, 6 мест, три экрана, автопилот. Привезём под заказ 45–60 дней." },
  { id: "7", slug: "lexus-rx-350-2022", title: "Lexus RX 350", brand: "Lexus", year: 2022, mileage: "33 000", price: "5 200 000 ₽", status: "IN_STOCK", country: "JAPAN", fairPrice: true, engine: "2.4 л Turbo · 279 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "серебристый", vin: "JTJB•••2201", auctionGrade: "4.5 / A", photos: 24, videos: 1, description: "Премиум-кроссовер, полная комплектация, кожа, Mark Levinson. Отличное состояние." },
  { id: "8", slug: "toyota-alphard-2022", title: "Toyota Alphard", brand: "Toyota", year: 2022, mileage: "25 000", price: "6 800 000 ₽", status: "SOLD", country: "JAPAN", engine: "2.5 л · 182 л.с. (Hybrid)", transmission: "Вариатор", drivetrain: "4WD", color: "чёрный", vin: "JTNG•••7788", auctionGrade: "5 / A", photos: 37, videos: 2, description: "Представительский минивэн, VIP-салон, гибрид. Продан — оставьте заявку на аналог." },
  { id: "9", slug: "genesis-g80-2023", title: "Genesis G80", brand: "Genesis", year: 2023, mileage: "19 000", price: "4 650 000 ₽", status: "IN_STOCK", country: "KOREA", fairPrice: true, engine: "2.5 л Turbo · 304 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "графит", vin: "KMTG•••3345", auctionGrade: "4.5 / B", photos: 30, videos: 1, description: "Бизнес-седан, премиум-комплектация, один владелец, полная история обслуживания." },
  { id: "10", slug: "byd-han-2023", title: "BYD Han", brand: "BYD", year: 2023, mileage: "9 000", price: "3 300 000 ₽", status: "IN_STOCK", country: "CHINA", isNew: true, engine: "Электро · 517 л.с.", transmission: "Редуктор", drivetrain: "Полный (AWD)", color: "синий", vin: "LGXC•••5567", auctionGrade: "—", photos: 22, videos: 1, description: "Электро-седан, разгон 3.9 с, запас хода 610 км. Почти новый, минимальный пробег." },
  { id: "11", slug: "hyundai-santa-fe-2023", title: "Hyundai Santa Fe", brand: "Hyundai", year: 2023, mileage: "21 000", price: "4 250 000 ₽", status: "IN_TRANSIT", country: "KOREA", engine: "2.5 л Turbo · 281 л.с.", transmission: "Автомат", drivetrain: "Полный (AWD)", color: "бежевый", vin: "KMHS•••9014", auctionGrade: "4.5 / B", photos: 27, videos: 0, description: "Новое поколение, футуристичный дизайн, полный привод. В пути из Кореи." },
  { id: "12", slug: "toyota-land-cruiser-300-2022", title: "Toyota Land Cruiser 300", brand: "Toyota", year: 2022, mileage: "41 000", price: "9 200 000 ₽", status: "IN_TRANSIT", country: "JAPAN", priceTrend: "up", engine: "3.5 л Twin-Turbo · 415 л.с.", transmission: "Автомат", drivetrain: "Полный (4WD)", color: "белый", vin: "JTMH•••2098", auctionGrade: "4.5 / A", photos: 34, videos: 2, description: "Легендарный внедорожник, топовая комплектация, дизель. В пути, бронь до прибытия." },
];

export const cities = [
  "Москва", "Санкт-Петербург", "Ростов-на-Дону", "Краснодар", "Воронеж", "Екатеринбург",
  "Новосибирск", "Владивосток", "Нижний Новгород", "Казань", "Самара", "Челябинск",
];

export const footerLinks = [
  "Как купить", "Доставка", "Растаможка", "Гарантия", "Отзывы", "О компании", "Контакты", "Вакансии",
];

// ─── Хелперы ───

export function getCarBySlug(slug: string): CarDetail | undefined {
  return cars.find((c) => c.slug === slug);
}

export function similarCars(car: CarDetail, limit = 4): CarDetail[] {
  return cars
    .filter((c) => c.slug !== car.slug && (c.country === car.country || c.brand === car.brand))
    .slice(0, limit);
}

/** Парсинг «5 450 000 ₽» / «от 5 900 000 ₽» → 5450000. */
export function priceToNumber(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

const rub = new Intl.NumberFormat("ru-RU");

/** Разбивка итоговой цены на покупку / доставку+растаможку / комиссию. */
export function financeBreakdown(price: string) {
  const total = priceToNumber(price);
  const purchase = Math.round(total * 0.58);
  const delivery = Math.round(total * 0.36);
  const commission = total - purchase - delivery;
  return {
    purchase: `${rub.format(purchase)} ₽`,
    delivery: `${rub.format(delivery)} ₽`,
    commission: `${rub.format(commission)} ₽`,
  };
}
