import Link from "next/link";
import { listCarsAdmin } from "@/services/cars";
import { statusLabels } from "@/lib/car-labels";
import { deleteCarAction } from "./actions";

export const dynamic = "force-dynamic";

const rub = new Intl.NumberFormat("ru-RU");

export default async function AdminCarsPage() {
  const cars = await listCarsAdmin();

  return (
    <div>
      <div className="admin-head">
        <h1 className="admin-title" style={{ margin: 0 }}>
          Автомобили <span className="num" style={{ color: "var(--muted)" }}>{cars.length}</span>
        </h1>
        <Link href="/admin/cars/new" className="btn btn-green" style={{ height: 40 }}>
          + Добавить авто
        </Link>
      </div>

      {cars.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Пока нет автомобилей. Нажмите «Добавить авто».</p>
      ) : (
        <div className="tblw">
          <table className="tbl">
            <thead>
              <tr>
                <th>Автомобиль</th>
                <th>Год</th>
                <th>Цена</th>
                <th>Статус</th>
                <th style={{ textAlign: "right" }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((c) => (
                <tr key={c.id}>
                  <td>
                    <b>{[c.brand, c.model, c.generation].filter(Boolean).join(" ")}</b>
                  </td>
                  <td className="num">{c.year}</td>
                  <td className="num" style={{ whiteSpace: "nowrap" }}>{rub.format(Number(c.price))} ₽</td>
                  <td>
                    <span className="lead-status">{statusLabels[c.status]}</span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <Link href={`/admin/cars/${c.id}/edit`} className="admin-link">
                      Изменить
                    </Link>
                    <form action={deleteCarAction.bind(null, c.id)} style={{ display: "inline" }}>
                      <button className="admin-del" type="submit">
                        Удалить
                      </button>
                    </form>
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
