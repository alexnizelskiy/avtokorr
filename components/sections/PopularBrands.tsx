import Link from "next/link";
import { brands } from "@/content/catalog";

export function PopularBrands() {
  return (
    <section className="pop">
      <h2 className="sec-title">Популярные марки</h2>
      <Link className="pop-all" href="/catalog">
        Все предложения ›
      </Link>
      <div className="brands">
        {brands.map((b) => (
          <Link key={b.name} className="brand" href={`/catalog?brand=${encodeURIComponent(b.name)}`}>
            <span className="lg">{b.logo}</span>
            {b.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
