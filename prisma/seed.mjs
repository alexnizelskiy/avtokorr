// Начальное наполнение каталога. Идемпотентно (upsert по slug).
// Запуск: node prisma/seed.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
  { slug: "genesis-gv80-2022", brand: "Genesis", model: "GV80", year: 2022, mileage: 28000, engine: "3.5 л · 380 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "чёрный", country: "KOREA", status: "IN_STOCK", price: 5450000, vin: "KMTG•••4521", auctionGrade: "4.5 / B", fairPrice: true, description: "Топовая комплектация, один владелец, панорама, вентиляция сидений. Проверен на аукционе Encar." },
  { slug: "toyota-crown-2023", brand: "Toyota", model: "Crown", year: 2023, mileage: 15000, engine: "2.5 л · 184 л.с. (Hybrid)", transmission: "CVT", drivetrain: "AWD", color: "белый перламутр", country: "JAPAN", status: "IN_STOCK", price: 3890000, vin: "JTMB•••8830", auctionGrade: "5 / A", isNew: true, description: "Гибрид, минимальный пробег, состояние нового автомобиля. Аукционная оценка 5 баллов." },
  { slug: "kia-carnival-2023", brand: "Kia", model: "Carnival", year: 2023, mileage: 22000, engine: "2.2 л дизель · 202 л.с.", transmission: "AUTOMATIC", drivetrain: "FWD", color: "серебристый", country: "KOREA", status: "IN_TRANSIT", price: 3250000, vin: "KNAM•••1174", auctionGrade: "4 / B", description: "Семейный минивэн, 7 мест, дизель. В пути, прибытие через 3 недели." },
  { slug: "zeekr-001-2023", brand: "Zeekr", model: "001", year: 2023, mileage: 12000, engine: "Электро · 544 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "серый матовый", country: "CHINA", status: "IN_TRANSIT", price: 4100000, vin: "LVTD•••9902", auctionGrade: "—", description: "Электрокар, запас хода 700 км, полный привод, премиум-аудио. В пути из Китая." },
  { slug: "hyundai-palisade-2022", brand: "Hyundai", model: "Palisade", year: 2022, mileage: 40000, engine: "2.2 л дизель · 200 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "тёмно-синий", country: "KOREA", status: "IN_STOCK", price: 3700000, vin: "KMHR•••6650", auctionGrade: "4 / B", fairPrice: true, description: "Большой семейный SUV, 8 мест, дизель, полный привод. Цена ниже рыночной." },
  { slug: "li-l9-2023", brand: "Li Auto", model: "L9", year: 2023, mileage: 18000, engine: "Гибрид · 449 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "белый", country: "CHINA", status: "ON_ORDER", price: 5900000, vin: "под заказ", auctionGrade: "—", description: "Флагманский гибридный SUV, 6 мест, три экрана, автопилот. Под заказ 45–60 дней." },
  { slug: "lexus-rx-350-2022", brand: "Lexus", model: "RX 350", year: 2022, mileage: 33000, engine: "2.4 л Turbo · 279 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "серебристый", country: "JAPAN", status: "IN_STOCK", price: 5200000, vin: "JTJB•••2201", auctionGrade: "4.5 / A", fairPrice: true, description: "Премиум-кроссовер, полная комплектация, кожа, Mark Levinson. Отличное состояние." },
  { slug: "toyota-alphard-2022", brand: "Toyota", model: "Alphard", year: 2022, mileage: 25000, engine: "2.5 л · 182 л.с. (Hybrid)", transmission: "CVT", drivetrain: "AWD", color: "чёрный", country: "JAPAN", status: "SOLD", price: 6800000, vin: "JTNG•••7788", auctionGrade: "5 / A", description: "Представительский минивэн, VIP-салон, гибрид. Продан — оставьте заявку на аналог." },
  { slug: "genesis-g80-2023", brand: "Genesis", model: "G80", year: 2023, mileage: 19000, engine: "2.5 л Turbo · 304 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "графит", country: "KOREA", status: "IN_STOCK", price: 4650000, vin: "KMTG•••3345", auctionGrade: "4.5 / B", fairPrice: true, description: "Бизнес-седан, премиум-комплектация, один владелец, полная история обслуживания." },
  { slug: "byd-han-2023", brand: "BYD", model: "Han", year: 2023, mileage: 9000, engine: "Электро · 517 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "синий", country: "CHINA", status: "IN_STOCK", price: 3300000, vin: "LGXC•••5567", auctionGrade: "—", isNew: true, description: "Электро-седан, разгон 3.9 с, запас хода 610 км. Почти новый, минимальный пробег." },
  { slug: "hyundai-santa-fe-2023", brand: "Hyundai", model: "Santa Fe", year: 2023, mileage: 21000, engine: "2.5 л Turbo · 281 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "бежевый", country: "KOREA", status: "IN_TRANSIT", price: 4250000, vin: "KMHS•••9014", auctionGrade: "4.5 / B", description: "Новое поколение, футуристичный дизайн, полный привод. В пути из Кореи." },
  { slug: "toyota-land-cruiser-300-2022", brand: "Toyota", model: "Land Cruiser 300", year: 2022, mileage: 41000, engine: "3.5 л Twin-Turbo · 415 л.с.", transmission: "AUTOMATIC", drivetrain: "AWD", color: "белый", country: "JAPAN", status: "IN_TRANSIT", price: 9200000, vin: "JTMH•••2098", auctionGrade: "4.5 / A", description: "Легендарный внедорожник, топовая комплектация, дизель. В пути, бронь до прибытия." },
];

for (const c of cars) {
  await prisma.car.upsert({ where: { slug: c.slug }, update: c, create: c });
}
console.log(`Сид завершён: ${cars.length} авто`);
await prisma.$disconnect();
