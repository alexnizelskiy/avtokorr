import type { Metadata } from "next";
import { faq } from "@/content/pages";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description: "Частые вопросы о покупке, доставке, растаможке и гарантии на автомобили из Кореи, Японии и Китая.",
};

export default function FaqPage() {
  return (
    <section className="section content-page">
      <h1 className="page-title">Частые вопросы</h1>
      <div className="faq">
        {faq.map((item, i) => (
          <details key={i} className="faq-item" open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
