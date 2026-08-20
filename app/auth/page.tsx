"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowLeft } from "@phosphor-icons/react";

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [devCode, setDevCode] = useState<string | undefined>();

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok && data.ok) {
      setDevCode(data.devCode);
      setStep("code");
    } else {
      setError("Проверьте номер телефона.");
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok && data.ok) {
      router.push("/profile");
      router.refresh();
    } else {
      setError(data.error === "invalid" ? "Неверный код." : "Код истёк или введён неверно.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link className="logo" href="/" style={{ justifyContent: "center", marginBottom: 8 }}>
          <span className="mk">АК</span>
          <span className="wm">автокорр</span>
        </Link>

        {step === "phone" ? (
          <form onSubmit={requestCode} className="lead-form">
            <h1 className="auth-title">Вход в личный кабинет</h1>
            <p className="auth-hint">Введите номер телефона — пришлём код по SMS.</p>
            <label className="field">
              <span>Телефон</span>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <button className="btn btn-green" type="submit" disabled={busy}>
              <Phone size={18} /> {busy ? "Отправляем…" : "Получить код"}
            </button>
            {error && <em className="err">{error}</em>}

            <div className="auth-alt">
              <span>или войдите через</span>
              <div className="auth-oauth">
                <button type="button" className="btn btn-soft" disabled title="Скоро">
                  VK ID
                </button>
                <button type="button" className="btn btn-soft" disabled title="Скоро">
                  Яндекс ID
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="lead-form">
            <button type="button" className="auth-back" onClick={() => setStep("phone")}>
              <ArrowLeft size={16} /> Изменить номер
            </button>
            <h1 className="auth-title">Введите код</h1>
            <p className="auth-hint">
              Отправили код на {phone}.
              {devCode && (
                <>
                  {" "}
                  <b>Демо-код: {devCode}</b> (SMS-провайдер не подключён)
                </>
              )}
            </p>
            <label className="field">
              <span>Код из SMS</span>
              <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="______"
                inputMode="numeric"
                maxLength={6}
              />
            </label>
            <button className="btn btn-green" type="submit" disabled={busy}>
              {busy ? "Проверяем…" : "Войти"}
            </button>
            {error && <em className="err">{error}</em>}
          </form>
        )}
      </div>
    </div>
  );
}
