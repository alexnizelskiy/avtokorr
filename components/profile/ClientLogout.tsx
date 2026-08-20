"use client";

import { useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";

export function ClientLogout() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }
  return (
    <button className="prof-logout" onClick={logout}>
      <SignOut size={16} /> Выйти
    </button>
  );
}
