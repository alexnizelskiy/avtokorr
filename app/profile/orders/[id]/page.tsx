import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChatCircle } from "@phosphor-icons/react/dist/ssr";
import { getClientSession } from "@/lib/auth";
import { getClientOrder } from "@/services/orders";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { orderStageLabels, type OrderStage } from "@/lib/order-labels";

export const dynamic = "force-dynamic";

const rub = new Intl.NumberFormat("ru-RU");

export default async function ClientOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getClientSession();
  const order = session?.uid ? await getClientOrder(session.uid, id) : null;
  if (!order) notFound();

  return (
    <div>
      <div className="admin-crumbs">
        <Link href="/profile/orders">
          <ArrowLeft size={14} /> К моим заказам
        </Link>
      </div>

      <div className="order-top">
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>
            Заказ {order.number}
          </h1>
          <div style={{ color: "var(--muted)", marginTop: 4 }}>
            {order.car ? `${order.car.brand} ${order.car.model}, ${order.car.year}` : "Автомобиль подбирается"}
            {order.totalPrice ? ` · ${rub.format(Number(order.totalPrice))} ₽` : ""}
          </div>
        </div>
        <span className="lead-status" style={{ fontSize: 13 }}>
          {orderStageLabels[order.stage as OrderStage]}
        </span>
      </div>

      <div className="order-grid">
        <OrderTimeline stage={order.stage as OrderStage} events={order.events} />
        <aside className="order-add">
          <h3 className="sec-title" style={{ fontSize: 17 }}>
            Нужна помощь?
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 0 }}>
            Ваш менеджер на связи и обновляет статус на каждом этапе.
          </p>
          <Link href="/#lead" className="btn btn-soft">
            <ChatCircle size={18} /> Написать менеджеру
          </Link>
        </aside>
      </div>
    </div>
  );
}
