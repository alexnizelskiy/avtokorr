import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getClientSession } from "@/lib/auth";
import { listClientOrders } from "@/services/orders";
import { orderStageLabels, stageIndex, orderStages, type OrderStage } from "@/lib/order-labels";

export const dynamic = "force-dynamic";

const rub = new Intl.NumberFormat("ru-RU");

export default async function ClientOrdersPage() {
  const session = await getClientSession();
  const orders = session?.uid ? await listClientOrders(session.uid) : [];

  return (
    <div>
      <h1 className="page-title">Мои заказы</h1>
      {orders.length === 0 ? (
        <div className="cat-empty">
          <p>У вас пока нет заказов.</p>
          <Link href="/catalog" className="btn btn-green">
            Подобрать автомобиль
          </Link>
        </div>
      ) : (
        <div className="prof-orders">
          {orders.map((o) => {
            const idx = stageIndex(o.stage as OrderStage);
            const progress = Math.round(((idx + 1) / orderStages.length) * 100);
            return (
              <Link key={o.id} href={`/profile/orders/${o.id}`} className="prof-order">
                <div className="prof-order-head">
                  <div>
                    <b>{o.number}</b>
                    {o.car ? ` · ${o.car.brand} ${o.car.model}, ${o.car.year}` : ""}
                  </div>
                  <CaretRight size={18} />
                </div>
                <div className="prof-order-meta">
                  <span className="lead-status">{orderStageLabels[o.stage as OrderStage]}</span>
                  {o.totalPrice ? (
                    <span className="num" style={{ color: "var(--muted)" }}>
                      {rub.format(Number(o.totalPrice))} ₽
                    </span>
                  ) : null}
                </div>
                <div className="prof-progress">
                  <div className="prof-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
