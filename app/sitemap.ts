import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Пока статичные маршруты; каталог и карточки авто добавятся из БД на Этапе 4. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/catalog", "/how-to-buy", "/delivery", "/reviews", "/about", "/contacts"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
