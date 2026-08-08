"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cars, countryLabels, sortOptions, priceToNumber } from "@/content/catalog";
import type { Country } from "@/types";
import { CarCard } from "./CarCard";

const countries: Country[] = ["KOREA", "JAPAN", "CHINA"];

export function CatalogListing() {
  const [country, setCountry] = useState<Country | "ALL">("ALL");
  const [sort, setSort] = useState("popular");

  const visible = useMemo(() => {
    let list = country === "ALL" ? cars : cars.filter((c) => c.country === country);
    list = [...list];
    if (sort === "cheap") list.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    if (sort === "expensive") list.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    if (sort === "new") list.sort((a, b) => b.year - a.year);
    return list;
  }, [country, sort]);

  return (
    <section className="section" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <div className="crumbs">
        <Link href="/">Главная</Link> <span>›</span> Каталог
      </div>
      <h1 className="page-title">Автомобили из Кореи, Японии и Китая</h1>
      <p className="page-sub num">{visible.length} предложений · доставка под ключ 45–60 дней</p>

      <div className="toolbar">
        <button
          className={`chip${country === "ALL" ? " active" : ""}`}
          onClick={() => setCountry("ALL")}
        >
          Все страны
        </button>
        {countries.map((c) => (
          <button
            key={c}
            className={`chip${country === c ? " active" : ""}`}
            onClick={() => setCountry(c)}
          >
            {countryLabels[c]}
          </button>
        ))}
        <span className="chip ghost">+ Фильтры</span>
        <div className="toolbar-spacer" />
        <label className="sort">
          Сортировка:
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-sel">
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid">
        {visible.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
