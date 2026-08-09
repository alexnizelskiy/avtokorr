import type { Metadata } from "next";
import { reviews } from "@/content/pages";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description: "Отзывы клиентов Автокорр о покупке автомобилей из Кореи, Японии и Китая под ключ.",
};

export default function ReviewsPage() {
  return (
    <section className="section content-page">
      <h1 className="page-title">Отзывы клиентов</h1>
      <p className="page-sub">Реальные истории тех, кто уже привёз автомобиль с Автокорр.</p>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">«{r.text}»</p>
            <div className="review-author">
              <b>{r.name}</b> · {r.city}
              <span className="review-car">{r.car}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
