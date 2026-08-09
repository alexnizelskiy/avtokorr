import type { Metadata } from "next";
import { Calculator } from "@/features/calculator/Calculator";

export const metadata: Metadata = {
  title: "Доставка и растаможка автомобилей",
  description:
    "Как проходит доставка автомобилей из Кореи, Японии и Китая под ключ. Калькулятор стоимости с растаможкой.",
};

export default function DeliveryPage() {
  return (
    <section className="section content-page">
      <h1 className="page-title">Доставка и растаможка</h1>
      <p className="page-sub">
        Полный цикл: экспорт из страны, морская перевозка, таможенное оформление и доставка в ваш
        город. Средний срок — 45–60 дней.
      </p>

      <h2 className="sec-title" style={{ marginTop: 32 }}>
        Калькулятор стоимости под ключ
      </h2>
      <Calculator />
    </section>
  );
}
