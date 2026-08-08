"use client";

import { useMemo, useState } from "react";
import type { CarStatus } from "@/types";
import { cars, catalogTabs, statusLabels } from "@/content/catalog";
import { CarCard } from "./CarCard";

export function Catalog() {
  const [active, setActive] = useState<CarStatus>("IN_STOCK");

  const visible = useMemo(() => {
    // Демо: показываем все, но подсвечиваем выбранную вкладку.
    // На Этапе 6 — фильтрация выборкой из БД по статусу.
    return cars;
  }, []);

  return (
    <section className="section cat">
      <h2 className="sec-title" style={{ marginBottom: 6 }}>
        Каталог автомобилей
      </h2>
      <div className="cat-tabs" role="tablist">
        {catalogTabs.map((t) => (
          <button
            key={t.status}
            role="tab"
            aria-selected={active === t.status}
            className="cat-tab"
            onClick={() => setActive(t.status)}
          >
            {statusLabels[t.status]} <span className="c num">{t.count}</span>
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
