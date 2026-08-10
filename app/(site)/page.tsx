import { Hero } from "@/components/sections/Hero";
import { Stories } from "@/components/sections/Stories";
import { PopularBrands } from "@/components/sections/PopularBrands";
import { Catalog } from "@/components/catalog/Catalog";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/lib/site";
import { listCarsForCatalog } from "@/services/cars";
import { toCarDetail } from "@/lib/car-map";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cars = (await listCarsForCatalog()).map(toCarDetail);
  return (
    <>
      <Hero />
      <Stories />
      <PopularBrands />
      <Catalog cars={cars} />
      <div className="section cat-city">
        Автомобили в <span aria-hidden>📍</span> {site.city}
      </div>
      <section id="lead" className="section" style={{ margin: "56px auto" }}>
        <div className="lead-wrap">
          <div>
            <h2 className="sec-title">Подберём автомобиль под ключ</h2>
            <p style={{ color: "var(--muted)", maxWidth: 420, margin: "0 0 8px" }}>
              Оставьте заявку — менеджер свяжется, подберёт варианты на аукционе и рассчитает полную
              стоимость с доставкой и растаможкой.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
