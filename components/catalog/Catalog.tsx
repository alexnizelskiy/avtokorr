"use client";

import { useMemo, useState } from "react";
import type { CarCardData, CarStatus } from "@/types";
import { statusLabels } from "@/lib/car-labels";
import { CarCard } from "./CarCard";

const tabs: CarStatus[] = ["IN_STOCK", "IN_TRANSIT", "ON_ORDER", "SOLD"];

export function Catalog({ cars }: { cars: CarCardData[] }) {
  const [active, setActive] = useState<CarStatus>("IN_STOCK");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const car of cars) c[car.status] = (c[car.status] ?? 0) + 1;
    return c;
  }, [cars]);

  const visible = useMemo(() => cars.filter((c) => c.status === active), [cars, active]);

  return (
    <section className="section cat">
      <h2 className="sec-title" style={{ marginBottom: 6 }}>
        Каталог автомобилей
      </h2>
      <div className="cat-tabs" role="tablist">
        {tabs.map((status) => (
          <button
            key={status}
            role="tab"
            aria-selected={active === status}
            className="cat-tab"
            onClick={() => setActive(status)}
          >
            {statusLabels[status]} <span className="c num">{counts[status] ?? 0}</span>
          </button>
        ))}
      </div>
      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--muted)" }}>В этой категории пока нет автомобилей.</p>
      )}
    </section>
  );
}
