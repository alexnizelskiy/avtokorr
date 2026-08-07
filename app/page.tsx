import { site } from "@/lib/site";

/**
 * Заглушка главной страницы (Этап 3 — каркас).
 * Полноценная витрина в стиле Авто.ру верстается на Этапе 4.
 */
export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#000",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 16,
          }}
        >
          АК
        </span>
        автокорр
      </div>
      <h1 style={{ fontSize: 34, margin: 0, maxWidth: 640 }}>
        Лучшие машины привозят здесь
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 520, fontSize: 17 }}>
        {site.description}
      </p>
      <span
        style={{
          marginTop: 8,
          fontSize: 13,
          color: "var(--muted)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "6px 14px",
        }}
      >
        Сайт в разработке · каркас готов
      </span>
    </main>
  );
}
