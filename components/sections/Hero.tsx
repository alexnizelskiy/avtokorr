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
  SealCheck,
  Truck,
} from "@phosphor-icons/react/dist/ssr";

const HERO_IMG =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1900&q=75";

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
    <>
      {/* Премиум-баннер с фото */}
      <section className="hero2">
        <div className="hero2-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="hero2-inner">
          <div className="hero2-eyebrow">Корея · Япония · Китай — под ключ</div>
          <h1 className="hero2-title">
            Автомобиль из Азии под ключ — без забот и переплат
          </h1>
          <p className="hero2-sub">
            Подберём, проверим на аукционе, купим, доставим и растаможим. Прозрачная стоимость на
            каждом этапе.
          </p>
          <div className="hero2-cta">
            <Link className="btn btn-green" href="/#lead">
              Подобрать автомобиль
            </Link>
            <Link className="btn btn-outline-light" href="/catalog">
              Смотреть каталог
            </Link>
          </div>
          <div className="hero2-trust">
            <span>
              <Star size={16} weight="fill" /> 4.9 · отзывы
            </span>
            <span>
              <SealCheck size={16} weight="fill" /> 640+ авто привезли
            </span>
            <span>
              <Truck size={16} weight="fill" /> доставка 45–60 дней
            </span>
            <span>
              <ShieldCheck size={16} weight="fill" /> проверка на аукционе
            </span>
          </div>
        </div>
      </section>

      {/* Поисковая панель + быстрые сервисы */}
      <section className="hero">
        <div className="hero-col" style={{ paddingTop: 0 }}>
          <Link className="bigsearch" href="/catalog">
            <MagnifyingGlass size={24} />
            <span className="ph">Genesis GV80, Toyota Crown, Zeekr…</span>
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
    </>
  );
}
