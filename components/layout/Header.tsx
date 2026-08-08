import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link className="logo" href="/">
          <span className="mk">АК</span>
          <span className="wm">автокорр</span>
        </Link>
        <button className="burger" aria-label="Меню">
          <span>
            <i />
            <i />
            <i />
          </span>
        </button>
        <div className="hsearch">
          <span aria-hidden>🔍</span>
          <span className="txt">Найти автомобиль</span>
          <span className="geo">
            📍 {site.city} <span className="km">+300 км</span>
          </span>
        </div>
        <Link className="hbtn-green" href="/#lead">
          <span className="plus">＋</span>
          <span className="lbl">Оставить заявку</span>
        </Link>
        <Link className="hicon" href="/#lead">
          <span className="g">✨</span>Подбор AI
        </Link>
        <Link className="hicon" href="/profile/favorites">
          <span className="g">♡</span>Избранное
        </Link>
        <Link className="hlogin" href="/auth">
          Войти
        </Link>
      </div>
    </header>
  );
}
