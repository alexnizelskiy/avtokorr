import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import type { CarStatus, Country } from "@/types";

export interface CarInput {
  brand: string;
  model: string;
  generation?: string;
  slug: string;
  year: number;
  mileage: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  color: string;
  country: Country;
  status: CarStatus;
  price: number;
  vin?: string;
  auctionGrade?: string;
  description?: string;
  cover?: string;
  fairPrice?: boolean;
  isNew?: boolean;
}

function toData(input: CarInput): Prisma.CarUncheckedCreateInput {
  return {
    brand: input.brand,
    model: input.model,
    generation: input.generation || null,
    slug: input.slug,
    year: input.year,
    mileage: input.mileage,
    engine: input.engine,
    transmission: input.transmission as Prisma.CarUncheckedCreateInput["transmission"],
    drivetrain: input.drivetrain as Prisma.CarUncheckedCreateInput["drivetrain"],
    color: input.color,
    country: input.country,
    status: input.status,
    price: input.price,
    vin: input.vin || null,
    auctionGrade: input.auctionGrade || null,
    description: input.description || null,
    cover: input.cover || null,
    fairPrice: input.fairPrice ?? false,
    isNew: input.isNew ?? false,
  };
}

/** Витрина: список авто с фильтром по стране/статусу. */
export async function listCarsForCatalog(opts?: { country?: Country; status?: CarStatus }) {
  return prisma.car.findMany({
    where: {
      ...(opts?.country ? { country: opts.country } : {}),
      ...(opts?.status ? { status: opts.status } : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getCarBySlug(slug: string) {
  return prisma.car.findUnique({ where: { slug } });
}

export async function getCarById(id: string) {
  return prisma.car.findUnique({ where: { id } });
}

/** Админ: все авто для таблицы. */
export async function listCarsAdmin() {
  return prisma.car.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCar(input: CarInput) {
  return prisma.car.create({ data: toData(input) });
}

export async function updateCar(id: string, input: CarInput) {
  return prisma.car.update({ where: { id }, data: toData(input) });
}

export async function deleteCar(id: string) {
  return prisma.car.delete({ where: { id } });
}

export async function countCars() {
  return prisma.car.count();
}
