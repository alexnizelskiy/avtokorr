import type { Metadata } from "next";
import { howToSteps } from "@/content/pages";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Как купить автомобиль под ключ",
  description: "4 шага покупки автомобиля из Кореи, Японии и Китая: заявка, проверка, доставка, растаможка и выдача.",
};

export default function HowToBuyPage() {
  return (
    <section className="section content-page">
      <h1 className="page-title">Как купить автомобиль</h1>
      <p className="page-sub">Четыре простых шага — от заявки до ключей в ваших руках.</p>

      <div className="steps-grid">
        {howToSteps.map((s) => (
          <div key={s.n} className="step-card">
            <div className="step-n">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="lead-wrap" style={{ marginTop: 40 }}>
        <div>
          <h2 className="sec-title">Готовы начать?</h2>
          <p style={{ color: "var(--muted)", maxWidth: 420 }}>
            Оставьте заявку — подберём автомобиль и рассчитаем полную стоимость под ключ.
          </p>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
