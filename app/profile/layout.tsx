import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Package, Heart } from "@phosphor-icons/react/dist/ssr";
import { getClientSession } from "@/lib/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientLogout } from "@/components/profile/ClientLogout";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession();
  if (!session) redirect("/auth");

  return (
    <>
      <Header />
      <main className="section prof-shell">
        <aside className="prof-side">
          <div className="prof-user">
            <div className="prof-ava">
              <User size={22} weight="fill" />
            </div>
            <div>
              <div className="prof-name">Личный кабинет</div>
              <div className="prof-phone num">{session.sub}</div>
            </div>
          </div>
          <nav className="prof-nav">
            <Link href="/profile">
              <User size={18} /> Профиль
            </Link>
            <Link href="/profile/orders">
              <Package size={18} /> Мои заказы
            </Link>
            <Link href="/profile/favorites">
              <Heart size={18} /> Избранное
            </Link>
          </nav>
          <ClientLogout />
        </aside>
        <div className="prof-main">{children}</div>
      </main>
      <Footer />
    </>
  );
}
