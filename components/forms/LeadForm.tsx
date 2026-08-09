"use client";

import { useState } from "react";

type State = "idle" | "sending" | "ok" | "error";

export function LeadForm({ car }: { car?: string }) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      comment: String(fd.get("comment") || ""),
      car,
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState("ok");
      } else {
        setErrors(data.issues || {});
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="lead-form lead-ok">
        <div style={{ fontSize: 40 }}>✓</div>
        <h3 style={{ margin: "8px 0 4px" }}>Заявка отправлена!</h3>
        <p style={{ color: "var(--muted)", margin: 0 }}>
          Менеджер свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <label className="field">
        <span>Имя</span>
        <input name="name" placeholder="Как к вам обращаться" autoComplete="name" />
        {errors.name && <em className="err">{errors.name[0]}</em>}
      </label>
      <label className="field">
        <span>Телефон</span>
        <input name="phone" placeholder="+7 (___) ___-__-__" inputMode="tel" autoComplete="tel" />
        {errors.phone && <em className="err">{errors.phone[0]}</em>}
      </label>
      <label className="field">
        <span>Комментарий</span>
        <textarea name="comment" rows={3} placeholder="Какой автомобиль интересует?" />
      </label>
      <button className="btn btn-green" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем…" : "Оставить заявку"}
      </button>
      {state === "error" && !Object.keys(errors).length && (
        <em className="err">Не удалось отправить. Попробуйте ещё раз.</em>
      )}
      <p className="lead-note">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
      </p>
    </form>
  );
}
