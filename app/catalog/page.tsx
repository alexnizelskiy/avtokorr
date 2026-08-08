import type { Metadata } from "next";
import { CatalogListing } from "@/components/catalog/CatalogListing";

export const metadata: Metadata = {
  title: "Каталог автомобилей из Кореи, Японии и Китая",
  description:
    "Автомобили в наличии, в пути и под заказ из Южной Кореи, Японии и Китая. Цены под ключ с доставкой и растаможкой.",
};

export default function CatalogPage() {
  return <CatalogListing />;
}
