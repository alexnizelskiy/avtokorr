import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listCarsForCatalog } from "@/services/cars";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/catalog", "/how-to-buy", "/delivery", "/reviews", "/about", "/contacts", "/faq"];

  const base: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let carRoutes: MetadataRoute.Sitemap = [];
  try {
    const cars = await listCarsForCatalog();
    carRoutes = cars.map((c) => ({
      url: `${site.url}/catalog/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch {
    // если БД недоступна при сборке — отдаём хотя бы статические маршруты
  }

  return [...base, ...carRoutes];
}
