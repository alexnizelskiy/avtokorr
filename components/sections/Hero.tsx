const filters = [
  { label: "Марка" },
  { label: "Модель", dis: true },
  { label: "Год" },
  { label: "Страна" },
  { label: "Коробка" },
  { label: "Цена" },
];

const services = [
  { icon: "🧮", name: "Калькулятор" },
  { icon: "🛃", name: "Растаможка" },
  { icon: "📋", name: "Как купить" },
  { icon: "🛡️", name: "Гарантия" },
  { icon: "⭐", name: "Отзывы" },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-col">
        <div>
          <h1 className="hero-title">Лучшие машины привозят здесь</h1>
          <p className="hero-sub">
            Корея · Япония · Китай — под ключ ·{" "}
            <b style={{ fontWeight: 400 }}>128 автомобилей в наличии и под заказ</b>
          </p>
        </div>
        <div>
          <div className="bigsearch">
            <span aria-hidden>🔍</span>
            <span className="ph">Genesis GV80</span>
            <span className="go" aria-hidden>
              ⚙
            </span>
          </div>
          <div className="fchips">
            {filters.map((f) => (
              <button key={f.label} className={`fchip${f.dis ? " dis" : ""}`}>
                {f.label} <span className="cv">▾</span>
              </button>
            ))}
            <button className="apply">Применить</button>
          </div>
        </div>
      </div>

      <div className="svc">
        {services.map((s) => (
          <a key={s.name} className="svc-item" href="#">
            <span className="ico" aria-hidden>
              {s.icon}
            </span>
            <span className="nm">{s.name}</span>
          </a>
        ))}
        <div className="banner">
          <div className="b b1">
            <h4>Новые авто из Кореи каждую неделю</h4>
            <span>Смотреть поступления →</span>
          </div>
          <div className="b b2">
            <h4>Рассчитать стоимость под ключ</h4>
            <span>Калькулятор →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
