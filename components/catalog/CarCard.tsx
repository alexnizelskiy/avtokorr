"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, TrendUp, TrendDown } from "@phosphor-icons/react";
import type { CarCardData } from "@/types";
import { statusLabels } from "@/lib/car-labels";

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
        {car.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cover" src={car.cover} alt={car.title} loading="lazy" />
        ) : (
          <div className="sh" />
        )}
        <button
          className={`heart${fav ? " on" : ""}`}
          aria-label="В избранное"
          onClick={(e) => {
            e.preventDefault();
            setFav((v) => !v);
          }}
        >
          <Heart size={18} weight={fav ? "fill" : "regular"} />
        </button>
        {b && <span className={`cbadge ${b.cls}`}>{b.label}</span>}
      </div>
      <div className="price num">
        {car.price}
        {car.priceTrend === "up" && <TrendUp size={16} className="up" />}
        {car.priceTrend === "down" && <TrendDown size={16} className="dn" />}
      </div>
      <div className="ttl">{car.title}</div>
      <div className="meta num">
        {car.year} / {car.mileage} км
      </div>
    </Link>
  );
}
