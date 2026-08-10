import type { CarStatus, Country } from "@/types";

export const transmissionLabels: Record<string, string> = {
  AUTOMATIC: "Автомат",
  MANUAL: "Механика",
  ROBOT: "Робот",
  CVT: "Вариатор",
};

export const drivetrainLabels: Record<string, string> = {
  FWD: "Передний (FWD)",
  RWD: "Задний (RWD)",
  AWD: "Полный (AWD)",
};

export const fuelLabels: Record<string, string> = {
  PETROL: "Бензин",
  DIESEL: "Дизель",
  HYBRID: "Гибрид",
  ELECTRIC: "Электро",
};

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

export const transmissionOptions = Object.entries(transmissionLabels);
export const drivetrainOptions = Object.entries(drivetrainLabels);
export const fuelOptions = Object.entries(fuelLabels);
export const statusOptions = Object.entries(statusLabels) as [CarStatus, string][];
export const countryOptions = Object.entries(countryLabels) as [Country, string][];
