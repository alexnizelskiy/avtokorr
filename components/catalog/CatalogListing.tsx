"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { sortOptions, priceToNumber } from "@/content/catalog";
import { countryLabels } from "@/lib/car-labels";
import type { CarDetail, Country } from "@/types";
import { CarCard } from "./CarCard";

const countries: Country[] = ["KOREA", "JAPAN", "CHINA"];

export function CatalogListing({ cars }: { cars: CarDetail[] }) {
  const [country, setCountry] = useState<Country | "ALL">("ALL");
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("ALL");
  const [priceMax, setPriceMax] = useState("");

  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).sort(),
    [cars],
  );

  const visible = useMemo(() => {
    let list = [...cars];
    if (country !== "ALL") list = list.filter((c) => c.country === country);
    if (brand !== "ALL") list = list.filter((c) => c.brand === brand);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q));
    }
    if (priceMax) {
      const max = Number(priceMax);
      list = list.filter((c) => priceToNumber(c.price) <= max);
    }
    if (sort === "cheap") list.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    if (sort === "expensive") list.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    if (sort === "new") list.sort((a, b) => b.year - a.year);
    return list;
  }, [cars, country, brand, query, priceMax, sort]);

  return (
    <section className="section" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <div className="crumbs">
        <Link href="/">Главная</Link> <span>›</span> Каталог
      </div>
      <h1 className="page-title">Автомобили из Кореи, Японии и Китая</h1>
      <p className="page-sub num">{visible.length} предложений · доставка под ключ 45–60 дней</p>

      {/* Поиск + фильтры */}
      <div className="cat-search">
        <MagnifyingGlass size={20} />
        <input
          placeholder="Поиск по названию, напр. Genesis"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="sort-sel">
          <option value="ALL">Все марки</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="sort-sel">
          <option value="">Цена: любая</option>
          <option value="3000000">до 3 млн ₽</option>
          <option value="5000000">до 5 млн ₽</option>
          <option value="8000000">до 8 млн ₽</option>
          <option value="15000000">до 15 млн ₽</option>
        </select>
      </div>

      <div className="toolbar">
        <button className={`chip${country === "ALL" ? " active" : ""}`} onClick={() => setCountry("ALL")}>
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

      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="cat-empty">
          <p>По вашему запросу ничего не найдено.</p>
          <button
            className="btn btn-soft"
            onClick={() => {
              setQuery("");
              setBrand("ALL");
              setPriceMax("");
              setCountry("ALL");
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  );
}
