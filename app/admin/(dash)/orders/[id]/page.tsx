import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/services/orders";
import {
  orderStages,
  orderStageLabels,
  orderStageOptions,
  stageIndex,
  type OrderStage,
} from "@/lib/order-labels";
import { addStatusAction } from "../actions";

export const dynamic = "force-dynamic";

const rub = new Intl.NumberFormat("ru-RU");

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const currentIdx = stageIndex(order.stage as OrderStage);
  const nextStage = orderStages[Math.min(currentIdx + 1, orderStages.length - 1)];
  const addAction = addStatusAction.bind(null, order.id);

  return (
    <div>
      <div className="admin-crumbs">
        <Link href="/admin/orders">← К списку заказов</Link>
      </div>

      <div className="order-top">
        <div>
          <h1 className="admin-title" style={{ margin: 0 }}>
            Заказ {order.number}
          </h1>
          <div style={{ color: "var(--muted)", marginTop: 4 }}>
            {order.client.name} · <span className="num">{order.client.phone}</span>
            {order.car ? ` · ${order.car.brand} ${order.car.model}, ${order.car.year}` : ""}
            {order.totalPrice ? ` · ${rub.format(Number(order.totalPrice))} ₽` : ""}
          </div>
        </div>
        <span className="lead-status" style={{ fontSize: 13 }}>
          {orderStageLabels[order.stage as OrderStage]}
        </span>
      </div>

      <div className="order-grid">
        {/* Таймлайн */}
        <div className="order-steps">
          {orderStages.map((stage, i) => {
            const state = i < currentIdx ? "done" : i === currentIdx ? "cur" : "todo";
            const events = order.events.filter((e) => e.stage === stage);
            return (
              <div key={stage} className={`ostep ${state}`}>
                <div className="mk">{state === "done" ? "✓" : i + 1}</div>
                <div className="ostep-body">
                  <div className="nm">{orderStageLabels[stage]}</div>
                  {events.map((e) => (
                    <div key={e.id} className="oevent">
                      <span className="num dt">{fmtDate(e.createdAt)}</span>
                      {e.comment ? <span className="cm"> · {e.comment}</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Добавить обновление */}
        <aside className="order-add">
          <h3 className="sec-title" style={{ fontSize: 17 }}>
            Обновить статус
          </h3>
          <form action={addAction} className="lead-form">
            <label className="field">
              <span>Этап</span>
              <select name="stage" defaultValue={nextStage}>
                {orderStageOptions.map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Комментарий для клиента</span>
              <textarea name="comment" rows={3} placeholder="Напр. Автомобиль погружен на судно" />
            </label>
            <button className="btn btn-green" type="submit">
              Добавить обновление
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
