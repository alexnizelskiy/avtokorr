import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cars } from "@/content/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/catalog", "/how-to-buy", "/delivery", "/reviews", "/about", "/contacts"];

  const base: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const carRoutes: MetadataRoute.Sitemap = cars.map((c) => ({
    url: `${site.url}/catalog/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...base, ...carRoutes];
}
