import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminLogout } from "@/components/admin/AdminLogout";

export default async function AdminDashLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="logo" style={{ padding: "0 8px 16px" }}>
          <span className="mk">АК</span>
          <span className="wm" style={{ fontSize: 20 }}>
            автокорр
          </span>
        </div>
        <nav className="admin-nav">
          <Link href="/admin">Дашборд</Link>
          <Link href="/admin/leads">Заявки</Link>
          <Link href="/admin/cars">Автомобили</Link>
          <Link href="/admin/orders">Заказы</Link>
        </nav>
        <div className="admin-user">
          <span>{session.sub}</span>
          <AdminLogout />
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
