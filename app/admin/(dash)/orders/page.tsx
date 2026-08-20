import Link from "next/link";
import { listOrders } from "@/services/orders";
import { orderStageLabels, type OrderStage } from "@/lib/order-labels";

export const dynamic = "force-dynamic";

const rub = new Intl.NumberFormat("ru-RU");

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(d);
}

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <div>
      <div className="admin-head">
        <h1 className="admin-title" style={{ margin: 0 }}>
          Заказы <span className="num" style={{ color: "var(--muted)" }}>{orders.length}</span>
        </h1>
        <Link href="/admin/orders/new" className="btn btn-green" style={{ height: 40 }}>
          + Создать заказ
        </Link>
      </div>

      {orders.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Пока нет заказов. Нажмите «Создать заказ».</p>
      ) : (
        <div className="tblw">
          <table className="tbl">
            <thead>
              <tr>
                <th>№</th>
                <th>Клиент</th>
                <th>Автомобиль</th>
                <th>Этап</th>
                <th>Дата</th>
                <th style={{ textAlign: "right" }}>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link href={`/admin/orders/${o.id}`} className="admin-link">
                      <b>{o.number}</b>
                    </Link>
                  </td>
                  <td>
                    {o.client.name || "—"}
                    <div style={{ color: "var(--muted)", fontSize: 12 }} className="num">
                      {o.client.phone}
                    </div>
                  </td>
                  <td>{o.car ? `${o.car.brand} ${o.car.model}` : "—"}</td>
                  <td>
                    <span className="lead-status">{orderStageLabels[o.stage as OrderStage]}</span>
                  </td>
                  <td className="num">{fmtDate(o.createdAt)}</td>
                  <td className="num" style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {o.totalPrice ? `${rub.format(Number(o.totalPrice))} ₽` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
