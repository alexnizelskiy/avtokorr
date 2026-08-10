import type { Metadata } from "next";
import { CatalogListing } from "@/components/catalog/CatalogListing";
import { listCarsForCatalog } from "@/services/cars";
import { toCarDetail } from "@/lib/car-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог автомобилей из Кореи, Японии и Китая",
  description:
    "Автомобили в наличии, в пути и под заказ из Южной Кореи, Японии и Китая. Цены под ключ с доставкой и растаможкой.",
};

export default async function CatalogPage() {
  const cars = (await listCarsForCatalog()).map(toCarDetail);
  return <CatalogListing cars={cars} />;
}
