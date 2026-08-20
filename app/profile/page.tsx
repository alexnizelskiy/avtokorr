import Link from "next/link";
import { getClientSession } from "@/lib/auth";
import { listClientOrders } from "@/services/orders";
import { orderStageLabels, type OrderStage } from "@/lib/order-labels";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getClientSession();
  const orders = session?.uid ? await listClientOrders(session.uid) : [];
  const active = orders.filter((o) => o.stage !== "RECEIVED");

  return (
    <div>
      <h1 className="page-title">Профиль</h1>
      <p className="page-sub">Ваши заказы, статусы доставки и избранные автомобили.</p>

      <div className="prof-cards">
        <Link href="/profile/orders" className="prof-card">
          <div className="k">Активные заказы</div>
          <div className="v num">{active.length}</div>
        </Link>
        <div className="prof-card">
          <div className="k">Всего заказов</div>
          <div className="v num">{orders.length}</div>
        </div>
        <Link href="/catalog" className="prof-card accent">
          <div className="k">Каталог</div>
          <div className="v">Подобрать авто →</div>
        </Link>
      </div>

      {active.length > 0 && (
        <>
          <h2 className="sec-title" style={{ marginTop: 32, fontSize: 18 }}>
            Последний заказ
          </h2>
          <Link href={`/profile/orders/${active[0].id}`} className="prof-order-row">
            <div>
              <b>{active[0].number}</b>
              {active[0].car ? ` · ${active[0].car.brand} ${active[0].car.model}` : ""}
            </div>
            <span className="lead-status">{orderStageLabels[active[0].stage as OrderStage]}</span>
          </Link>
        </>
      )}
    </div>
  );
}
