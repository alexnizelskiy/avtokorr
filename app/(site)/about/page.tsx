import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "О компании",
  description: "Автокорр — доставка автомобилей из Кореи, Японии и Китая под ключ по всей России.",
};

export default function AboutPage() {
  return (
    <section className="section content-page prose">
      <h1 className="page-title">О компании</h1>
      <p>
        {site.legalName} — команда, которая привозит автомобили из Южной Кореи, Японии и Китая под
        ключ. Мы берём на себя весь процесс: подбор на аукционе, проверку, покупку, доставку и
        таможенное оформление.
      </p>
      <p>
        Мы работаем прозрачно: вы видите стоимость на каждом этапе и отслеживаете свой заказ в личном
        кабинете — от покупки на аукционе до выдачи автомобиля. За плечами команды сотни привезённых
        автомобилей и доставка по всей России.
      </p>
      <div className="about-stats">
        <div className="about-stat">
          <b className="num">640+</b>
          <span>привезённых авто</span>
        </div>
        <div className="about-stat">
          <b className="num">45–60</b>
          <span>дней доставка</span>
        </div>
        <div className="about-stat">
          <b className="num">100%</b>
          <span>проверка на аукционе</span>
        </div>
      </div>
    </section>
  );
}
