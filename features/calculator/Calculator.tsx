"use client";

import { useMemo, useState } from "react";
import type { Country } from "@/types";
import { countryLabels } from "@/content/catalog";

const rub = new Intl.NumberFormat("ru-RU");
const fmt = (n: number) => `${rub.format(Math.round(n))} ₽`;

// Базовая логистика по стране (усреднённо, ₽).
const deliveryBase: Record<Country, number> = { KOREA: 250000, JAPAN: 300000, CHINA: 200000 };

/** Упрощённая оценка растаможки от стоимости и возраста. Не является офертой. */
function customsEstimate(price: number, ageYears: number): number {
  const rate = ageYears < 3 ? 0.48 : ageYears <= 5 ? 0.4 : 0.6;
  return price * rate;
}

const countries: Country[] = ["KOREA", "JAPAN", "CHINA"];

export function Calculator() {
  const [price, setPrice] = useState(3000000);
  const [country, setCountry] = useState<Country>("KOREA");
  const [age, setAge] = useState(3);

  const result = useMemo(() => {
    const delivery = deliveryBase[country];
    const customs = customsEstimate(price, age);
    const commission = Math.max(price * 0.05, 150000);
    const total = price + delivery + customs + commission;
    return { delivery, customs, commission, total };
  }, [price, country, age]);

  return (
    <div className="calc">
      <div className="calc-form">
        <label className="field">
          <span>Стоимость авто на аукционе, ₽</span>
          <input
            type="number"
            min={0}
            step={100000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
          />
        </label>
        <label className="field">
          <span>Страна</span>
          <select value={country} onChange={(e) => setCountry(e.target.value as Country)}>
            {countries.map((c) => (
              <option key={c} value={c}>
                {countryLabels[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Возраст авто, лет</span>
          <input
            type="number"
            min={0}
            max={30}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="calc-result">
        <div className="prow">
          <span>Стоимость авто</span>
          <b className="num">{fmt(price)}</b>
        </div>
        <div className="prow">
          <span>Доставка</span>
          <b className="num">{fmt(result.delivery)}</b>
        </div>
        <div className="prow">
          <span>Таможенное оформление</span>
          <b className="num">{fmt(result.customs)}</b>
        </div>
        <div className="prow">
          <span>Комиссия и услуги</span>
          <b className="num">{fmt(result.commission)}</b>
        </div>
        <div className="prow total">
          <span>Итого под ключ</span>
          <b className="num">{fmt(result.total)}</b>
        </div>
        <p className="calc-note">
          Предварительный расчёт. Точную стоимость менеджер подтвердит после подбора конкретного лота.
        </p>
      </div>
    </div>
  );
}
