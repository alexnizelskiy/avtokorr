import { stories } from "@/content/catalog";

export function Stories() {
  return (
    <section className="section stories-wrap">
      <h2 className="sec-title">Истории</h2>
      <div className="stories">
        {stories.map((s) => (
          <div key={s.id} className={`story ${s.unread ? "unread" : "read"}`}>
            <div className="ring">
              <div className="inner" style={{ background: s.gradient }}>
                <div className="cap">{s.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
