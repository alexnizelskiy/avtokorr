"use client";

import Link from "next/link";
import { useState } from "react";
import type { CarCardData } from "@/types";
import { statusLabels } from "@/content/catalog";

function badge(car: CarCardData): { cls: string; label: string } | null {
  if (car.isNew) return { cls: "new", label: "Новый" };
  if (car.fairPrice) return { cls: "fair", label: "Справедливая цена" };
  if (car.status === "IN_TRANSIT") return { cls: "transit", label: statusLabels.IN_TRANSIT };
  if (car.status === "ON_ORDER") return { cls: "order", label: statusLabels.ON_ORDER };
  if (car.status === "SOLD") return { cls: "viewed", label: statusLabels.SOLD };
  return null;
}

export function CarCard({ car }: { car: CarCardData }) {
  const [fav, setFav] = useState(false);
  const b = badge(car);
  return (
    <Link className="card" href={`/catalog/${car.slug}`}>
      <div className="ph">
        <div className="sh" />
        <button
          className={`heart${fav ? " on" : ""}`}
          aria-label="В избранное"
          onClick={(e) => {
            e.preventDefault();
            setFav((v) => !v);
          }}
        >
          {fav ? "♥" : "♡"}
        </button>
        {b && <span className={`cbadge ${b.cls}`}>{b.label}</span>}
      </div>
      <div className="price num">
        {car.price}
        {car.priceTrend === "up" && <span className="up">↗</span>}
        {car.priceTrend === "down" && <span className="dn">↘</span>}
      </div>
      <div className="ttl">{car.title}</div>
      <div className="meta num">
        {car.year} / {car.mileage} км
      </div>
    </Link>
  );
}
