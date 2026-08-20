import Link from "next/link";
import {
  MagnifyingGlass,
  MapPin,
  Plus,
  Sparkle,
  Heart,
  List,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();
  const isClient = session?.role === "CLIENT";
  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link className="logo" href="/">
          <span className="mk">АК</span>
          <span className="wm">автокорр</span>
        </Link>
        <button className="burger" aria-label="Меню">
          <List size={20} weight="bold" />
        </button>
        <Link className="hsearch" href="/catalog">
          <MagnifyingGlass size={20} />
          <span className="txt">Найти автомобиль</span>
          <span className="geo">
            <MapPin size={16} weight="fill" /> {site.city} <span className="km">+300 км</span>
          </span>
        </Link>
        <Link className="hbtn-green" href="/#lead">
          <span className="plus">
            <Plus size={22} weight="bold" />
          </span>
          <span className="lbl">Оставить заявку</span>
        </Link>
        <Link className="hicon" href="/#lead">
          <Sparkle size={22} className="g" />
          Подбор AI
        </Link>
        <Link className="hicon" href="/profile/favorites">
          <Heart size={22} className="g" />
          Избранное
        </Link>
        {isClient ? (
          <Link className="hlogin" href="/profile">
            <UserCircle size={20} weight="fill" style={{ marginRight: 6 }} /> Кабинет
          </Link>
        ) : (
          <Link className="hlogin" href="/auth">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
