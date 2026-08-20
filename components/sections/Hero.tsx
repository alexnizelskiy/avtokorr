import Link from "next/link";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  CaretDown,
  Calculator,
  Package,
  ClipboardText,
  ShieldCheck,
  Star,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

const filters = [
  { label: "Марка" },
  { label: "Модель", dis: true },
  { label: "Год" },
  { label: "Страна" },
  { label: "Коробка" },
  { label: "Цена" },
];

const services = [
  { Icon: Calculator, name: "Калькулятор", href: "/delivery" },
  { Icon: Package, name: "Растаможка", href: "/delivery" },
  { Icon: ClipboardText, name: "Как купить", href: "/how-to-buy" },
  { Icon: ShieldCheck, name: "Гарантия", href: "/how-to-buy" },
  { Icon: Star, name: "Отзывы", href: "/reviews" },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-col">
        <div>
          <h1 className="hero-title">Лучшие машины привозят здесь</h1>
          <p className="hero-sub">
            Корея, Япония, Китай под ключ. 128 автомобилей в наличии и под заказ.
          </p>
        </div>
        <div>
          <Link className="bigsearch" href="/catalog">
            <MagnifyingGlass size={24} />
            <span className="ph">Genesis GV80</span>
            <SlidersHorizontal size={22} className="go" />
          </Link>
          <div className="fchips">
            {filters.map((f) => (
              <button key={f.label} className={`fchip${f.dis ? " dis" : ""}`}>
                {f.label} <CaretDown size={12} className="cv" />
              </button>
            ))}
            <button className="apply">Применить</button>
          </div>
        </div>
      </div>

      <div className="svc">
        {services.map(({ Icon, name, href }) => (
          <Link key={name} className="svc-item" href={href}>
            <span className="ico">
              <Icon size={30} weight="regular" />
            </span>
            <span className="nm">{name}</span>
          </Link>
        ))}
        <div className="banner">
          <Link className="b b1" href="/catalog">
            <h4>Новые авто из Кореи каждую неделю</h4>
            <span>
              Смотреть поступления <ArrowRight size={13} />
            </span>
          </Link>
          <Link className="b b2" href="/delivery">
            <h4>Рассчитать стоимость под ключ</h4>
            <span>
              Калькулятор <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
