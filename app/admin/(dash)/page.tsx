import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [newLeads, totalLeads, totalCars] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count(),
    prisma.car.count(),
  ]);

  return (
    <div>
      <h1 className="admin-title">Дашборд</h1>
      <div className="admin-stats">
        <Link href="/admin/leads" className="admin-stat">
          <div className="k">Новые заявки</div>
          <div className="v num">{newLeads}</div>
          <div className="tr">требуют ответа</div>
        </Link>
        <div className="admin-stat">
          <div className="k">Всего заявок</div>
          <div className="v num">{totalLeads}</div>
        </div>
        <Link href="/admin/cars" className="admin-stat">
          <div className="k">Автомобили</div>
          <div className="v num">{totalCars}</div>
          <div className="tr">в каталоге</div>
        </Link>
        <div className="admin-stat muted">
          <div className="k">Заказы</div>
          <div className="v">—</div>
          <div className="tr">раздел в разработке</div>
        </div>
      </div>
    </div>
  );
}
