export type CarStatus = "IN_STOCK" | "IN_TRANSIT" | "SOLD" | "ON_ORDER";
export type Country = "KOREA" | "JAPAN" | "CHINA";

export interface CarCardData {
  id: string;
  slug: string;
  title: string;
  year: number;
  mileage: string; // отформатированный пробег, напр. "28 000"
  price: string; // отформатированная цена, напр. "5 450 000 ₽"
  status: CarStatus;
  country: Country;
  fairPrice?: boolean; // бейдж «Справедливая цена»
  isNew?: boolean; // бейдж «Новый»
  priceTrend?: "up" | "down";
}

export interface Story {
  id: string;
  title: string;
  gradient: string;
  unread?: boolean;
}

export interface Brand {
  name: string;
  country: Country;
  logo: string; // буква-заглушка, пока нет реальных логотипов
}
