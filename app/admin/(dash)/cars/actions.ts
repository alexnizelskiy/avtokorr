"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  createCar,
  updateCar,
  deleteCar,
  addCarPhotos,
  deleteCarPhoto,
  type CarInput,
} from "@/services/cars";
import { saveImage } from "@/lib/storage";
import type { CarStatus, Country } from "@/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-я]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function parse(form: FormData): CarInput {
  const brand = String(form.get("brand") || "").trim();
  const model = String(form.get("model") || "").trim();
  const year = Number(form.get("year") || 0);
  let slug = String(form.get("slug") || "").trim();
  if (!slug) slug = slugify(`${brand}-${model}-${year}`);

  return {
    brand,
    model,
    generation: String(form.get("generation") || "").trim() || undefined,
    slug,
    year,
    mileage: Number(form.get("mileage") || 0),
    engine: String(form.get("engine") || "").trim(),
    transmission: String(form.get("transmission") || "AUTOMATIC"),
    drivetrain: String(form.get("drivetrain") || "AWD"),
    color: String(form.get("color") || "").trim(),
    country: String(form.get("country") || "KOREA") as Country,
    status: String(form.get("status") || "IN_STOCK") as CarStatus,
    price: Number(form.get("price") || 0),
    vin: String(form.get("vin") || "").trim() || undefined,
    auctionGrade: String(form.get("auctionGrade") || "").trim() || undefined,
    description: String(form.get("description") || "").trim() || undefined,
    cover: String(form.get("cover") || "").trim() || undefined,
    fairPrice: form.get("fairPrice") === "on",
    isNew: form.get("isNew") === "on",
  };
}

/** Загрузить прикреплённые фото и вернуть их URL. */
async function uploadPhotos(form: FormData): Promise<string[]> {
  const files = form.getAll("photoFiles").filter((f): f is File => f instanceof File && f.size > 0);
  const urls: string[] = [];
  for (const f of files) urls.push(await saveImage(f, "cars"));
  return urls;
}

async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
}

export async function createCarAction(form: FormData) {
  await requireAdmin();
  const photoUrls = await uploadPhotos(form);
  const input = parse(form);
  if (!input.cover && photoUrls[0]) input.cover = photoUrls[0]; // первое фото — обложка
  const car = await createCar(input);
  await addCarPhotos(car.id, photoUrls);
  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
  redirect("/admin/cars");
}

export async function updateCarAction(id: string, form: FormData) {
  await requireAdmin();
  const photoUrls = await uploadPhotos(form);
  const input = parse(form);
  if (!input.cover && photoUrls[0]) input.cover = photoUrls[0];
  await updateCar(id, input);
  await addCarPhotos(id, photoUrls);
  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
  redirect(`/admin/cars/${id}/edit`);
}

export async function deleteCarAction(id: string) {
  await requireAdmin();
  await deleteCar(id);
  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
}

export async function deletePhotoAction(carId: string, photoId: string) {
  await requireAdmin();
  await deleteCarPhoto(photoId);
  revalidatePath(`/admin/cars/${carId}/edit`);
  revalidatePath("/catalog");
}
