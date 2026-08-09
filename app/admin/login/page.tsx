"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: String(fd.get("identifier") || ""),
        password: String(fd.get("password") || ""),
      }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setState("error");
    }
  }

  return (
    <div className="admin-login">
      <form className="lead-form" onSubmit={onSubmit} style={{ width: 360, maxWidth: "100%" }}>
        <div className="logo" style={{ justifyContent: "center", marginBottom: 6 }}>
          <span className="mk">АК</span>
          <span className="wm">автокорр</span>
        </div>
        <h1 style={{ fontSize: 20, textAlign: "center", margin: "0 0 4px" }}>Вход в админ-панель</h1>
        <label className="field">
          <span>Телефон или e-mail</span>
          <input name="identifier" placeholder="89888937288 или mail@example.ru" autoComplete="username" />
        </label>
        <label className="field">
          <span>Пароль</span>
          <input name="password" type="password" autoComplete="current-password" />
        </label>
        <button className="btn btn-green" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Входим…" : "Войти"}
        </button>
        {state === "error" && <em className="err">Неверные данные или нет доступа.</em>}
      </form>
    </div>
  );
}
