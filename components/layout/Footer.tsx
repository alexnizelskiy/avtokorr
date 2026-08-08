import { site } from "@/lib/site";
import { cities, footerLinks } from "@/content/catalog";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-links">
        {footerLinks.map((l) => (
          <a key={l} href="#">
            {l}
          </a>
        ))}
      </div>
      <div className="foot-cities">
        {cities.map((c) => (
          <a key={c} href="#">
            {c}
          </a>
        ))}
      </div>
      <div className="foot-desc">
        <div>
          Автокорр — доставка автомобилей из Южной Кореи, Японии и Китая под ключ: подбор на
          аукционе, проверка, покупка, доставка и таможенное оформление.
        </div>
        <div>
          Работаем по всей России. Прозрачная стоимость на каждом этапе, отслеживание заказа в
          личном кабинете и гарантия юридической чистоты.
        </div>
      </div>
      <div className="foot-legal">
        <div className="row">
          <b>{site.legalName}</b>
        </div>
        <div className="row">
          <a href="#">Пользовательское соглашение</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
        <div>
          © {new Date().getFullYear()} {site.name}. {site.domain} · Все цены указаны с учётом
          доставки и растаможки.
        </div>
      </div>
    </footer>
  );
}
