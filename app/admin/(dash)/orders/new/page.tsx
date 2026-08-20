import Link from "next/link";
import { listCarsAdmin } from "@/services/cars";
import { orderStageOptions } from "@/lib/order-labels";
import { createOrderAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewOrderPage() {
  const cars = await listCarsAdmin();

  return (
    <div>
      <div className="admin-crumbs">
        <Link href="/admin/orders">← К списку заказов</Link>
      </div>
      <h1 className="admin-title">Новый заказ</h1>

      <form action={createOrderAction} className="car-form" style={{ maxWidth: 640 }}>
        <div className="car-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <label className="field">
            <span>Имя клиента *</span>
            <input name="clientName" required placeholder="Игорь Смирнов" />
          </label>
          <label className="field">
            <span>Телефон клиента *</span>
            <input name="clientPhone" required placeholder="+7 (___) ___-__-__" inputMode="tel" />
          </label>
          <label className="field">
            <span>Автомобиль</span>
            <select name="carId" defaultValue="">
              <option value="">— не выбран —</option>
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} {c.model}, {c.year}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Начальный этап</span>
            <select name="stage" defaultValue="REQUEST">
              {orderStageOptions.map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Сумма заказа, ₽</span>
            <input name="totalPrice" type="number" placeholder="напр. 5450000" />
          </label>
        </div>
        <button className="btn btn-green" type="submit">
          Создать заказ
        </button>
      </form>
    </div>
  );
}
