import type { Car } from "@prisma/client";
import type { CarDetail } from "@/types";
import { transmissionLabels, drivetrainLabels } from "@/lib/car-labels";

const rub = new Intl.NumberFormat("ru-RU");

/** Prisma Car → display-модель CarDetail для витрины. */
export function toCarDetail(car: Car): CarDetail {
  const priceNum = Number(car.price);
  const priceStr =
    (car.status === "ON_ORDER" ? "от " : "") + `${rub.format(priceNum)} ₽`;

  return {
    id: car.id,
    slug: car.slug,
    title: [car.brand, car.model, car.generation].filter(Boolean).join(" "),
    brand: car.brand,
    year: car.year,
    mileage: rub.format(car.mileage),
    price: priceStr,
    status: car.status,
    country: car.country,
    fairPrice: car.fairPrice,
    isNew: car.isNew,
    engine: car.engine,
    transmission: transmissionLabels[car.transmission] ?? car.transmission,
    drivetrain: drivetrainLabels[car.drivetrain] ?? car.drivetrain,
    color: car.color,
    vin: car.vin ?? "—",
    auctionGrade: car.auctionGrade ?? "—",
    photos: 0,
    videos: 0,
    description: car.description ?? "",
  };
}
