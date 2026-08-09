import { listLeads } from "@/services/leads";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  NEW: "Новая",
  IN_PROGRESS: "В работе",
  CONVERTED: "В заказе",
  CLOSED: "Закрыта",
};

function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <h1 className="admin-title">Заявки</h1>
      {leads.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Пока заявок нет. Они появятся здесь после отправки формы на сайте.</p>
      ) : (
        <div className="tblw">
          <table className="tbl">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Комментарий</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="num" style={{ whiteSpace: "nowrap" }}>{fmtDate(l.createdAt)}</td>
                  <td>{l.name}</td>
                  <td className="num" style={{ whiteSpace: "nowrap" }}>{l.phone}</td>
                  <td>{l.comment || "—"}</td>
                  <td>
                    <span className="lead-status">{statusLabel[l.status] ?? l.status}</span>
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
