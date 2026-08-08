import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stories } from "@/components/sections/Stories";
import { PopularBrands } from "@/components/sections/PopularBrands";
import { Catalog } from "@/components/catalog/Catalog";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stories />
        <PopularBrands />
        <Catalog />
        <div className="section cat-city">
          Автомобили в <span aria-hidden>📍</span> {site.city}
        </div>
      </main>
      <Footer />
    </>
  );
}
